import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET_NAME = "packages";
const TABLE_NAME = "packages";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // 1) AUTH
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be logged in to save a package." },
        { status: 401 }
      );
    }

    // 2) Parse incoming project
    const project = await req.json();
    if (!project || !project.title) {
      return NextResponse.json(
        { error: "Project must have a title." },
        { status: 400 }
      );
    }

    const title = project.title;
    const description = project.description ?? "";

    let packageRow = null;

    // ===============================================
    // 3) IF UPDATING AN EXISTING PACKAGE
    // ===============================================
    if (project.package_id) {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({
          title,
          description,
          updated_at: new Date().toISOString(),
        })
        .eq("package_id", project.package_id)
        .eq("created_by_user_id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Update package row error:", error);
        return NextResponse.json(
          { error: "Failed to update package record." },
          { status: 500 }
        );
      }

      packageRow = data;
    }

    // ===============================================
    // 4) IF CREATING A NEW PACKAGE → GENERATE BEFORE INSERT
    // ===============================================
    if (!packageRow) {
      const generatedId = crypto.randomUUID();
      const storagePath = `${user.id}/${generatedId}.json`;

      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert({
          package_id: generatedId,
          title,
          description,
          created_by_user_id: user.id,
          storage_path: storagePath, // <-- NOT NULL
        })
        .select()
        .single();

      if (error) {
        console.error("Insert package row error:", error);
        return NextResponse.json(
          { error: "Failed to create package record." },
          { status: 500 }
        );
      }

      packageRow = data;
      project.package_id = data.package_id;
    }

    // ===============================================
    // 5) SAVE PROJECT JSON IN STORAGE
    // ===============================================
    const fileContent = JSON.stringify(
      { ...project, package_id: packageRow.package_id },
      null,
      2
    );

    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(packageRow.storage_path, fileContent, {
        contentType: "application/json",
        upsert: true,
      });

    if (storageError) {
      console.error("Storage save error:", storageError);
      return NextResponse.json(
        { error: "Failed to save package content to storage." },
        { status: 500 }
      );
    }

    // ===============================================
    // 6) RETURN TO EDITOR
    // ===============================================
    return NextResponse.json(
      { data: packageRow },
      { status: 200 }
    );

  } catch (err) {
    console.error("Unexpected save error:", err);
    return NextResponse.json(
      { error: "Unexpected error saving package." },
      { status: 500 }
    );
  }
}

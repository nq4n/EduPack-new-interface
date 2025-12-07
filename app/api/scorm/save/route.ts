import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET_NAME = "scorm-packages"; // ⬅️ change if your bucket is named differently
const TABLE_NAME = "packages";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();

    // 1) Auth
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

    // 2) Get project from editor
    const project = await req.json();

    if (!project || !project.title) {
      return NextResponse.json(
        { error: "Project must at least have a title." },
        { status: 400 }
      );
    }

    const title: string = project.title;
    const description: string = project.description ?? "";

    let packageRow: any | null = null;

    // 3) If package_id exists → update row, else insert new
    if (project.package_id) {
      // UPDATE existing
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
        console.error("Error updating package row:", error);
        return NextResponse.json(
          { error: "Failed to update package record." },
          { status: 500 }
        );
      }

      packageRow = data;
    } else {
      // INSERT new
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert({
          title,
          description,
          created_by_user_id: user.id,
          // is_listed_in_store, created_at, updated_at use defaults
        })
        .select()
        .single();

      if (error) {
        console.error("Error inserting package row:", error);
        return NextResponse.json(
          { error: "Failed to create package record." },
          { status: 500 }
        );
      }

      packageRow = data;
      project.package_id = data.package_id; // make sure editor knows the id
    }

    // 4) Decide storage path (if empty, generate; if exists, reuse)
    let storagePath = packageRow.storage_path as string | null;

    if (!storagePath) {
      storagePath = `${user.id}/${packageRow.package_id}.json`;

      const { error: updatePathError } = await supabase
        .from(TABLE_NAME)
        .update({ storage_path: storagePath })
        .eq("package_id", packageRow.package_id)
        .eq("created_by_user_id", user.id);

      if (updatePathError) {
        console.error("Error updating storage_path:", updatePathError);
        return NextResponse.json(
          { error: "Failed to update package storage path." },
          { status: 500 }
        );
      }

      packageRow.storage_path = storagePath;
    }

    // 5) Save full project JSON into bucket
    const fileContent = JSON.stringify(
      {
        ...project,
        package_id: packageRow.package_id,
      },
      null,
      2
    );

    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileContent, {
        contentType: "application/json",
        upsert: true,
      });

    if (storageError) {
      console.error("Error saving package file:", storageError);
      return NextResponse.json(
        { error: "Failed to save package content." },
        { status: 500 }
      );
    }

    // 6) Return DB row to the editor
    return NextResponse.json(
      {
        data: packageRow,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Unexpected error in /api/scorm/save:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}

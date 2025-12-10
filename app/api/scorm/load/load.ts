import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function normalizeStoragePath(rawPath: string | null): string | null {
  if (!rawPath) return null;

  let cleaned = rawPath.trim();

  // Support callers that pass a full Supabase URL
  try {
    if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
      const url = new URL(cleaned);
      const parts = url.pathname.split("/").filter(Boolean);
      const objectIndex = parts.findIndex((part) => part === "object");

      if (objectIndex !== -1) {
        cleaned = parts.slice(objectIndex + 1).join("/");
      }
    }
  } catch (parseErr) {
    console.warn("Unable to parse storage path URL, falling back to raw value", parseErr);
  }

  cleaned = cleaned.replace(/^\/?scorm-packages\//, "").replace(/^\/+/, "");

  return cleaned || null;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // 1) authenticate user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2) read file path from request body or query
    const contentType = req.headers.get("content-type")?.toLowerCase() ?? "";
    let path: string | null = null;

    try {
      if (contentType.includes("application/json")) {
        const body = await req.json();
        path = typeof body?.path === "string" ? body.path : null;
      } else if (
        contentType.includes("application/x-www-form-urlencoded") ||
        contentType.includes("multipart/form-data")
      ) {
        const formData = await req.formData();
        const value = formData.get("path");
        path = typeof value === "string" ? value : value?.toString() ?? null;
      }
    } catch (parseError) {
      console.error("Failed to parse request body for load:", parseError);
    }

    if (!path) {
      path = req.nextUrl.searchParams.get("path");
    }

    const normalizedPath = normalizeStoragePath(path);

    if (!normalizedPath) {
      return NextResponse.json(
        { error: "Missing file path" },
        { status: 400 }
      );
    }

    // 3) download JSON package from bucket
    const { data, error } = await supabase.storage
      .from("scorm-packages")
      .download(normalizedPath);

    if (error) {
      console.error("Storage error:", error);
      return NextResponse.json(
        { error: "Failed to load package" },
        { status: 500 }
      );
    }

    // 4) convert Blob → JSON
    const fileText = await data.text();
    const project = JSON.parse(fileText);

    return NextResponse.json({ project }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error loading package:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}

// app/api/scorm/load/load.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET_NAME = "packages";

/**
 * Converts any kind of input into a clean storage path.
 * Supports:
 * - raw "userId/packageId.json"
 * - full Supabase URLs
 */
function normalizeStoragePath(rawPath: string | null): string | null {
  if (!rawPath) return null;

  let cleaned = rawPath.trim();

  // If full Supabase URL was sent, extract the object path
  try {
    if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
      const url = new URL(cleaned);
      const parts = url.pathname.split("/").filter(Boolean);
      const objectIndex = parts.findIndex((p) => p === "object");
      if (objectIndex !== -1) {
        cleaned = parts.slice(objectIndex + 1).join("/");
      }
    }
  } catch (err) {
    console.warn("Failed to parse URL path. Using raw path.");
  }

  // Remove bucket name prefix if present
  cleaned = cleaned.replace(/^\/?packages\//, "").replace(/^\/+/, "");

  return cleaned || null;
}

export async function POST(req: NextRequest) {
  try {
    // MUST await for Next.js 15
    const supabase = await createClient();

    // 1) Check auth
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

    // 2) Determine how the path was sent (JSON, FormData, or Query)
    const contentType = req.headers.get("content-type")?.toLowerCase() ?? "";
    let path: string | null = null;

    try {
      if (contentType.includes("application/json")) {
        const body = await req.json();
        path = typeof body?.path === "string" ? body.path : null;
      } else if (
        contentType.includes("multipart/form-data") ||
        contentType.includes("application/x-www-form-urlencoded")
      ) {
        const formData = await req.formData();
        const value = formData.get("path");
        path = typeof value === "string" ? value : value?.toString() ?? null;
      }
    } catch (err) {
      console.error("Failed to parse incoming load request:", err);
    }

    // Fallback to query parameter
    if (!path) {
      path = req.nextUrl.searchParams.get("path");
    }

    const normalizedPath = normalizeStoragePath(path);

    if (!normalizedPath) {
      return NextResponse.json(
        { error: "Missing or invalid file path" },
        { status: 400 }
      );
    }

    // 3) Download file from bucket
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(normalizedPath);

    if (error || !data) {
      console.error("Storage load error:", error);
      return NextResponse.json(
        { error: "Failed to load package file from storage" },
        { status: 500 }
      );
    }

    // 4) Convert Blob → JSON project
    const fileText = await data.text();
    const project = JSON.parse(fileText);

    return NextResponse.json({ project }, { status: 200 });

  } catch (err) {
    console.error("Unexpected error in load route:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import path from "path";

const BUCKET_NAME = "packages";

function normalizeStoragePath(rawPath: string | null): string | null {
  if (!rawPath) return null;

  let cleaned = rawPath.trim();

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

  cleaned = cleaned.replace(/^\/?packages\//, "").replace(/^\/+/, "");

  return cleaned || null;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type")?.toLowerCase() ?? "";
    let storagePath: string | null = null;

    try {
      if (contentType.includes("application/json")) {
        const body = await req.json();
        storagePath = typeof body?.path === "string" ? body.path : null;
      } else {
        const formData = await req.formData();
        const value = formData.get("path");
        storagePath = typeof value === "string" ? value : value?.toString() ?? null;
      }
    } catch (parseError) {
      console.error("Failed to parse download request:", parseError);
    }

    if (!storagePath) {
      storagePath = req.nextUrl.searchParams.get("path");
    }

    const normalizedPath = normalizeStoragePath(storagePath);

    if (!normalizedPath) {
      return NextResponse.json({ error: "Missing file path" }, { status: 400 });
    }

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(normalizedPath);

    if (error || !data) {
      console.error("Storage download failed:", error);
      return NextResponse.json({ error: "Failed to download package" }, { status: 500 });
    }

    const buffer = Buffer.from(await data.arrayBuffer());
    const filename = path.basename(normalizedPath) || "package.zip";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Unexpected error in download handler:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

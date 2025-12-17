import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { type EditorProject } from "@/lib/scorm/types"

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: Params) {
  // Await params in Next.js 15+
  const { id } = await params
  const packageId = id as string

  // Very permissive validation - just check it's not empty
  if (!packageId || typeof packageId !== "string" || packageId.trim() === "") {
    console.error("Invalid package id format:", packageId)
    return NextResponse.json({ error: "Invalid package id." }, { status: 400 })
  }

  try {
    const supabase = await createClient()

    // Fetch package from database
    const { data: pkg, error } = await supabase
      .from("packages")
      .select("package_id, title, description, storage_path, created_at, grade, subject, price, is_public")
      .eq("package_id", packageId)
      .eq("is_public", true)
      .single()

    if (error || !pkg) {
      console.error("Package not found:", error, "for id:", packageId)
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    // Try to load the project content from storage if path exists
    let content: EditorProject | undefined

    if (pkg.storage_path) {
      try {
        // Download file directly from storage
        const { data: fileData, error: storageError } = await supabase.storage
          .from("packages")
          .download(pkg.storage_path)

        if (!storageError && fileData) {
          // Convert blob to text and parse JSON
          const text = await fileData.text()
          const parsed = JSON.parse(text)
          content = parsed as EditorProject
        }
      } catch (err) {
        console.error("Failed to load package content:", err)
        // Content load failed, return basic info without content
      }
    }

    return NextResponse.json({
      data: {
        id: pkg.package_id,
        title: pkg.title,
        description: pkg.description,
        storage_path: pkg.storage_path,
        created_at: pkg.created_at,
        grade: pkg.grade,
        subject: pkg.subject,
        price: pkg.price,
        is_public: pkg.is_public,
        content,
      },
    })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

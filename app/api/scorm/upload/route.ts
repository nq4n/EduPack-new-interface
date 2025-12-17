import { NextResponse, NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const title = (formData.get("title") as string) || "Untitled"
    const description = (formData.get("description") as string) || ""
    const isPublic = (formData.get("is_public") as string) === "true"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Generate storage path: users/{userId}/{timestamp}-{filename}
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const storagePath = `${user.id}/${filename}`

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer()
    const { error: uploadError } = await supabase.storage
      .from("packages")
      .upload(storagePath, Buffer.from(fileBuffer), {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("Storage upload error:", uploadError)
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }

    // Create package record in database
    const { data: packageRecord, error: dbError } = await supabase
      .from("packages")
      .insert({
        title,
        description,
        storage_path: storagePath,
        created_by_user_id: user.id,
        is_public: isPublic,
        grade: "all",
        subject: "general",
        price: 0,
      })
      .select()

    if (dbError) {
      console.error("Database error:", dbError)
      // Try to clean up uploaded file
      await supabase.storage.from("packages").remove([storagePath])
      return NextResponse.json({ error: "Failed to create package record" }, { status: 500 })
    }

    return NextResponse.json(
      { message: "Package uploaded successfully", data: packageRecord?.[0] },
      { status: 201 }
    )
  } catch (err) {
    console.error("Upload error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server-client"

export async function POST(request: Request) {
  const supabase = createServerClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    console.error("[SAVE_ROUTE] getUser error:", userError)
    return new NextResponse(
      JSON.stringify({ error: "User not logged in (invalid token)." }),
      { status: 401 }
    )
  }

  const user = userData.user

  const project = await request.json()

  if (!project || !project.id) {
    return new NextResponse(JSON.stringify({ error: "Invalid project data." }), {
      status: 400,
    })
  }

  const userId = user.id as string
  const filePath = `${userId}/${project.id}/project.json`

  try {
    const { error: storageError } = await supabase.storage
      .from("packages")
      .upload(filePath, JSON.stringify(project), {
        cacheControl: "3600",
        upsert: true,
        contentType: "application/json",
      })

    if (storageError) {
      throw new Error(`Supabase Storage Error: ${storageError.message}`)
    }
  } catch (e: any) {
    console.error("--- STORAGE UPLOAD FAILED ---", e.message)
    return new NextResponse(
      JSON.stringify({
        error: "[STORAGE_UPLOAD_FAILED] Failed to save project content.",
        details: e.message,
      }),
      { status: 500 }
    )
  }

  try {
    const packageData = {
      id: project.id,
      title: project.title,
      description: project.description || null,
      content: project,
      is_listed_in_store: project.isListedInStore || false,
      storage_path: filePath,
      created_by_user_id: userId,
      updated_at: new Date().toISOString(),
    }

    const { data, error: dbError } = await supabase
      .from("packages")
      .upsert(packageData, { onConflict: "id" })
      .select()
      .single()

    if (dbError) {
      throw new Error(`Supabase DB Error: ${dbError.message}`)
    }

    return NextResponse.json({ data })
  } catch (e: any) {
    console.error("--- DATABASE WRITE FAILED (SUPABASE) ---", e.message)
    return new NextResponse(
      JSON.stringify({
        error: "[DATABASE_WRITE_FAILED] Failed to save project metadata.",
        details: e.message,
      }),
      { status: 500 }
    )
  }
}

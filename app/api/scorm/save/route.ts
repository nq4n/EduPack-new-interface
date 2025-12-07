import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server-client"
import { randomUUID } from "crypto"

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

  if (!project) {
    return new NextResponse(JSON.stringify({ error: "Invalid project data." }), { status: 400 })
  }

  const isValidUuid = (value: unknown) =>
    typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)

  const packageId = isValidUuid(project.id) ? project.id : randomUUID()

  const userId = user.id as string
  const filePath = `${userId}/${packageId}/project.json`

  try {
    const json = JSON.stringify(project)
    const fileBody = Buffer.from(json)

    const { data: storageData, error: storageError } = await supabase.storage
      .from("packages")
      .upload(filePath, fileBody, {
        cacheControl: "3600",
        upsert: true,
        contentType: "application/json",
      })

    if (storageError) {
      console.error('[SAVE_ROUTE] storage response:', storageData)
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
      package_id: packageId,
      title: project.title,
      description: project.description || null,
      storage_path: filePath,
      created_by_user_id: userId,
    }

    const { data, error: dbError } = await supabase
      .from("packages")
      .upsert(packageData, { onConflict: "package_id" })
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

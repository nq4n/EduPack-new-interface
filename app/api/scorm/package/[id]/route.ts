import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { type EditorProject } from "@/lib/scorm/types"

interface Params {
  params: { id: string }
}

export async function GET(_request: Request, { params }: Params) {
  const isValidUuid = (value: unknown) =>
    typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)

  if (!isValidUuid(params.id)) {
    return new NextResponse(JSON.stringify({ error: "Invalid package id." }), { status: 400 })
  }

  const supabase = createClient()
  const { data, error } = await supabase
    .from("packages")
    .select("package_id,title,description,storage_path,created_at,created_by_user_id")
    .eq("package_id", params.id)
    .maybeSingle()

  if (error) {
    console.error("Error fetching package", params.id, error.message)
    const status = error.message.toLowerCase().includes("permission") ? 403 : 500
    return new NextResponse(
      JSON.stringify({ error: "Failed to load package.", details: error.message }),
      { status }
    )
  }

  if (!data) {
    return new NextResponse(JSON.stringify({ error: "Package not found." }), {
      status: 404,
    })
  }

  let content: EditorProject | null = null

  if (data.storage_path) {
    const { data: file, error: downloadError } = await supabase.storage
      .from("packages")
      .download(data.storage_path)

    if (!downloadError && file) {
      try {
        const text = await file.text()
        content = JSON.parse(text) as EditorProject
      } catch (parseError) {
        console.warn("Failed to parse package content", parseError)
      }
    } else if (downloadError) {
      console.warn("Unable to download package content", downloadError.message)
    }
  }

  return NextResponse.json({ data: { ...data, id: data.package_id, content } })
}

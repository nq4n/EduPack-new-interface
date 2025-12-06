import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSupabaseConfig } from "@/lib/env"

interface Params {
  params: { id: string }
}

export async function GET(_request: Request, { params }: Params) {
  try {
    getSupabaseConfig()
  } catch (error) {
    const message = error instanceof Error ? error.message : "Supabase credentials are not configured."
    return new NextResponse(
      JSON.stringify({ error: message }),
      { status: 500 }
    )
  }

  const supabase = createClient()
  const { data, error } = await supabase
    .from("packages")
    .select("id,title,description,content,updated_at,is_listed_in_store")
    .eq("id", params.id)
    .eq("is_listed_in_store", true)
    .maybeSingle()

  if (error) {
    console.error("Error fetching package", params.id, error.message)
    return new NextResponse(
      JSON.stringify({ error: "Failed to load package.", details: error.message }),
      { status: 500 }
    )
  }

  if (!data) {
    return new NextResponse(JSON.stringify({ error: "Package not found." }), {
      status: 404,
    })
  }

  return NextResponse.json({ data })
}

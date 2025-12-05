import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface Params {
  params: { id: string }
}

export async function GET(_request: Request, { params }: Params) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return new NextResponse(
      JSON.stringify({ error: "Supabase credentials are not configured." }),
      { status: 500 }
    )
  }

  const supabase = createClient()
  const { data, error } = await supabase
    .from("packages")
    .select("id,title,content,updated_at")
    .eq("id", params.id)
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

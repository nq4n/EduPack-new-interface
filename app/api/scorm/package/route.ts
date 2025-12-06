import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
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
    .select("id,title,description,content,updated_at,is_listed_in_store")
    .eq("is_listed_in_store", true)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching packages from Supabase:", error.message)
    return new NextResponse(
      JSON.stringify({ error: "Failed to load packages.", details: error.message }),
      { status: 500 }
    )
  }

  return NextResponse.json({ data: data ?? [] })
}

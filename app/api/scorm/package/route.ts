import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSupabaseConfig } from "@/lib/env"

export async function GET() {
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

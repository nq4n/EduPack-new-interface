import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("packages")
    .select(
      "package_id, title, description, is_listed_in_store, storage_path, created_by_user_id, created_at, updated_at"
    )
    .eq("is_listed_in_store", true)
    .order("updated_at", { ascending: false })



  if (error) {
    console.error("Error fetching packages from Supabase:", error.message)
    const status = error.message.toLowerCase().includes("permission") ? 403 : 500
    return new NextResponse(JSON.stringify({ error: "Failed to load packages.", details: error.message }), {
      status,
    })
  }

  return NextResponse.json({ data: data ?? [] })
}

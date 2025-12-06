import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server-client"

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from("packages")
    .select("package_id ,title ,description ,is_listed_in_store ,storage_path, created_by_user_id ,created_a ,updated_at")
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


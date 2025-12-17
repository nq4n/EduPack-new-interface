import { NextResponse, NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { package_id, is_public } = await request.json()

    if (!package_id) {
      return NextResponse.json({ error: "Missing package_id" }, { status: 400 })
    }

    // Verify user owns this package
    const { data: pkg, error: fetchError } = await supabase
      .from("packages")
      .select("package_id, created_by_user_id")
      .eq("package_id", package_id)
      .single()

    if (fetchError || !pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    if (pkg.created_by_user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Update visibility
    const { data, error } = await supabase
      .from("packages")
      .update({ is_public })
      .eq("package_id", package_id)
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to update visibility" }, { status: 500 })
    }

    return NextResponse.json({ data: data?.[0] })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse, NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { package_id, price } = await request.json()

    if (!package_id) {
      return NextResponse.json({ error: "Missing package_id" }, { status: 400 })
    }

    // Check if already purchased
    const { data: existing } = await supabase
      .from("purchased_packages")
      .select("id")
      .eq("user_id", user.id)
      .eq("package_id", package_id)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "Already purchased", data: existing },
        { status: 400 }
      )
    }

    // Record purchase
    const { data, error } = await supabase
      .from("purchased_packages")
      .insert({
        user_id: user.id,
        package_id,
        purchased_at: new Date().toISOString(),
        access_until: null, // Unlimited access by default
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to record purchase" }, { status: 500 })
    }

    return NextResponse.json({ data: data?.[0], message: "Purchase recorded" }, { status: 201 })
  } catch (err) {
    console.error("Purchase error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse, NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams
    const grade = searchParams.get("grade")
    const subject = searchParams.get("subject")
    const sort = searchParams.get("sort") || "newest"
    const priceFilter = searchParams.get("price") // "free" or "paid"

    // Base query - public packages only
    let query = supabase
      .from("packages")
      .select("package_id, title, description, created_at, storage_path, grade, subject, price, thumbnail, is_public")
      .eq("is_public", true)

    // Apply filters
    if (grade && grade !== "all") {
      query = query.eq("grade", grade)
    }

    if (subject && subject !== "all") {
      query = query.eq("subject", subject)
    }

    if (priceFilter === "free") {
      query = query.eq("price", 0)
    } else if (priceFilter === "paid") {
      query = query.gt("price", 0)
    }

    // Apply sorting
    if (sort === "priceLowHigh") {
      query = query.order("price", { ascending: true })
    } else if (sort === "priceHighLow") {
      query = query.order("price", { ascending: false })
    } else {
      // Default: newest first
      query = query.order("created_at", { ascending: false })
    }

    const { data, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Failed to fetch packages", data: [] },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data || [] })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json(
      { error: "Internal server error", data: [] },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      title,
      description,
      grade,
      subject,
      price = 0,
      is_public = false,
      storage_path,
      thumbnail,
    } = body

    // Validate required fields
    if (!title || !storage_path) {
      return NextResponse.json(
        { error: "Missing required fields: title, storage_path" },
        { status: 400 }
      )
    }

    // Insert package to database
    const { data, error } = await supabase
      .from("packages")
      .insert({
        title,
        description,
        grade: grade || "all",
        subject: subject || "general",
        price: parseInt(price) || 0,
        is_public,
        storage_path,
        thumbnail: thumbnail || "/placeholder.svg",
        created_by_user_id: user.id,
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Failed to create package" },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data?.[0] }, { status: 201 })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

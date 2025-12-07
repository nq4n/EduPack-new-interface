import { NextResponse } from "next/server"
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

  // Supabase is disconnected. Returning a 404.
  // You could return mock data for a specific ID for testing.
  console.log(`API: Fetching package ${params.id} (mocked).`)
  return new NextResponse(JSON.stringify({ error: "Package not found (database disconnected)." }), {
    status: 404,
  })
}

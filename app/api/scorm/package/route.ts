import { NextResponse } from "next/server"

export async function GET() {
  // Supabase is disconnected. Returning an empty array.
  // You can add mock data here if you want the UI to display something.
  console.log("API: Fetching packages (mocked).")
  return NextResponse.json({ data: [] })
}

import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

export async function POST(request: Request) {
  // Supabase is disconnected. This route will now just log the data and return a success message.
  const project = await request.json()

  if (!project) {
    return new NextResponse(JSON.stringify({ error: "Invalid project data." }), { status: 400 })
  }

  console.log("API: /api/scorm/save called (mocked). Project data received:", project.title)
  
  // Return a mock successful response
  const packageId = project.id || randomUUID()
  return NextResponse.json({
    data: {
      package_id: packageId,
      title: project.title,
    },
  })
}

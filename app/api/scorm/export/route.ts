// app/api/scorm/export/route.ts

import { NextResponse } from "next/server"
import { buildScormZip } from "@/lib/scorm/exporter"
import type { EditorProject } from "@/lib/scorm/types"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EditorProject

    const zipBlob = await buildScormZip(body, body.version ?? "1.2")

    // Convert Blob to ArrayBuffer for NextResponse
    const arrayBuffer = await zipBlob.arrayBuffer()

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${body.title || "scorm-package"}.zip"`,
      },
    })
  } catch (error: any) {
    console.error("SCORM export error:", error)
    return NextResponse.json({ error: error?.message ?? "Failed to export SCORM package" }, { status: 400 })
  }
}

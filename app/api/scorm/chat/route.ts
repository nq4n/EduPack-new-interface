// app/api/scorm/chat/route.ts
import { NextRequest, NextResponse } from "next/server"
import { unifiedAI } from "@/lib/ai/unified"

export async function POST(req: NextRequest) {
  try {
    const { project, messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages[] is required" },
        { status: 400 }
      )
    }

    // unifiedAI decides:
    // build / edit / extend
    const result = await unifiedAI({
      project: project ?? null,
      messages
    })

    return NextResponse.json(result, { status: 200 })
  } catch (err: any) {
    console.error("❌ /api/scorm/chat error:", err)
    return NextResponse.json(
      { error: err.message || "AI Chat failed" },
      { status: 500 }
    )
  }
}

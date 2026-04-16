// app/api/scorm/chat/route.ts
import { NextRequest, NextResponse } from "next/server"
import { unifiedAI } from "@/lib/ai/unified"

function getErrorStatus(err: unknown) {
  if (
    err &&
    typeof err === "object" &&
    "status" in err &&
    typeof (err as { status?: unknown }).status === "number"
  ) {
    return (err as { status: number }).status
  }

  return 500
}

export async function POST(req: NextRequest) {
  try {
    const { project, messages, selection } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages[] is required" },
        { status: 400 }
      )
    }

    const result = await unifiedAI({
      project: project ?? null,
      messages,
      selection: selection ?? null,
    })

    return NextResponse.json(result, { status: 200 })
  } catch (err: any) {
    console.error("/api/scorm/chat error:", err)
    return NextResponse.json(
      { error: err.message || "AI Chat failed" },
      { status: getErrorStatus(err) }
    )
  }
}

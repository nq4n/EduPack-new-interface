// app/api/ai/lesson/build/route.ts
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
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages[] is required" },
        { status: 400 }
      )
    }

    const result = await unifiedAI({
      project: null,
      messages,
    })

    return NextResponse.json(result, { status: 200 })
  } catch (err: any) {
    console.error("/api/ai/lesson/build error:", err)
    return NextResponse.json(
      { error: err.message || "AI Build failed" },
      { status: getErrorStatus(err) }
    )
  }
}

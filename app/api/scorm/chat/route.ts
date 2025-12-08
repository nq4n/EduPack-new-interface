// app/api/scorm/chat/route.ts
export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { runAIPipeline } from "@/lib/ai/pipeline";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid payload: messages[] is required." },
        { status: 400 }
      );
    }

    const result = await runAIPipeline(messages);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("❌ SCORM AI Chat Error:", error);
    return NextResponse.json(
      { error: error?.message || "AI processing failed" },
      { status: 500 }
    );
  }
}

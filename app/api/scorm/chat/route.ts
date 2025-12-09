// app/api/scorm/chat/route.ts

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
export const runtime = "nodejs"; // MUST BE NODE FOR OPENAI SDK

import { NextRequest, NextResponse } from "next/server";
import { runAIPipeline } from "@/lib/ai/pipeline";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, project } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid payload: messages[] is required." },
        { status: 400 }
      );
    }

    if (messages.length > 1 && !project) {
      return NextResponse.json(
        { error: "Existing project is required when modifying a lesson." },
        { status: 400 }
      );
    }

    const isInitial = messages.length === 1;
    const result = await runAIPipeline(messages, isInitial ? undefined : project);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("❌ SCORM AI Chat Error:", err);
    return NextResponse.json(
      { error: err?.message || "AI processing failed" },
      { status: 500 }
    );
  }
}

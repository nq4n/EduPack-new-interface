export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { runAIPipeline } from "@/lib/ai/pipeline";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Build the lesson using the new unified pipeline
    const result = await runAIPipeline([
      { role: "user", content: prompt }
    ]);

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error("[API /ai/lesson/build] Error:", error);
    return NextResponse.json(
      { error: "AI lesson builder failed." },
      { status: 500 }
    );
  }
}

// app/api/scorm/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { buildLessonOutline } from "@/lib/ai/lesson-agent";
import { buildSCORMProject } from "@/lib/ai/builder";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const last = messages[messages.length - 1];

    const outline = await buildLessonOutline(last.content);
    const project = buildSCORMProject(outline);

    return NextResponse.json({
      agent: "fast-free-agent",
      content: "Lesson generated.",
      outline,
      project,
    });
  } catch (err: any) {
    console.error("AI Error:", err);
    return NextResponse.json(
      { error: err.message || "AI failed" },
      { status: 500 }
    );
  }
}

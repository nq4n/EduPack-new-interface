// app/api/scorm/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { buildLessonOutline } from "@/lib/ai/lesson-agent";
import { buildSCORMProject } from "@/lib/ai/builder";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, project } = body;

    const outline = await buildLessonOutline(last.content);
    const project = buildSCORMProject(outline);

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
    console.error("AI Error:", err);
    return NextResponse.json(
      { error: err.message || "AI failed" },
      { status: 500 }
    );
  }
}

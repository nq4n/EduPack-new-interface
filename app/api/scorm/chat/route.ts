// app/api/scorm/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { buildLessonOutline } from "@/lib/ai/lesson-agent";
import { buildSCORMProject } from "@/lib/ai/builder";

export async function POST(req: NextRequest) {
  try {
<<<<<<< HEAD
    const { messages } = await req.json();
    const last = messages[messages.length - 1];
=======
    const body = await req.json();
    const { messages, project } = body;
>>>>>>> aea17997ec34750023d5e6007a2dad212edfe75d

    const outline = await buildLessonOutline(last.content);
    const project = buildSCORMProject(outline);

<<<<<<< HEAD
    return NextResponse.json({
      agent: "fast-free-agent",
      content: "Lesson generated.",
      outline,
      project,
    });
=======
    if (messages.length > 1 && !project) {
      return NextResponse.json(
        { error: "Existing project is required when modifying a lesson." },
        { status: 400 }
      );
    }

    const isInitial = messages.length === 1;
    const result = await runAIPipeline(messages, isInitial ? undefined : project);
    return NextResponse.json(result);
>>>>>>> aea17997ec34750023d5e6007a2dad212edfe75d
  } catch (err: any) {
    console.error("AI Error:", err);
    return NextResponse.json(
      { error: err.message || "AI failed" },
      { status: 500 }
    );
  }
}

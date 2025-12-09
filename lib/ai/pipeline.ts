// lib/ai/pipeline.ts

import { ChatMessage } from "@/lib/scorm/ai-types";
import { generateLesson } from "./generator";

export async function runAIPipeline(messages: ChatMessage[]) {
  const project = await generateLesson(messages);

  return {
    agent: "unified",
    content: "Lesson generated successfully",
    project,
  };
}

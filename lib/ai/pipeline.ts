// lib/ai/pipeline.ts

import { ChatMessage } from "@/lib/scorm/ai-types";
import { EditorProject } from "@/lib/scorm/types";
import { mergeProject } from "./merge";
import { generateLesson, generateLessonUpdate } from "./generator";

export async function runAIPipeline(
  messages: ChatMessage[],
  existingProject?: EditorProject,
) {
  const isInitial = messages.length === 1;

  if (isInitial) {
    const project = await generateLesson(messages);

    return {
      agent: "unified",
      content: "Lesson generated successfully",
      project,
      delta: project,
      mode: "create" as const,
    };
  }

  if (!existingProject) {
    throw new Error("Existing project is required for modify mode.");
  }

  const partial = await generateLessonUpdate(messages, existingProject);
  const merged = mergeProject(existingProject, partial);

  return {
    agent: "unified",
    content: "Lesson updated successfully",
    project: merged,
    delta: partial,
    mode: "modify" as const,
  };
}

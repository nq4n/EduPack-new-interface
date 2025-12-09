import { ChatMessage } from "@/lib/scorm/ai-types";
import { EditorProject } from "@/lib/scorm/types";
import { unifiedLessonAgent, unifiedLessonModifyAgent } from "./agents/unified";
import { parseFullLessonOutput, parsePartialLessonOutput } from "./parser";

function coerceMessages(messages: ChatMessage[]) {
  return messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));
}

export async function generateLesson(messages: ChatMessage[]): Promise<EditorProject> {
  const content = await unifiedLessonAgent(coerceMessages(messages));
  return parseFullLessonOutput(content);
}

export async function generateLessonUpdate(
  messages: ChatMessage[],
  existingProject: EditorProject,
): Promise<EditorProject> {
  if (!existingProject) {
    throw new Error("Existing project is required for modify mode");
  }

  const content = await unifiedLessonModifyAgent(
    coerceMessages(messages),
    JSON.stringify(existingProject, null, 2),
  );

  return parsePartialLessonOutput(content, existingProject);
}

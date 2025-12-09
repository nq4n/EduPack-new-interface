import { ChatMessage } from "@/lib/scorm/ai-types";
import { EditorProject } from "@/lib/scorm/types";
import { safeParseProject } from "./ai-schema";
import {
  getOpenRouterClient,
  getOpenRouterMaxTokens,
  getOpenRouterModel,
} from "./utils/openrouter";

const model = getOpenRouterModel();
const maxTokens = getOpenRouterMaxTokens();

const systemPrompt = `You are a single-step SCORM course generator. Read the full user conversation, extract the topic and intent, and return ONLY valid JSON for an EditorProject.
Requirements:
- Create a concise lesson title and SCORM-ready project.
- Build 3-6 pages with clear titles.
- Each page must include an array of blocks (text, image, video, quiz, or interactive).
- Every page.id and block.id MUST be a random UUID (use uuidv4 format).
- Include helpful HTML snippets in text blocks.
- Never include explanatory prose outside the JSON output.
- Always respond with a single JSON object that matches the EditorProject schema.`;

const uuid = () => crypto.randomUUID();

function coerceMessages(messages: ChatMessage[]) {
  return messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));
}

function ensureIds(project: any): EditorProject {
  const withIds = {
    id: project.id || `proj-${uuid()}`,
    title: project.title || "Untitled Lesson",
    version: project.version || "1.2",
    theme: project.theme ?? { direction: "ltr", styles: {} },
    tracking: project.tracking ?? {
      level: "standard",
      pageViews: true,
      quizInteractions: true,
      media: true,
      hints: false,
      externalLinks: false,
      timePerPage: true,
      attempts: true,
    },
    xapi: project.xapi ?? {
      lrsEndpoint: "",
      authToken: "",
      activityIdFormat: "iri",
      statementExtensions: "{}",
    },
    pages: Array.isArray(project.pages) ? project.pages : [],
  } as EditorProject;

  withIds.pages = withIds.pages.map((page: any) => ({
    id: page.id || uuid(),
    title: page.title || "Untitled Page",
    blocks: Array.isArray(page.blocks)
      ? page.blocks.map((block: any) => ({
          id: block.id || uuid(),
          ...block,
        }))
      : [],
  }));

  return safeParseProject(withIds);
}

export async function generateLesson(
  messages: ChatMessage[],
): Promise<EditorProject> {
  const client = getOpenRouterClient();

  const response = await client.chat.completions.create({
    model,
    messages: [{ role: "system", content: systemPrompt }, ...coerceMessages(messages)],
    temperature: 0.2,
    response_format: { type: "json_object" },
    ...(typeof maxTokens === "number" ? { max_tokens: maxTokens } : {}),
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned an empty response");
  }

  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    throw new Error("AI did not return valid JSON");
  }

  return ensureIds(parsed);
}

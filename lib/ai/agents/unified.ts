// lib/ai/agents/unified.ts

import {
  getOpenRouterClient,
  getOpenRouterMaxTokens,
  getOpenRouterModel,
} from "../utils/openrouter";

const model = getOpenRouterModel("amazon/nova-2-lite-v1:free");
const maxTokens = getOpenRouterMaxTokens();

function coerceMessages(messages: any[]) {
  return messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));
}

async function callModel(systemPrompt: string, messages: any[], temperature = 0.3) {
  const client = getOpenRouterClient();
  const response = await client.chat.completions.create({
    model,
    messages: [{ role: "system", content: systemPrompt }, ...coerceMessages(messages)],
    temperature,
    ...(typeof maxTokens === "number" ? { max_tokens: maxTokens } : {}),
  });

  const content = response.choices[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("AI returned an empty response");
  }

  return content;
}

export async function unifiedLessonAgent(messages: any[]) {
  const systemPrompt = `You are generating a SCORM lesson.
Use ONLY the following format so the parser can create pages and blocks:

TITLE: <Lesson Title>

PAGE: <Page Title>
BLOCK: text | <content text>
BLOCK: image | <description or URL>
BLOCK: video | <url>
BLOCK: quiz | <question> | <option1> | <option2> | <option3> | <option4> | <answer>
BLOCK: interactive | <variant: button/callout/reveal/custom> | <label> | <body> | <url> | <tone: info/success/warning/danger> | <open:true/false>

Rules:
- Provide 3-6 pages of content.
- Keep every page non-empty.
- Do not add IDs or JSON.
- Only use the BLOCK syntax above.`;

  return callModel(systemPrompt, messages, 0.25);
}

export async function unifiedLessonModifyAgent(messages: any[], projectJson: string) {
  const systemPrompt = `You are modifying an existing SCORM lesson.
Do NOT regenerate pages unless explicitly asked.
Do NOT remove existing blocks.
ONLY update or append blocks the user mentioned.
Use the BLOCK: format only.
Return only the changed pages/blocks.
To update an existing block, include its current block ID as the first value after the block type.

Supported formats:

PAGE: <Page Title>
BLOCK: text | [block-id] | <content text>
BLOCK: image | [block-id] | <description or URL>
BLOCK: video | [block-id] | <url>
BLOCK: quiz | [block-id] | <question> | <option1> | <option2> | <option3> | <option4> | <answer>
BLOCK: interactive | [block-id] | <variant: button/callout/reveal/custom> | <label> | <body> | <url> | <tone: info/success/warning/danger> | <open:true/false>

Current lesson JSON:
${projectJson}`;

  return callModel(systemPrompt, messages, 0.2);
}

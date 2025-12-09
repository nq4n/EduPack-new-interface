// lib/ai/agents/unified.ts

import {
  getOpenRouterClient,
  getOpenRouterMaxTokens,
  getOpenRouterModel,
} from "../utils/openrouter";

const model = getOpenRouterModel();
const maxTokens = getOpenRouterMaxTokens();

/**
 * Unified SCORM lesson builder
 * Merges mentor + architect + deep research responsibilities into one call
 * to reduce latency while still producing enriched lesson content.
 */
export async function unifiedLessonAgent(messages: any[]) {
  const client = getOpenRouterClient();

  const systemPrompt = `You are a single-step SCORM course builder.
You will read the full teacher conversation and produce a complete lesson plan that is already enriched with explanations, examples, and practice tasks.

Goals (do ALL in one pass):
- Understand the teacher's request (subject, grade, objectives, activity style).
- Design a SCORM-friendly lesson structure with clear pages and blocks.
- Enrich every block with concise, teacher-friendly content.

OUTPUT FORMAT (strict, plain text):
Lesson Title: <title>

- Page 1: <title>
  Blocks:
    - Text: <short paragraphs with explanations/examples>
    - Image: <describe helpful illustration>

- Page 2: <title>
  Blocks:
    - Text: <guidance or concept practice>
    - Quiz: <short check-for-understanding prompt>

- Page 3: <title>
  Blocks:
    - Text: <independent practice or extension>

Rules:
- DO NOT output JSON or code.
- DO NOT create IDs.
- Keep paragraphs short and scannable.
- Include 3-6 pages as appropriate.
- Use only Text, Image, or Quiz blocks.
- Follow the exact "Page" and "Blocks" bullet structure so the normalizer can parse it.
`;

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    ],
    temperature: 0.35,
    ...(typeof maxTokens === "number" ? { max_tokens: maxTokens } : {}),
  });

  return response.choices[0].message.content;
}

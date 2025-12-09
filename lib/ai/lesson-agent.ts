// lib/ai/lesson-agent.ts
import { getClient } from "./openrouter";

export async function buildLessonOutline(userPrompt: string) {
  const client = getClient();

  const systemPrompt = `
You are an expert instructional designer.

Generate a SCORM-ready lesson using ONLY these block types:

- text
- image
- video
- quiz

OUTPUT FORMAT RULES (very strict):
- Do NOT produce JSON.
- Do NOT add extra text before or after.
- Use this exact format:

TITLE: <lesson title>

PAGE: <page title>
BLOCK: text | <short explanation>
BLOCK: image | <simple visual idea or empty>
BLOCK: video | <short video idea or empty>
BLOCK: quiz | <question> | <A> | <B> | <C> | <D> | <correct answer letter>

PAGE: <page title>
BLOCK: ...

Additional rules:
- 2–4 pages maximum.
- Each page must have at least 1 text block.
- Do NOT include more than 1 quiz per page.
- If a block is not needed (image/video), output it with an empty value.
- Keep explanations short and teacher-friendly.

`;

  const response = await client.chat.completions.create({
    model: "amazon/nova-2-lite-v1:free", // FREE MODEL
    temperature: 0.3,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
  });

  return response.choices[0].message.content || "";
}

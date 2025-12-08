// lib/ai/agents/architect.ts

import { getOpenRouterClient } from "../utils/openrouter";

/**
 * Architect Stage
 * Converts mentor outline → SCORM lesson blueprint (text only).
 *
 * Output: structured NATURAL LANGUAGE (NOT JSON).
 */
export async function architectStage(outline: string) {
  const client = getOpenRouterClient();

  const systemPrompt = `
You are a SCORM lesson architect.

Your job:
Convert the mentor’s lesson outline into a structured SCORM lesson blueprint.

OUTPUT FORMAT (very important):

Lesson Title: <title>

Pages:
- Page 1: <title>
  Blocks:
    - Text: <intro or explanation>
    - Image: <placeholder description>

- Page 2: <concept section>
  Blocks:
    - Text: <details>
    - Quiz:
        type: mcq
        question: <question>
        options: [A, B, C, D]
        answer: <letter>

- Page 3: Guided Practice
  Blocks:
    - Text: <task instructions>

- Page 4: Independent Practice
  Blocks:
    - Text: <exercise>

- Page 5: Conclusion
  Blocks:
    - Text: <summary>

RULES:
- DO NOT generate JSON.
- DO NOT generate IDs.
- DO NOT embed code or HTML.
- Normalizer will convert this into structured SCORM blocks.
- Keep blueprint clean, simple, and consistent.
`;

  const response = await client.chat.completions.create({
    model: "Kwai-KAT-6B:free", // free, reliable structure
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: outline }
    ],
    temperature: 0.3,
  });

  return response.choices[0].message.content;
}

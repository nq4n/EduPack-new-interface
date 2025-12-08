// lib/ai/agents/architect.ts

import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

/**
 * Architect Stage
 * Converts the mentor outline → a structured lesson blueprint.
 * 
 * Output: structured TEXT (not JSON!) describing pages and blocks.
 */
export async function architectStage(outline: string) {
  const systemPrompt = `
You are a SCORM lesson architect.

Your task:
Convert the teacher’s lesson outline into a structured SCORM lesson blueprint.
DO NOT generate final JSON — only structured natural language that describes the project.

The lesson blueprint must follow this structure:

Lesson Title: <title>

Pages:
- Page 1: <title>
  Blocks:
    - Text: <introduction/overview>
    - Image: <placeholder description>
- Page 2: <concept section>
  Blocks:
    - Text: <explanation>
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

Rules:
- Keep the structure clean and organized.
- DO NOT output JSON.
- DO NOT add IDs. Normalizer will handle that.
- Use placeholders like “Image: diagram of …”.
- Use simple quiz examples.
`;

  const response = await client.chat.completions.create({
    model: "Kwai-KAT-6B:free", // Free + reliable at structured output
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: outline }
    ],
    temperature: 0.3,
  });

  return response.choices[0].message.content;
}

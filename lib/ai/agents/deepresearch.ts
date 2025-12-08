// lib/ai/agents/deepresearch.ts

import OpenAI from "openai";
import { getOpenRouterClient } from "../utils/openrouter";

/**
 * Deep Research Stage
 * Enriches the architect blueprint with deeper explanations,
 * examples, practice tasks, and instructional scaffolding.
 * 
 * Output: structured enriched text (NOT JSON).
 */

export async function deepResearchStage(blueprint: string) {
  const client = getOpenRouterClient();

  const systemPrompt = `
You are an advanced education specialist.

Your task:
Take the architect's lesson blueprint and expand it with:

- Clear explanations
- Real-world examples
- Guided practice steps
- Independent practice tasks
- Optional hints
- Teacher notes for differentiation
- A small assessment section for each key concept

Rules:
- DO NOT output any JSON.
- DO NOT modify the structure (pages + blocks).
- Only enrich the content inside each block.
- Keep everything clean, readable, and suitable for automatic conversion.
- Avoid overlong paragraphs; use concise teaching style.
`;

  const response = await client.chat.completions.create({
    model: "openai/gpt-4o-mini-tts", // Free, strong text reasoning
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: blueprint }
    ],
    temperature: 0.4,
  });

  return response.choices[0].message.content;
}

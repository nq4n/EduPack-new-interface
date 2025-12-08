// lib/ai/agents/deepresearch.ts

import {
  getOpenRouterClient,
  getOpenRouterMaxTokens,
  getOpenRouterModel,
} from "../utils/openrouter";

// Use shared OpenRouter client with required headers
const client = getOpenRouterClient();
const model = getOpenRouterModel();
const maxTokens = getOpenRouterMaxTokens();

/**
 * Deep Research Stage
 * Enriches the architect blueprint with:
 * - explanations
 * - examples
 * - guided practice
 * - independent tasks
 * - differentiation notes
 * 
 * Output: enriched NATURAL LANGUAGE (NOT JSON).
 */
export async function deepResearchStage(blueprint: string) {
  const systemPrompt = `
You are an advanced education specialist.

Your task:
Take the architect's lesson blueprint and enrich it with:

- Clear, simple explanations
- Real classroom examples
- Guided practice steps
- Independent practice tasks
- Optional hints
- Teacher notes for differentiation
- Small embedded assessments

Rules:
- DO NOT output JSON.
- DO NOT modify the page/block structure.
- Only enrich content inside each block.
- Keep paragraphs short and teacher-friendly.
- The normalizer will convert this into SCORM JSON later.
`;

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: blueprint }
    ],
    temperature: 0.4,
    max_tokens: maxTokens,
  });

  return response.choices[0].message.content;
}

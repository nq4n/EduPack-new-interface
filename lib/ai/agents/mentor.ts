// lib/ai/agents/mentor.ts

import { getOpenRouterClient } from "../utils/openrouter";

// Use the shared OpenRouter client with correct API key + headers
const client = getOpenRouterClient();

/**
 * Mentor Stage
 * Reads chat messages → Extracts intent → Produces a lesson outline.
 *
 * Output: plain text outline (NOT JSON)
 */
export async function mentorStage(messages: any[]) {
  const systemPrompt = `
You are an expert instructional designer and teacher mentor.

Your task:
1. Read the ENTIRE conversation history.
2. Understand the teacher’s goal:
   - Subject
   - Grade level
   - Learning objectives
   - Activity style
3. Produce a clean, simple, structured lesson outline.

OUTPUT FORMAT (strict):

Lesson Topic: <topic>

Grade Level: <grade or "not specified">

Learning Objectives:
- Objective 1
- Objective 2
- Objective 3

Lesson Outline:
1. Introduction
2. Concept Explanation
3. Guided Practice
4. Independent Practice
5. Assessment
6. Conclusion

RULES:
- DO NOT output JSON.
- DO NOT create SCORM blocks.
- DO NOT generate IDs.
- Keep the outline readable and teacher-friendly.
- The architect agent will turn this into a SCORM blueprint.
`;

  const response = await client.chat.completions.create({
    model: "allenai/olmo-3-32b:think", // Free, excellent reasoning
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ],
    temperature: 0.4,
  });

  return response.choices[0].message.content;
}

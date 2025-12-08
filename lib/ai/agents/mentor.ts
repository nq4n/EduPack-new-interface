// lib/ai/agents/mentor.ts

import { getOpenRouterClient } from "../utils/openrouter";

// We use OpenRouter endpoint through the OpenAI SDK
const client = getOpenRouterClient();

/**
 * Mentor Stage
 * Reads chat messages → Extracts educational intent → Produces a lesson outline.
 * 
 * Output: string (outline)
 */
export async function mentorStage(messages: any[]) {
  const systemPrompt = `
You are an expert instructional designer and teacher mentor.

Your job:
1. Read the entire conversation history.
2. Understand the teacher’s intent:
   - Subject
   - Grade level
   - Learning goals
   - Required activities
3. Produce a very clear and clean lesson outline, with the following structure:

Lesson Topic: <topic>
Grade Level: <grade or "not stated">
Learning Objectives:
- Objective 1
- Objective 2
- ...

Lesson Outline:
1. Introduction
2. Concept Explanation
3. Guided Practice
4. Independent Practice
5. Assessment (questions or quiz)
6. Conclusion

Rules:
- Do NOT generate any JSON.
- Do NOT create full SCORM blocks.
- Only produce a text outline for the architect agent to use.
- Keep the outline simple and structured.
`;

  const response = await client.chat.completions.create({
    model: "allenai/olmo-3-32b:think", // Free, strong reasoning
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
    temperature: 0.4,
  });

  return response.choices[0].message.content;
}

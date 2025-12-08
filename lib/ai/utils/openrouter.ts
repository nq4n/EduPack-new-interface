// lib/ai/utils/openrouter.ts
import OpenAI from "openai";

function requireOpenRouterApiKey() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing OPENROUTER_API_KEY environment variable. Add it to your .env.local file to use the AI pipeline."
    );
  }

  return apiKey;
}

export function getOpenRouterClient() {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: requireOpenRouterApiKey(),
  });
}

export { requireOpenRouterApiKey };

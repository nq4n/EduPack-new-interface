// lib/ai/utils/openrouter.ts

import OpenAI from "openai";

export function getOpenRouterClient() {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY!,
  });
}

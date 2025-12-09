// lib/ai/openrouter.ts
import OpenAI from "openai";

export function getClient() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("Missing OPENROUTER_API_KEY");
  }

  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": process.env.APP_DOMAIN || "http://localhost:3000",
      "X-Title": "EduPack AI",
    },
  });
}

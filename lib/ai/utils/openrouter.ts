// lib/ai/utils/openrouter.ts
import OpenAI from "openai";

export function getOpenRouterClient() {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY!, // ✅ FIXED: server-side env var
    defaultHeaders: {
      "HTTP-Referer": process.env.APP_DOMAIN || "http://localhost:3000",
      "X-Title": "EduPack SCORM AI",
    }
  });
}

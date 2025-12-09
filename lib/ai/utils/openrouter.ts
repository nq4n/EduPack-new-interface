// lib/ai/utils/openrouter.ts
import OpenAI from "openai";

const DEFAULT_MODEL = "amazon/nova-2-lite-v1:free";
const DEFAULT_MAX_TOKENS: number | undefined = undefined;

function parseTimeoutMs() {
  const raw = process.env.OPENROUTER_TIMEOUT_MS;
  if (!raw) return 60_000; // 60s default to avoid multi-minute waits

  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 60_000;
}

export function getOpenRouterModel(fallback?: string) {
  return process.env.OPENROUTER_MODEL?.trim() || fallback || DEFAULT_MODEL;
}

export function getOpenRouterMaxTokens(fallback = DEFAULT_MAX_TOKENS) {
  const raw = process.env.OPENROUTER_MAX_TOKENS;

  if (!raw) return fallback;

  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function requireOpenRouterApiKey() {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();

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
    timeout: parseTimeoutMs(),
  });
}

export { requireOpenRouterApiKey };

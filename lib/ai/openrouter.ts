// lib/ai/openrouter.ts

import { DEFAULT_OPENROUTER_MODEL } from "../env"

export const MODELS = {
  ROUTER: "google/gemma-4-31b-it:free", // primary router model
  MAIN: process.env.OPENROUTER_MODEL || DEFAULT_OPENROUTER_MODEL, // main generation model
} as const

const FALLBACK_STATUSES = new Set([404, 429, 502, 503, 504])

const MODEL_CANDIDATES = {
  ROUTER: uniqueModels([
    MODELS.ROUTER,
    "nvidia/nemotron-3-nano-30b-a3b:free",
    "openrouter/free",
  ]),
  MAIN: uniqueModels([
    MODELS.MAIN,
    "nvidia/nemotron-3-nano-30b-a3b:free",
    "openrouter/free",
  ]),
} as const

type ChatMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

type ChatOptions = {
  model?: keyof typeof MODELS
  temperature?: number
  max_tokens?: number
}

class OpenRouterApiError extends Error {
  status: number
  model: string

  constructor(status: number, model: string, details: string) {
    super(`OpenRouter API error (${status}) [${model}]: ${details}`)
    this.name = "OpenRouterApiError"
    this.status = status
    this.model = model
  }
}

function uniqueModels(models: string[]) {
  return Array.from(new Set(models.filter(Boolean)))
}

async function requestChatCompletion(
  apiKey: string,
  model: string,
  messages: ChatMessage[],
  options: ChatOptions
) {
  const endpoint = "https://openrouter.ai/api/v1/chat/completions"

  const payload = {
    model,
    messages,
    temperature: options.temperature ?? 0.2,
    max_tokens: options.max_tokens ?? 4096,
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "EduPack AI",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new OpenRouterApiError(res.status, model, text || res.statusText)
  }

  const data = await res.json()

  const content =
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.content ||
    ""

  if (!content) {
    throw new Error(`OpenRouter returned empty content for model ${model}`)
  }

  return content
}

export const openrouter = {
  async chat(
    messages: ChatMessage[],
    options: ChatOptions = {}
  ) {
    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      throw new Error("Missing OPENROUTER_API_KEY environment variable")
    }

    const requestedModel = options.model || "MAIN"
    const candidates = MODEL_CANDIDATES[requestedModel]
    let lastError: unknown = null

    try {
      for (let index = 0; index < candidates.length; index += 1) {
        const model = candidates[index]

        try {
          return await requestChatCompletion(apiKey, model, messages, options)
        } catch (err) {
          lastError = err

          const shouldTryFallback =
            err instanceof OpenRouterApiError &&
            FALLBACK_STATUSES.has(err.status) &&
            index < candidates.length - 1

          if (!shouldTryFallback) {
            throw err
          }

          console.warn(
            `OpenRouter model ${model} failed with ${err.status}; trying fallback ${candidates[index + 1]}`
          )
        }
      }

      throw lastError || new Error("OpenRouter request failed")
    } catch (err) {
      console.error("OpenRouter Chat Error:", err)
      throw err
    }
  },
}

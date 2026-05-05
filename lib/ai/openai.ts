// lib/ai/openai.ts

import { getOpenAiConfig } from "../env"

type ChatMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

type ChatOptions = {
  maxTokens?: number
}

async function requestChatCompletion(
  apiKey: string,
  model: string,
  messages: ChatMessage[],
  options: ChatOptions,
) {
  const endpoint = "https://api.openai.com/v1/chat/completions"

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_completion_tokens: options.maxTokens ?? 4096,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`OpenAI API error (${res.status}) [${model}]: ${text || res.statusText}`)
  }

  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content || ""

  if (!content) {
    throw new Error(`OpenAI returned empty content for model ${model}`)
  }

  return content
}

export const openai = {
  async chat(messages: ChatMessage[], options: ChatOptions = {}) {
    const { apiKey, model } = getOpenAiConfig()

    if (!apiKey) {
      throw new Error("Missing OPENAI_API_KEY environment variable")
    }

    return requestChatCompletion(apiKey, model, messages, options)
  },
}

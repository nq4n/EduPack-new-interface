// lib/ai/openrouter.ts

export const MODELS = {
  ROUTER: "nvidia/nemotron-3-nano-30b-a3b:free", // ultra-fast router
  MAIN: "nex-agi/deepseek-v3.1-nex-n1:free",            // main generation model
}

type ChatMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

type ChatOptions = {
  model?: keyof typeof MODELS
  temperature?: number
  max_tokens?: number
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

    const endpoint = "https://openrouter.ai/api/v1/chat/completions"

    const payload = {
      model: MODELS[options.model || "MAIN"],
      messages,
      temperature: options.temperature ?? 0.2,
      max_tokens: options.max_tokens ?? 4096,
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "EduPack AI",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(`OpenRouter API error (${res.status}): ${text}`)
      }

      const data = await res.json()

      const content =
        data?.choices?.[0]?.message?.content ||
        data?.choices?.[0]?.content ||
        ""

      if (!content) {
        throw new Error("OpenRouter returned empty content")
      }

      return content

    } catch (err) {
      console.error("❌ OpenRouter Chat Error:", err)
      throw err
    }
  },
}
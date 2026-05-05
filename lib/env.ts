// lib/env.ts

export const DEFAULT_OPENAI_MODEL = "gpt-5-mini"

const missingEnvMessage = (key: string) =>
  `${key} is not set. Add it to your environment (see .env.example) so the app can reach Supabase and AI providers.`

export function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error(missingEnvMessage("NEXT_PUBLIC_SUPABASE_URL"))
  }

  if (!supabaseAnonKey) {
    throw new Error(missingEnvMessage("NEXT_PUBLIC_SUPABASE_ANON_KEY"))
  }

  return { supabaseUrl, supabaseAnonKey }
}

export function getOpenAiConfig() {
  return {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL,
  }
}

const missingEnvMessage = (key: string) =>
  `${key} is not set. Add it to your environment (see .env.example) so the app can reach Supabase and AI providers.`

export function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("Supabase URL:", supabaseUrl);
  console.log("Supabase Anon Key:", supabaseAnonKey);

  if (!supabaseUrl) {
    throw new Error(missingEnvMessage('NEXT_PUBLIC_SUPABASE_URL'))
  }

  if (!supabaseAnonKey) {
    throw new Error(missingEnvMessage('NEXT_PUBLIC_SUPABASE_ANON_KEY'))
  }

  return { supabaseUrl, supabaseAnonKey }
}

export function getOpenRouterConfig() {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error(missingEnvMessage('OPENROUTER_API_KEY'))
  }

  return {
    apiKey,
    model: process.env.OPENROUTER_MODEL || 'allenai/olmo-3-32b-think:free',
  }
}

export function getOpenAiConfig() {
  return {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-5 Mini',
  }
}

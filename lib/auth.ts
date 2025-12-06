import { supabase } from "./supabase/browser-client"

export async function signUpNewUser(
  email: string,
  password: string,
  name: string,
  preferredLanguage: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        preferred_language: preferredLanguage,
      },
    },
  })

  return { data, error }
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
    },
  })

  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function sendPasswordResetEmail(email: string) {
  const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/update-password` : undefined
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })

  return { error }
}

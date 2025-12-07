import { createClient } from "./supabase/client"
import { ensureUserProfile } from "./user-profile"

export async function signUpNewUser(
  email: string,
  password: string,
  name: string,
  preferredLanguage: string
) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        preferred_language: preferredLanguage,
      },
      emailRedirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/api/auth/callback?next=/`
          : undefined,
    },
  })

  // Ensure user profile is created after signup
  if (data?.user && !error) {
    const { error: profileError } = await ensureUserProfile(data.user)
    if (profileError) {
      console.error('Failed to create user profile:', profileError)
    }
  }

  return { data, error }
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Ensure user profile exists
  if (data?.user && !error) {
    const { error: profileError } = await ensureUserProfile(data.user)
    if (profileError) {
      console.error('Failed to ensure user profile:', profileError)
    }
  }

  return { data, error }
}

export async function signInWithGoogle() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/api/auth/callback?next=/`
          : undefined,
    },
  })

  return { data, error }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function sendPasswordResetEmail(email: string) {
  const supabase = createClient()
  const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/update-password` : undefined
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })

  return { error }
}

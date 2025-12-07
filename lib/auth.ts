import { createClient } from "./supabase/client"
import { ensureUserProfile } from "./user-profile"
import { getAuthCallbackUrl } from "./get-auth-callback-url"

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
      emailRedirectTo: `${getAuthCallbackUrl()}?next=/`,
    },
  })

  console.debug('[AUTH] signUpNewUser result', { data, error })

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

  console.debug('[AUTH] signInWithPassword result', { data, error })

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
      redirectTo: `${getAuthCallbackUrl()}?next=/`,
    },
  })
  console.debug('[AUTH] signInWithGoogle result', { data, error })
  return { data, error }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function sendPasswordResetEmail(email: string) {
  const supabase = createClient()
  const redirectTo = `${getAuthCallbackUrl().replace('/api/auth/callback', '')}/update-password`
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })
  return { error }
}

import { createServerClient as _createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseConfig } from '../env'

export function createServerClient() {
  const cookieStore = cookies()
  try {
    // Diagnostics: show cookieStore shape during server-side creation
    console.debug('[SUPABASE SERVER CLIENT] cookies adapter detected', {
      hasGet: typeof cookieStore.get === 'function',
      hasSet: typeof cookieStore.set === 'function',
      hasKeys: typeof (cookieStore as any).keys === 'function',
    })
  } catch (err: any) {
    console.debug('[SUPABASE SERVER CLIENT] cookie diagnostics failed:', err?.message)
  }
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  return _createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `cookies().set()` method can only be called in a Server Action or Route Handler
            // If you're called from a Server Component, this would be a no-op.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options, maxAge: -1 })
          } catch (error) {
            // The `cookies().set()` method can only be called in a Server Action or Route Handler
            // If you're called from a Server Component, this would be a no-op.
          }
        },
      },
    }
  )
}

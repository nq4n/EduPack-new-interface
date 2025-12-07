import { createServerClient as _createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseConfig } from '../env'

export function createServerClient() {
  const cookieStore = cookies()
  // Diagnostics: show cookieStore shape during server-side creation
  try {
    console.debug('[SUPABASE SERVER CLIENT] raw cookieStore type:', typeof cookieStore)
    // Try to safely check for common methods without throwing
    console.debug('[SUPABASE SERVER CLIENT] cookies adapter detected', {
      hasGet: typeof (cookieStore as any)?.get === 'function',
      hasSet: typeof (cookieStore as any)?.set === 'function',
      hasKeys: typeof (cookieStore as any)?.keys === 'function',
    })
  } catch (err: any) {
    console.debug('[SUPABASE SERVER CLIENT] cookie diagnostics failed:', err?.message)
  }
  
  // Normalize cookie adapter: support several shapes of cookieStore that
  // Next.js might expose depending on runtime/context. Provide safe no-op
  // fallbacks to avoid throwing when a method is missing.
  const cookieAdapter = {
    get(name: string) {
      try {
        if (typeof (cookieStore as any)?.get === 'function') {
          return (cookieStore as any).get(name)?.value
        }
        if (typeof (cookieStore as any)?.getCookie === 'function') {
          return (cookieStore as any).getCookie(name)?.value
        }
        // Some runtimes expose cookies as a plain object map
        if ((cookieStore as any)[name]) {
          const v = (cookieStore as any)[name]
          return typeof v === 'string' ? v : v?.value ?? undefined
        }
      } catch (err) {
        // swallow errors and return undefined so supabase falls back gracefully
      }
      return undefined
    },
    set(name: string, value: string, options: any) {
      try {
        if (typeof (cookieStore as any)?.set === 'function') {
          return (cookieStore as any).set({ name, value, ...options })
        }
        if (typeof (cookieStore as any)?.setCookie === 'function') {
          return (cookieStore as any).setCookie({ name, value, ...options })
        }
      } catch (err) {
        // no-op
      }
    },
    remove(name: string, options: any) {
      try {
        if (typeof (cookieStore as any)?.set === 'function') {
          return (cookieStore as any).set({ name, value: '', ...options, maxAge: -1 })
        }
        if (typeof (cookieStore as any)?.delete === 'function') {
          return (cookieStore as any).delete(name)
        }
      } catch (err) {
        // no-op
      }
    },
  }
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  return _createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: cookieAdapter as unknown as {
        get(name: string): string | undefined
        set(name: string, value: string, options: CookieOptions): void
        remove(name: string, options: CookieOptions): void
      },
    }
  )
}

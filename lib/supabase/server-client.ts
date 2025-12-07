import { createServerClient as _createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseConfig } from '../env'
import { Database } from './database.types'

export function createServerClient() {
  const cookieStore = cookies()
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  return _createServerClient<Database>(
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
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options, maxAge: -1 })
          } catch (error) {
            // The `delete` method was called from a Server Component.
          }
        },
      },
    }
  )
}

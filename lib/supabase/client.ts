import { createClient as createBrowserClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from '../env'
import { Database } from './database.types'

declare global {
  // Allow attaching the client to globalThis for dev/hot-reload environments
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var __EDUPACK_SUPABASE_CLIENT__: SupabaseClient<Database> | undefined
}

export function createClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  // Use a singleton on the browser to avoid creating multiple GoTrueClient
  // instances which lead to race conditions and the warning seen in console.
  if (!(globalThis as any).__EDUPACK_SUPABASE_CLIENT__) {
    const created = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

    // Diagnostics: log basic info about the created client and browser storage
    try {
      // Avoid verbose output in production; use debug build when needed.
      console.debug('[SUPABASE CLIENT] created browser client', {
        supabaseUrl: supabaseUrl?.slice(0, 30) + '...'
      })

      console.debug('[SUPABASE CLIENT] auth methods', {
        getSession: typeof created.auth?.getSession,
        onAuthStateChange: typeof created.auth?.onAuthStateChange,
        signInWithOAuth: typeof (created.auth as any)?.signInWithOAuth,
      })

      try {
        // Check localStorage availability
        console.debug('[SUPABASE CLIENT] localStorage available:', typeof window?.localStorage !== 'undefined')
      } catch (err: any) {
        console.debug('[SUPABASE CLIENT] localStorage check failed:', err?.message)
      }
    } catch (err) {
      // swallow diagnostics errors so client creation doesn't fail
      console.debug('[SUPABASE CLIENT] diagnostics error', err)
    }

    ;(globalThis as any).__EDUPACK_SUPABASE_CLIENT__ = created
  }

  return (globalThis as any).__EDUPACK_SUPABASE_CLIENT__ as SupabaseClient<Database>
}

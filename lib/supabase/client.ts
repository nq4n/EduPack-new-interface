import { createClient as createBrowserClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from '../env'
import { Database } from './database.types'
import { createServerClient } from './server-client'

declare global {
  // Allow attaching the client to globalThis for dev/hot-reload environments
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var __EDUPACK_SUPABASE_CLIENT__: SupabaseClient<Database> | undefined
}

export function createClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  // On the server, return the SSR server client which uses Next cookies() adapter
  if (typeof window === 'undefined') {
    return createServerClient()
  }

  // Use a singleton on the browser to avoid creating multiple GoTrueClient
  // instances which lead to race conditions and the warning seen in console.
  if (!(globalThis as any).__EDUPACK_SUPABASE_CLIENT__) {
    ;(globalThis as any).__EDUPACK_SUPABASE_CLIENT__ = createBrowserClient<Database>(
      supabaseUrl,
      supabaseAnonKey
    )
  }

  return (globalThis as any).__EDUPACK_SUPABASE_CLIENT__ as SupabaseClient<Database>
}

import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseConfig } from '../env'

declare global {
  // eslint-disable-next-line no-var
  var __supabaseBrowserClient: ReturnType<typeof createBrowserClient> | undefined
}

const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

export const supabase = typeof window === 'undefined'
  ? createBrowserClient(supabaseUrl, supabaseAnonKey)
  : globalThis.__supabaseBrowserClient ?? (
    globalThis.__supabaseBrowserClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  )

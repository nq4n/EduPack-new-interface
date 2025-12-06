import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseConfig } from '../env'
import { Database } from './database.types'

export function createClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  )
}

import { createClient as createBrowserClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from '../env'
import { Database } from './database.types'

export function createClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

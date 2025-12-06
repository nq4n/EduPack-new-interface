import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseConfig } from '../env'

const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)

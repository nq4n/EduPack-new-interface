// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// For Next.js, environment variables exposed to the browser must be prefixed
// with NEXT_PUBLIC_.
// Make sure your .env.local file has:
// NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the environment variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required. Make sure they are set in your .env.local file and prefixed with NEXT_PUBLIC_.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
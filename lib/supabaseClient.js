// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Note: If you are in a pure Node.js environment, you would need to configure dotenv:
// import dotenv from 'dotenv';
// dotenv.config();

// Most modern frontend frameworks (Vite, Next.js, Create React App)
// handle .env files automatically. The variables are often exposed
// on a special object like `import.meta.env` or `process.env`.

// Example for Vite or a similar modern setup (recommended)
// Make sure your .env variables are prefixed with VITE_ (e.g., VITE_SUPABASE_URL)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required. Make sure they are set in your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
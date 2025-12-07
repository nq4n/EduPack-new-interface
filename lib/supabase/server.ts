// lib/supabase/server.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function createClient() {
  const cookieStore = cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        // Read a cookie value on the server
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        // Set a cookie (Supabase will use this for auth)
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: any) {
        // Remove a cookie
        cookieStore.set({ name, value: "", ...options });
      },
    },
  });
}

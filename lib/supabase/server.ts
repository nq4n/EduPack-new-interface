// lib/supabase/server.ts

import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function createClient() {
  const cookieStore = await cookies(); // this part is correct

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // ❗ FIX HERE — remove wrong (await cookieStore)
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        }
      }
    }
  );
}

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { getSupabaseConfig } from './lib/env'

export async function middleware(req: any) {
  const res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return res
}

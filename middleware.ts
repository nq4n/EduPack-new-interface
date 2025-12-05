import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a response that we can modify cookies on
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Read cookies from the incoming request
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Write cookies to the outgoing response
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // "Remove" = set empty value + maxAge 0
          response.cookies.set({
            name,
            value: '',
            ...options,
            maxAge: 0,
          })
        },
      },
    }
  )

  // This keeps the auth session fresh (refreshes cookie if needed)
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    // Run middleware on all paths except:
    // - _next/static (static files)
    // - _next/image (image optimization)
    // - favicon.ico
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

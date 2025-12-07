import { createServerClient } from '@/lib/supabase/server-client'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Get the user after session is established
      const { data: { user } } = await supabase.auth.getUser()
      
      // Ensure user profile exists in public.users table
      if (user) {
        const { data: existingProfile, error: selectError } = await supabase
          .from('users')
          .select('user_id')
          .eq('user_id', user.id)
          .single()

        // If profile doesn't exist, create it
        if (!existingProfile && selectError?.code === 'PGRST116') {
          await supabase
            .from('users')
            .insert([
              {
                user_id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || '',
                preferred_language: user.user_metadata?.preferred_language || 'en',
                avatar_url: user.user_metadata?.avatar_url,
              },
            ])
        }
      }
      
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

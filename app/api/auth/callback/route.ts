import { createServerClient } from '@/lib/supabase/server-client'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { getSupabaseConfig } from '@/lib/env'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    try {
      const supabase = createServerClient()
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Exchange code error:', exchangeError)
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }
      
      // Get the user after session is established
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        console.error('Get user error:', userError)
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }
      
      // Ensure user profile exists in public.users table
      const { data: existingProfile, error: selectError } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', user.id)
        .single()

      // If profile doesn't exist, create it
      if (!existingProfile && selectError?.code === 'PGRST116') {
        const { error: insertError } = await supabase
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
        
        // If insert fails with anon key, try with service role
        if (insertError) {
          console.error('Profile creation error with anon key:', insertError)
          
          try {
            const { supabaseUrl } = getSupabaseConfig()
            const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
            
            if (serviceRoleKey) {
              const adminClient = createAdminClient(supabaseUrl, serviceRoleKey)
              const { error: adminInsertError } = await adminClient
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
              
              if (adminInsertError) {
                console.error('Profile creation error with service role:', adminInsertError)
                return NextResponse.redirect(`${origin}/auth/auth-code-error`)
              }
            }
          } catch (adminError) {
            console.error('Admin client error:', adminError)
            return NextResponse.redirect(`${origin}/auth/auth-code-error`)
          }
        }
      }
      
      return NextResponse.redirect(`${origin}${next}`)
    } catch (error) {
      console.error('Callback error:', error)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

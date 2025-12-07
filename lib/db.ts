import { createClient } from './supabase/server'
import { User } from '@supabase/supabase-js'

export const ensureUserProfile = async (user: User) => {
  const supabase = createClient()
  
  // Check if a profile already exists for this user
  const { data: profile, error: getError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  if (getError && getError.code !== 'PGRST116') {
    // PGRST116: 'No rows found' - this is expected if the profile doesn't exist
    console.error('Error checking for user profile:', getError)
    return
  }

  // If a profile doesn't exist, create one
  if (!profile) {
    const { error: insertError } = await supabase.from('profiles').insert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata.full_name,
      preferred_language: user.user_metadata.preferred_language,
    })

    if (insertError) {
      console.error('Error creating user profile:', insertError)
    }
  }
}

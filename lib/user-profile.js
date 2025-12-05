// lib/user-profile.js
import { supabase } from './supabaseClient.js';

/**
 * Ensures a user has a profile in the public.users table.
 * If a profile does not exist for the given user, it creates one.
 *
 * @param {User} user - The user object from Supabase Auth.
 * @returns {Promise<{ profile: any | null, error: Error | null }>}'
 */
export async function ensureUserProfile(user) {
  if (!user) {
    return { profile: null, error: new Error('User object is required.') };
  }

  // 1. Check if a profile already exists
  const { data: existingProfile, error: selectError } = await supabase
    .from('users')
    .select('user_id')
    .eq('user_id', user.id)
    .single();

  if (selectError && selectError.code !== 'PGRST116') { // PGRST116 = "exact one row not found"
    console.error('Error checking for existing profile:', selectError.message);
    return { profile: null, error: selectError };
  }

  // 2. If profile exists, return it
  if (existingProfile) {
    return { profile: existingProfile, error: null };
  }

  // 3. If no profile exists, create one
  console.log('No profile found for user, creating one...');
  const { data: newProfile, error: insertError } = await supabase
    .from('users')
    .insert([
      {
        user_id: user.id,
        full_name: user.user_metadata.full_name,
        email: user.email,
        preferred_language: user.user_metadata.preferred_language || 'en', // Default to 'en' if not provided
        avatar_url: user.user_metadata.avatar_url,
      },
    ])
    .select()
    .single();

  if (insertError) {
    console.error('Error creating user profile:', insertError.message);
    return { profile: null, error: insertError };
  }

  console.log('User profile created successfully:', newProfile);
  return { profile: newProfile, error: null };
}
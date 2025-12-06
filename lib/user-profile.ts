// lib/user-profile.ts
import { supabase } from './supabase/browser-client';
import type { User } from '@supabase/supabase-js';

/**
 * Ensures a user has a profile in the public.users table.
 * If a profile does not exist for the given user, it creates one.
 *
 * @param {User} user - The user object from Supabase Auth.
 * @returns {Promise<{ profile: any | null, error: Error | null }>}'
 */
export async function ensureUserProfile(user: User | null) {
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
    // The profile exists, now fetch the full profile data
    const { data: fullProfile, error: fullProfileError } = await supabase
      .from('users')
      .select('user_id, full_name, email, preferred_language, avatar_url')
      .eq('user_id', user.id)
      .single();

    if (fullProfileError) {
      console.error('Error fetching full profile:', fullProfileError.message);
      return { profile: null, error: fullProfileError };
    }
    
    return { profile: fullProfile, error: null };
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

/**
 * Updates a user's profile.
 *
 * @param {string} userId - The ID of the user to update.
 * @param {object} updates - An object with the fields to update.
 * @returns {Promise<{ profile: any | null, error: Error | null }>}'
 */
export async function updateUserProfile(userId, updates) {
  if (!userId) {
    return { profile: null, error: new Error('User ID is required.') };
  }

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user profile:', error.message);
    return { profile: null, error };
  }

  return { profile: data, error: null };
}

/**
 * Fetches a user's profile.
 *
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<{ profile: any | null, error: Error | null }>}'
 */
export async function getUserProfile(userId) {
  if (!userId) {
    return { data: null, error: new Error('User ID is required.') };
  }

  const { data, error } = await supabase
    .from('users')
    .select('user_id, full_name, email, preferred_language, avatar_url')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}
"use client";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type UserProfileRow = {
  user_id: string;
  email: string | null;
  full_name: string | null;
  preferred_language: string | null;
  avatar_url: string | null;
  created_at: string;
};

// Load current user profile
export async function getUserProfile(userId: string) {
  // RLS already limits to auth.uid(), so userId is mostly for clarity
  const { data, error } = await supabase
    .from("users")
    .select("user_id, email, full_name, preferred_language, avatar_url, created_at")
    .eq("user_id", userId)
    .single();

  return { data, error };
}

// Update current user profile
export async function updateUserProfile(
  userId: string,
  updates: {
    full_name?: string;
    preferred_language?: string;
    avatar_url?: string | null;
  }
) {
  const { error } = await supabase
    .from("users")
    .update({
      full_name: updates.full_name,
      preferred_language: updates.preferred_language,
      avatar_url: updates.avatar_url ?? null,
    })
    .eq("user_id", userId);

  return { error };
}

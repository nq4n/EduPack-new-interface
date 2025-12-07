import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  full_name: string | null;
  preferred_language: string | null;
};

export type Package = {
  package_id: string;
  title: string;
  description: string | null;
  is_listed_in_store: boolean;
  storage_path: string | null;
  created_by_user_id: string;
  created_at: string;
  updated_at: string;
};

export async function getCurrentUserWithProfileAndPackages() {
  const supabase = createClient();

  // 1) auth user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // 2) profile row
  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  if (profileError) {
    console.error("Error fetching profile", profileError);
    throw profileError;
  }

  let profile = existingProfile;

  // create profile if missing
  if (!profile) {
    const fullName =
      (user.user_metadata && user.user_metadata.full_name) || user.email || null;
    const preferredLanguage =
      (user.user_metadata && user.user_metadata.preferred_language) || "en";

    const { data: insertedProfile, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: fullName,
        preferred_language: preferredLanguage,
      })
      .select()
      .single<Profile>();

    if (insertError) {
      console.error("Error creating profile", insertError);
      throw insertError;
    }

    profile = insertedProfile;
  }

  // 3) packages created by this user
  const { data: packages, error: packagesError } = await supabase
    .from("packages")
    .select("*")
    .eq("created_by_user_id", user.id)
    .order("created_at", { ascending: false });

  if (packagesError) {
    console.error("Error fetching user packages", packagesError);
    throw packagesError;
  }

  return {
    user,
    profile,
    packages: (packages as Package[]) ?? [],
  };
}

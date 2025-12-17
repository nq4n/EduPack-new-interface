// app/profile/packages/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OwnedPackagesClient } from "./owned-packages-client";
import { OwnedPackage } from "./types";
import { getProfileStrings, normalizeLanguage } from "../strings";

export default async function OwnedPackagesPage() {
  // ---------------------------
  // 1) AUTHENTICATE USER (server)
  // ---------------------------
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // ---------------------------
  // 2) FETCH OWNED PACKAGES
  // ---------------------------
  const { data: packages, error } = await supabase
    .from("packages")
    .select("package_id, title, description, created_at, storage_path, is_public, grade, subject, price")
    .eq("created_by_user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: profile } = await supabase
    .from("users")
    .select("preferred_language")
    .eq("user_id", user.id)
    .maybeSingle();

  const language = normalizeLanguage(profile?.preferred_language ?? "en");
  const strings = getProfileStrings(language);

  if (error) {
    console.error("Error loading packages:", error);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">
        {strings.packages.heading}
      </h2>

      <OwnedPackagesClient
        packages={(packages as OwnedPackage[]) ?? []}
        language={language}
      />
    </div>
  );
}

// app/profile/packages/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OwnedPackagesClient } from "./owned-packages-client";
import { OwnedPackage } from "./types";

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
    .select("package_id, title, description, created_at, storage_path")
    .eq("created_by_user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading packages:", error);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Owned Packages</h2>

      <OwnedPackagesClient packages={(packages as OwnedPackage[]) ?? []} />
    </div>
  );
}

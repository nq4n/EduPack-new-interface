// app/profile/packages/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Package, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

type PackageItem = {
  package_id: string;
  title: string;
  description: string | null;
  created_at: string;
  storage_path: string | null;
};

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

      {packages && packages.length > 0 ? (
        <div className="space-y-4">
          {packages.map((pkg: PackageItem) => (
            <div
              key={pkg.package_id}
              className="flex items-center justify-between p-4 border border-border rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  {pkg.title}
                </h3>

                {pkg.description && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {pkg.description}
                  </p>
                )}

                <p className="text-sm text-muted-foreground">
                  Created: {new Date(pkg.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <form action={`/api/scorm/download`} method="POST">
                  <input type="hidden" name="path" value={pkg.storage_path ?? ""} />
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </form>

                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No packages yet
          </h3>
          <p className="text-muted-foreground mb-6">
            You haven&apos;t created any packages yet. Start building your first SCORM package.
          </p>
          <Button href="/editor">Create New Package</Button>
        </div>
      )}
    </div>
  );
}

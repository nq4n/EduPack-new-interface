"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { EditorProject } from "@/lib/scorm/types"
import { PackageViewer } from "@/components/scorm/package-viewer"
import { Button } from "@/components/ui/button"
import { Package, Download, Eye, Loader2, X, AlertCircle } from "lucide-react"
import { OwnedPackage } from "./types"

interface OwnedPackagesClientProps {
  packages: OwnedPackage[]
}

export function OwnedPackagesClient({ packages }: OwnedPackagesClientProps) {
  const [previewPackage, setPreviewPackage] = useState<OwnedPackage | null>(null)
  const [previewProject, setPreviewProject] = useState<EditorProject | null>(null)
  const [loadingPreview, setLoadingPreview] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)

  const sortedPackages = useMemo(() => {
    return [...packages].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  }, [packages])

  const handleViewPackage = async (pkg: OwnedPackage) => {
    setPreviewPackage(pkg)
    setPreviewProject(null)
    setPreviewError(null)

    if (!pkg.storage_path) {
      setPreviewError("No storage path found for this package.")
      return
    }

    try {
      setLoadingPreview(true)
      const response = await fetch("/api/scorm/load", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: pkg.storage_path }),
      })

      const body = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(body.error || "Failed to load package")
      }

      setPreviewProject(body.project as EditorProject)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load package"
      setPreviewError(message)
    } finally {
      setLoadingPreview(false)
    }
  }

  const closePreview = () => {
    setPreviewPackage(null)
    setPreviewProject(null)
    setPreviewError(null)
  }

  return (
    <div className="space-y-6">
      {sortedPackages && sortedPackages.length > 0 ? (
        <div className="space-y-4">
          {sortedPackages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="flex items-center justify-between p-4 border border-border rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{pkg.title}</h3>

                {pkg.description && (
                  <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
                )}

                <p className="text-sm text-muted-foreground">
                  Created: {new Date(pkg.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <form action={`/api/scorm/download`} method="POST">
                  <input type="hidden" name="path" value={pkg.storage_path ?? ""} />
                  <Button variant="outline" size="sm" type="submit">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </form>

                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => handleViewPackage(pkg)}
                >
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
          <h3 className="text-lg font-semibold text-foreground mb-2">No packages yet</h3>
          <p className="text-muted-foreground mb-6">
            You haven&apos;t created any packages yet. Start building your first SCORM package.
          </p>
          <Button asChild>
            <Link href="/editor">Create New Package</Link>
          </Button>
        </div>
      )}

      {previewPackage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-2xl">
            <button
              type="button"
              onClick={closePreview}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-8 space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{previewPackage.title}</h3>
              {previewPackage.description ? (
                <p className="text-sm text-muted-foreground">{previewPackage.description}</p>
              ) : null}
            </div>

            <div className="mt-4 space-y-3">
              {loadingPreview ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading package...</span>
                </div>
              ) : previewError ? (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{previewError}</span>
                </div>
              ) : previewProject ? (
                <PackageViewer project={previewProject} />
              ) : (
                <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground">
                  Select a package to preview.
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={closePreview} type="button">
                Close
              </Button>
              {previewPackage.storage_path ? (
                <Button asChild>
                  <Link href={`/scorm-ai?path=${encodeURIComponent(previewPackage.storage_path)}`}>
                    Open in editor
                  </Link>
                </Button>
              ) : (
                <Button disabled title="Package is missing a storage path">
                  Open in editor
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

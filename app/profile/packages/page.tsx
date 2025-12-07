"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Package, Download, Eye, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useSupabase } from "@/components/auth-provider"
import { getUserOwnedPackages } from "@/lib/profile-data"

type PackageItem = {
  package_id: string
  title: string
  description: string | null
  created_at: string
}

export default function OwnedPackagesPage() {
  const { user } = useSupabase()
  const [packages, setPackages] = useState<PackageItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadPackages = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const { data, error } = await getUserOwnedPackages(user.id)
      if (error) {
        toast.error("Failed to load packages")
      } else {
        setPackages(data || [])
      }
    } catch (error) {
      toast.error("Error loading packages")
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadPackages()
  }, [loadPackages])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Owned Packages</h2>

      {packages.length > 0 ? (
        <div className="space-y-4">
          {packages.map((pkg) => (
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
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
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
          <h3 className="text-lg font-semibold text-foreground mb-2">No packages yet</h3>
          <p className="text-muted-foreground mb-6">
            You haven't created any packages yet. Start creating your first SCORM package.
          </p>
          <Button>Create New Package</Button>
        </div>
      )}
    </div>
  )


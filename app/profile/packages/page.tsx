"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Download, Eye } from "lucide-react"

export default function OwnedPackagesPage() {
  const packages = [
    {
      id: 1,
      title: "Introduction to Fractions",
      grade: "Grade 5",
      subject: "Mathematics",
      purchaseDate: "2024-12-15",
    },
    {
      id: 2,
      title: "Solar System Explorer",
      grade: "Grade 7",
      subject: "Science",
      purchaseDate: "2024-12-10",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Owned Packages</h2>

      {packages.length > 0 ? (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{pkg.title}</h3>
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {pkg.grade}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {pkg.subject}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Purchased: {pkg.purchaseDate}</p>
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
          <p className="text-muted-foreground mb-6">You haven't bought any packages yet. Browse the Package Shop.</p>
          <Button>Browse Package Shop</Button>
        </div>
      )}
    </div>
  )
}

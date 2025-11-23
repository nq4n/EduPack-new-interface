"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Trash2, Edit } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

export default function MyPackagesPage() {
  const { t } = useLocale()
  const [packages] = useState([
    {
      id: 1,
      title: "Introduction to Fractions",
      subject: "Mathematics",
      downloads: 1234,
      rating: 4.8,
      status: "published",
      image: "/math-fractions-classroom.jpg",
    },
    {
      id: 2,
      title: "Solar System Explorer",
      subject: "Science",
      downloads: 856,
      rating: 4.9,
      status: "published",
      image: "/solar-system-space-planets.jpg",
    },
    {
      id: 3,
      title: "Shakespeare Introduction",
      subject: "Literature",
      downloads: 0,
      rating: 0,
      status: "draft",
      image: "/shakespeare-theatre-literature.jpg",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">{t("account.packages.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("account.packages.description")}</p>
        </div>
        <Button>{t("account.packages.create")}</Button>
      </div>

      <div className="grid gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="p-6">
            <div className="flex gap-6">
              <img
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.title}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{pkg.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{pkg.subject}</p>
                  </div>
                  <Badge variant={pkg.status === "published" ? "default" : "secondary"}>{pkg.status}</Badge>
                </div>

                <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    {pkg.downloads} downloads
                  </span>
                  {pkg.rating > 0 && <span>⭐ {pkg.rating}</span>}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

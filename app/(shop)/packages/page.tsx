"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"
import { t } from "@/lib/translations"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"

export default function ShopPage() {
  const { locale } = useLocale()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock packages data
  const packages = [
    {
      id: 1,
      title: t(locale, "shop.packages.1.title"),
      grade: t(locale, "shop.packages.1.grade"),
      subject: t(locale, "shop.packages.1.subject"),
      language: t(locale, "shop.packages.1.language"),
      description: t(locale, "shop.packages.1.description"),
      price: t(locale, "shop.packages.1.price"),
      thumbnail: "/math-fractions-classroom.jpg",
    },
    {
      id: 2,
      title: t(locale, "shop.packages.2.title"),
      grade: t(locale, "shop.packages.2.grade"),
      subject: t(locale, "shop.packages.2.subject"),
      language: t(locale, "shop.packages.2.language"),
      description: t(locale, "shop.packages.2.description"),
      price: "$12.99",
      thumbnail: "/solar-system-space-planets.jpg",
    },
    {
      id: 3,
      title: t(locale, "shop.packages.3.title"),
      grade: t(locale, "shop.packages.3.grade"),
      subject: t(locale, "shop.packages.3.subject"),
      language: t(locale, "shop.packages.3.language"),
      description: t(locale, "shop.packages.3.description"),
      price: "$9.99",
      thumbnail: "/shakespeare-theatre-literature.jpg",
    },
    {
      id: 4,
      title: t(locale, "shop.packages.4.title"),
      grade: t(locale, "shop.packages.4.grade"),
      subject: t(locale, "shop.packages.4.subject"),
      language: t(locale, "shop.packages.4.language"),
      description: t(locale, "shop.packages.4.description"),
      price: "$14.99",
      thumbnail: "/chemistry-lab-science-education.jpg",
    },
    {
      id: 5,
      title: t(locale, "shop.packages.5.title"),
      grade: t(locale, "shop.packages.5.grade"),
      subject: t(locale, "shop.packages.5.subject"),
      language: t(locale, "shop.packages.5.language"),
      description: t(locale, "shop.packages.5.description"),
      price: t(locale, "shop.packages.5.price"),
      thumbnail: "/world-map-geography-education.jpg",
    },
    {
      id: 6,
      title: t(locale, "shop.packages.6.title"),
      grade: t(locale, "shop.packages.6.grade"),
      subject: t(locale, "shop.packages.6.subject"),
      language: t(locale, "shop.packages.6.language"),
      description: t(locale, "shop.packages.6.description"),
      price: "$19.99",
      thumbnail: "/coding-programming-computer-education.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{t(locale, "shop.title")}</h1>
          <p className="text-muted-foreground">{t(locale, "shop.desc")}</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t(locale, "shop.search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
              <option>{t(locale, "shop.filter.grades")}</option>
              <option>{t(locale, "shop.filter.elementary")}</option>
              <option>{t(locale, "shop.filter.middleSchool")}</option>
              <option>{t(locale, "shop.filter.highSchool")}</option>
            </select>
            <select className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
              <option>{t(locale, "shop.filter.subjects")}</option>
              <option>{t(locale, "shop.filter.mathematics")}</option>
              <option>{t(locale, "shop.filter.science")}</option>
              <option>{t(locale, "shop.filter.literature")}</option>
            </select>
            <select className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
              <option>{t(locale, "shop.filter.sort")}</option>
              <option>{t(locale, "shop.filter.newest")}</option>
              <option>{t(locale, "shop.filter.priceLowHigh")}</option>
              <option>{t(locale, "shop.filter.priceHighLow")}</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">
              {t(locale, "shop.filter.free")}
            </Button>
            <Button variant="outline" size="sm">
              {t(locale, "shop.filter.paid")}
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              {t(locale, "shop.filter.more")}
            </Button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} locale={locale} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button size="sm">2</Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function PackageCard({ package: pkg, locale }: { package: any; locale: "en" | "ar" }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <img src={pkg.thumbnail || "/placeholder.svg"} alt={pkg.title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2">{pkg.title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {pkg.grade}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {pkg.subject}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {pkg.language}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{pkg.price}</span>
          <Link href={`/packages/${pkg.id}`}>
            <Button size="sm">{t(locale, "shop.view")}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"
import { t } from "@/lib/translations"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { type PackageRecord, fetchPackageList } from "@/lib/scorm/package-data"

export default function ShopPage() {
  const { locale } = useLocale()
  const [searchQuery, setSearchQuery] = useState("")
  const [packages, setPackages] = useState<PackageRecord[]>([])
  const [loadingPackages, setLoadingPackages] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPackages = async () => {
      setLoadingPackages(true)
      const { packages: loadedPackages, error: loadError } = await fetchPackageList(locale)
      setPackages(loadedPackages)
      setError(loadError ?? null)
      setLoadingPackages(false)
    }

    loadPackages()
  }, [locale])

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) =>
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [packages, searchQuery])

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{t(locale, "shop.title")}</h1>
          <p className="text-muted-foreground">{t(locale, "shop.desc")}</p>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}

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
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} locale={locale} loading={loadingPackages} />
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

function PackageCard({
  package: pkg,
  locale,
  loading,
}: {
  package: PackageRecord
  locale: "en" | "ar"
  loading?: boolean
}) {
  const project = pkg.content
  const pageCount = project?.pages?.length || 0
  const blockCount = project?.pages?.reduce((total, page) => total + (page.blocks?.length || 0), 0) || 0

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
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          {project ? (
            <span>
              {t(locale, "shop.preview.meta", { pages: pageCount, blocks: blockCount })}
            </span>
          ) : (
            <span>{loading ? t(locale, "shop.preview.loading") : t(locale, "shop.preview.sampleMeta")}</span>
          )}
        </div>
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

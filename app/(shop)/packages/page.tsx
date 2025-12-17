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
  const [grade, setGrade] = useState<string>("all")
  const [subject, setSubject] = useState<string>("all")
  const [sort, setSort] = useState<string>("newest")
  const [priceFilter, setPriceFilter] = useState<string>("all")
  const [packages, setPackages] = useState<PackageRecord[]>([])
  const [loadingPackages, setLoadingPackages] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 9

  useEffect(() => {
    const loadPackages = async () => {
      setLoadingPackages(true)
      setCurrentPage(1)
      const { packages: loadedPackages, error: loadError } = await fetchPackageList(
        locale,
        {
          grade: grade !== "all" ? grade : undefined,
          subject: subject !== "all" ? subject : undefined,
          sort,
          price: priceFilter !== "all" ? priceFilter : undefined,
        }
      )
      setPackages(loadedPackages)
      setError(loadError ?? null)
      setLoadingPackages(false)
    }

    loadPackages()
  }, [locale, grade, subject, sort, priceFilter])

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) =>
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [packages, searchQuery])

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage)
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredPackages.slice(start, start + itemsPerPage)
  }, [filteredPackages, currentPage])

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
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="all">{t(locale, "shop.filter.grades")}</option>
              <option value="elementary">{t(locale, "shop.filter.elementary")}</option>
              <option value="middleSchool">{t(locale, "shop.filter.middleSchool")}</option>
              <option value="highSchool">{t(locale, "shop.filter.highSchool")}</option>
            </select>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="all">{t(locale, "shop.filter.subjects")}</option>
              <option value="mathematics">{t(locale, "shop.filter.mathematics")}</option>
              <option value="science">{t(locale, "shop.filter.science")}</option>
              <option value="literature">{t(locale, "shop.filter.literature")}</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="newest">{t(locale, "shop.filter.newest")}</option>
              <option value="priceLowHigh">{t(locale, "shop.filter.priceLowHigh")}</option>
              <option value="priceHighLow">{t(locale, "shop.filter.priceHighLow")}</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant={priceFilter === "free" ? "default" : "outline"}
              size="sm"
              onClick={() => setPriceFilter(priceFilter === "free" ? "all" : "free")}
            >
              {t(locale, "shop.filter.free")}
            </Button>
            <Button
              variant={priceFilter === "paid" ? "default" : "outline"}
              size="sm"
              onClick={() => setPriceFilter(priceFilter === "paid" ? "all" : "paid")}
            >
              {t(locale, "shop.filter.paid")}
            </Button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loadingPackages ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">{t(locale, "shop.loading")}</p>
            </div>
          ) : paginatedPackages.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">{t(locale, "shop.noPackages")}</p>
            </div>
          ) : (
            paginatedPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} locale={locale} loading={loadingPackages} />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i
              return page <= totalPages ? (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ) : null
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
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
  const [purchasing, setPurchasing] = useState(false)
  const project = pkg.content
  const pageCount = project?.pages?.length || 0
  const blockCount = project?.pages?.reduce((total, page) => total + (page.blocks?.length || 0), 0) || 0

  const isFree = !pkg.price || pkg.price === 0 || String(pkg.price) === "0"

  const formattedPrice = useMemo(() => {
    if (isFree) return "FREE"
    const priceInCents = typeof pkg.price === 'number' ? pkg.price : parseInt(String(pkg.price)) || 0
    return `$${(priceInCents / 100).toFixed(2)}`
  }, [pkg.price, isFree])

  const handlePurchase = async () => {
    try {
      setPurchasing(true)
      
      // For free packages, just record access
      // For paid packages, redirect to checkout
      if (isFree) {
        const response = await fetch("/api/scorm/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ package_id: pkg.id, price: 0 }),
        })

        if (response.ok) {
          // Redirect to the package
          window.location.href = `/packages/${pkg.id}`
        }
      } else {
        // Redirect to checkout with package info
        window.location.href = `/checkout?package_id=${pkg.id}&price=${encodeURIComponent(pkg.price)}`
      }
    } catch (err) {
      console.error("Purchase error:", err)
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <img src={pkg.thumbnail || "/placeholder.svg"} alt={pkg.title} className="w-full h-48 object-cover" />
      <div className="p-5 flex flex-col flex-1">
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
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{pkg.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          {project ? (
            <span>
              {t(locale, "shop.preview.meta", { pages: pageCount, blocks: blockCount })}
            </span>
          ) : (
            <span>{loading ? t(locale, "shop.preview.loading") : t(locale, "shop.preview.sampleMeta")}</span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{formattedPrice}</span>
            {isFree && <Badge className="text-xs">FREE</Badge>}
          </div>
          <div className="flex gap-2">
            <Link href={`/packages/${pkg.id}`}>
              <Button size="sm" variant="outline">
                {t(locale, "shop.view")}
              </Button>
            </Link>
            <Button 
              size="sm" 
              onClick={handlePurchase}
              disabled={purchasing}
              className="whitespace-nowrap"
            >
              {purchasing ? "..." : isFree ? "Get Free" : "Buy Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PackageCard } from "./package-card"
import { useLocale } from "@/hooks/use-locale"
import { fetchPackageList, type PackageRecord } from "@/lib/scorm/package-data"

export function FeaturedPackages() {
  const { locale, t } = useLocale()
  const [packages, setPackages] = useState<PackageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { packages: loadedPackages, error: loadError } = await fetchPackageList(locale)
      setPackages(loadedPackages.slice(0, 3))
      setError(loadError ?? null)
      setLoading(false)
    }

    load()
  }, [locale])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-6">
          {t("featured-packages.title")}
        </h2>
        {error ? (
          <div className="mx-auto mb-6 max-w-3xl rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-center text-sm text-destructive">
            {error}
          </div>
        ) : null}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`placeholder-${idx}`}
                  className="h-64 rounded-xl border border-dashed border-border bg-muted/40 animate-pulse"
                />
              ))
            : packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  id={pkg.id}
                  title={pkg.title}
                  description={pkg.description}
                  grade={pkg.grade}
                  subject={pkg.subject}
                  language={pkg.language}
                  price={pkg.price}
                  thumbnail={pkg.thumbnail}
                />
              ))}
        </div>
        <div className="text-center">
          <Link href="/packages">
            <Button size="lg" variant="outline" className="bg-transparent">
              {t("hero.cta.browse")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
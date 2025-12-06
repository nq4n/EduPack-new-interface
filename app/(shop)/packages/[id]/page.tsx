"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PackageViewer } from "@/components/scorm/package-viewer"
import { EditorProject } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"

interface PackageRecord {
  id: string
  title?: string
  description?: string
  content?: EditorProject
  created_at?: string
  storage_path?: string
}

export default function PackagePreviewPage() {
  const params = useParams()
  const { t, locale } = useLocale()
  const [data, setData] = useState<PackageRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const buildPlaceholder = useCallback((): EditorProject => ({
    id: typeof params.id === "string" ? params.id : "preview",
    title: t("shop.preview.placeholderTitle") || t("scorm.ai.untitledProject"),
    version: "1.0",
    theme: { direction: locale === "ar" ? "rtl" : "ltr", styles: {} },
    pages: [
      {
        id: "page-1",
        title: t("shop.preview.samplePage"),
        blocks: [
          {
            id: "intro",
            type: "text",
            html: `<p>${t("shop.preview.sampleIntro")}</p>`,
            style: { size: "18px", lineHeight: "1.6", padding: "12px" },
          },
        ],
      },
    ],
  }), [locale, params.id, t])

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/scorm/package/${params.id}`)
        if (!response.ok) {
          const body = await response.json().catch(() => ({}))
          throw new Error(body.error || "Failed to load package")
        }
        const body = await response.json()
        setData(body.data)
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    if (params?.id) {
      fetchPackage()
    }
  }, [params?.id])

  const project: EditorProject = useMemo(() => {
    return (data?.content as EditorProject) || buildPlaceholder()
  }, [data?.content, buildPlaceholder])

  const pageCount = project.pages?.length || 0
  const blockCount = project.pages?.reduce((total, page) => total + (page.blocks?.length || 0), 0) || 0

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {t("shop.preview.breadcrumb")}
            </p>
            <h1 className="text-3xl font-bold text-foreground">
              {data?.title || project.title || t("shop.preview.placeholderTitle")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("shop.preview.meta", { pages: pageCount, blocks: blockCount })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[11px]">
              {project.theme?.direction === "rtl"
                ? t("shop.preview.languageRtl")
                : t("shop.preview.languageLtr")}
            </Badge>
            <Button size="sm" variant="outline" onClick={() => window.history.back()}>
              {t("shop.preview.back")}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl border border-dashed border-border p-6 text-center text-muted-foreground">
            {t("shop.preview.loading")}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-destructive bg-destructive/10 p-6 text-center text-destructive">
            {t("shop.preview.error")}: {error}
          </div>
        ) : (
          <PackageViewer project={project} />
        )}
      </div>
    </div>
  )
}

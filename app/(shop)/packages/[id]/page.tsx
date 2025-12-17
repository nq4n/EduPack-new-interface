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
  price?: number | string
  grade?: string
  subject?: string
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
  const [purchasing, setPurchasing] = useState(false)
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null)

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

  const isFree = !data?.price || data.price === 0 || data.price === "0"

  const handlePurchase = async () => {
    try {
      setPurchasing(true)
      setPurchaseMessage(null)

      const response = await fetch("/api/scorm/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package_id: data?.id, price: data?.price || 0 }),
      })

      const body = await response.json()

      if (!response.ok) {
        if (response.status === 400 && body.error?.includes("Already purchased")) {
          setPurchaseMessage("You already own this package!")
        } else {
          throw new Error(body.error || "Purchase failed")
        }
      } else {
        setPurchaseMessage("Purchase successful! You can now download this package.")
      }
    } catch (err) {
      setPurchaseMessage(err instanceof Error ? err.message : "Purchase failed")
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-4 px-4 sm:px-8">
      <div className="w-full h-[calc(100vh-6rem)] mx-auto flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
              {t("shop.preview.breadcrumb")}
            </p>
            <h1 className="text-2xl font-bold text-slate-900">
              {data?.title || project.title || t("shop.preview.placeholderTitle")}
            </h1>
            {data?.description && (
              <p className="text-sm text-slate-600 mt-1">{data.description}</p>
            )}
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => window.history.back()}
            className="ml-4"
          >
            {t("shop.preview.back")}
          </Button>
        </div>

        {/* 3-Column Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Package Info */}
          <div className="w-80 border-r border-slate-200 bg-slate-50/50 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Meta Info */}
              <div>
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
                  Package Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-xs text-slate-500">Pages & Blocks</span>
                    <p className="font-medium text-slate-900">
                      {t("shop.preview.meta", { pages: pageCount, blocks: blockCount })}
                    </p>
                  </div>
                  {data?.grade && (
                    <div>
                      <span className="text-xs text-slate-500">Grade Level</span>
                      <p className="font-medium text-slate-900">{data.grade}</p>
                    </div>
                  )}
                  {data?.subject && (
                    <div>
                      <span className="text-xs text-slate-500">Subject</span>
                      <p className="font-medium text-slate-900">{data.subject}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-slate-500">Language</span>
                    <p className="font-medium text-slate-900">
                      {project.theme?.direction === "rtl"
                        ? t("shop.preview.languageRtl")
                        : t("shop.preview.languageLtr")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
                  Pricing
                </h3>
                <div className="mb-4">
                  {isFree ? (
                    <div>
                      <p className="text-2xl font-bold text-green-600">FREE</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Price</p>
                      <p className="text-3xl font-bold text-sky-600">
                        ${((typeof data?.price === 'number' ? data.price : parseInt(data?.price as string) || 0) / 100).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
                <Button 
                  size="lg"
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="w-full whitespace-nowrap rounded-xl h-11 bg-sky-600 hover:bg-sky-700 text-white"
                >
                  {purchasing ? "Processing..." : isFree ? "Get for Free" : "Buy Now"}
                </Button>
              </div>
            </div>
          </div>

          {/* Center - Content Preview */}
          <div className="flex-1 overflow-y-auto p-8 bg-white">
            {purchaseMessage && (
              <div className={`rounded-xl border p-4 mb-6 ${
                purchaseMessage.includes("successful") || purchaseMessage.includes("already")
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}>
                {purchaseMessage}
              </div>
            )}

            {loading ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin">⟳</div>
                  <span>{t("shop.preview.loading")}</span>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
                {t("shop.preview.error")}: {error}
              </div>
            ) : (
              <PackageViewer project={project} />
            )}
          </div>

          {/* Right Sidebar - Actions */}
          <div className="w-64 border-l border-slate-200 bg-slate-50/50 p-6 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
                  About
                </h3>
                <div className="space-y-2">
                  {data?.created_at && (
                    <div className="text-xs">
                      <span className="text-slate-500">Published:</span>
                      <p className="text-slate-700 font-medium">
                        {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
                          new Date(data.created_at)
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

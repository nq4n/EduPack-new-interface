"use client"

import { useMemo, useState } from "react"
import { EditorPage, EditorProject } from "@/lib/scorm/types"
import { BlockRenderer } from "@/lib/scorm/block-engine"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"

interface PackageViewerProps {
  project: EditorProject
  className?: string
}

export function PackageViewer({ project, className }: PackageViewerProps) {
  const { t } = useLocale()
  const [activePageId, setActivePageId] = useState<string>(
    project.pages?.[0]?.id ?? ""
  )

  const activePage: EditorPage | null = useMemo(() => {
    return project.pages?.find((page) => page.id === activePageId) ?? null
  }, [activePageId, project.pages])

  const isRtl = project.theme?.direction === "rtl"

  return (
    <div className={className} dir={isRtl ? "rtl" : undefined}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {project.pages?.map((page, index) => {
          const label = page.title || t("shop.preview.untitledPage") || t("scorm.ai.introduction")
          return (
            <Button
              key={page.id}
              size="sm"
              variant={page.id === activePageId ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActivePageId(page.id)}
            >
              <Badge variant="secondary" className="mr-2 text-[10px]">
                {index + 1}
              </Badge>
              {label}
            </Button>
          )
        })}
      </div>

      <div className="rounded-xl border border-border bg-card/70 shadow-sm p-4">
        {activePage && activePage.blocks && activePage.blocks.length > 0 ? (
          <div className="space-y-4">
            {activePage.blocks.map((block) => (
              <div key={block.id} className="rounded-2xl border bg-background px-4 py-3">
                <BlockRenderer block={block} theme={project.theme} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-muted-foreground">
            {t("shop.preview.emptyPage")}
          </div>
        )}
      </div>
    </div>
  )
}

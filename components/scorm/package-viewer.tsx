"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
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
  const [editableProject, setEditableProject] = useState(project)
  const [activePageId, setActivePageId] = useState<string>(
    project.pages?.[0]?.id ?? "",
  )

  useEffect(() => {
    setEditableProject(project)

    setActivePageId((current) => {
      if (project.pages?.some((page) => page.id === current)) return current
      return project.pages?.[0]?.id ?? ""
    })
  }, [project])

  const handleTextChange = useCallback((blockId: string, html: string) => {
    setEditableProject((prev) => ({
      ...prev,
      pages:
        prev.pages?.map((page) => ({
          ...page,
          blocks:
            page.blocks?.map((block) =>
              block.id === blockId && block.type === "text"
                ? { ...block, html }
                : block,
            ) || [],
        })) || [],
    }))
  }, [])

  const activePage: EditorPage | null = useMemo(() => {
    return editableProject.pages?.find((page) => page.id === activePageId) ?? null
  }, [activePageId, editableProject.pages])

  const isRtl = editableProject.theme?.direction === "rtl"

  return (
    <div className={className} dir={isRtl ? "rtl" : undefined}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {editableProject.pages?.map((page, index) => {
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
                <BlockRenderer
                  block={block}
                  theme={editableProject.theme}
                  onTextChange={handleTextChange}
                />
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

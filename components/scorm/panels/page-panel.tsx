"use client"

import React from "react"
import { EditorProject, EditorPage } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUp, ArrowDown, Trash2 } from "lucide-react"

interface PagePanelProps {
  project: EditorProject
  onChange: (updated: EditorProject) => void
  onAddPage: () => void
}

export default function PagePanel({ project, onChange, onAddPage }: PagePanelProps) {
  const { t } = useLocale()

  const handlePageTitleChange = (pageId: string, newTitle: string) => {
    const updatedPages = project.pages.map((p) =>
      p.id === pageId ? { ...p, title: newTitle } : p
    )
    onChange({ ...project, pages: updatedPages })
  }

  const handleMovePage = (pageId: string, direction: "up" | "down") => {
    const index = project.pages.findIndex((p) => p.id === pageId)
    if (index === -1) return

    const newPages = [...project.pages]
    const newIndex = direction === "up" ? index - 1 : index + 1

    if (newIndex < 0 || newIndex >= newPages.length) return

    const [movedPage] = newPages.splice(index, 1)
    newPages.splice(newIndex, 0, movedPage)
    onChange({ ...project, pages: newPages })
  }

  const handleDeletePage = (pageId: string) => {
    if (project.pages.length <= 1) {
      alert(t("scorm.projectPanel.deleteLastPageError") || "You cannot delete the last page.")
      return
    }
    if (window.confirm(t("scorm.projectPanel.deleteConfirm") || "Are you sure you want to delete this page?")) {
      const updatedPages = project.pages.filter((p) => p.id !== pageId)
      onChange({ ...project, pages: updatedPages })
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold leading-none">
              {t('scorm.projectPanel.pageOrganization') || 'Page Organization'}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              {t('scorm.pagePanel.subtitle') || 'Manage your course pages.'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-3 text-xs space-y-4">
        {/* Page Organization */}
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                 <h4 className="font-semibold text-slate-700 text-xs">
                    {t('scorm.projectPanel.pageOrganization') || 'Page Organization'}
                </h4>
                <Button size="sm" variant="outline" onClick={onAddPage} className="h-6 px-2 text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    {t('scorm.projectPanel.addPage') || 'Add Page'}
                </Button>
            </div>
            <div className="space-y-2">
                {project.pages.map((page, index) => (
                    <div key={page.id} className="flex items-center gap-2 p-2 rounded-md bg-slate-50 border border-slate-100">
                        <div className="flex-1">
                             <input
                                type="text"
                                className="w-full border-transparent bg-transparent rounded px-1 py-0.5 text-xs focus:bg-white focus:border-slate-300"
                                value={page.title}
                                onChange={(e) => handlePageTitleChange(page.id, e.target.value)}
                                />
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleMovePage(page.id, 'up')} disabled={index === 0}>
                                <ArrowUp className="h-3 w-3" />
                            </Button>
                             <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleMovePage(page.id, 'down')} disabled={index === project.pages.length - 1}>
                                <ArrowDown className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-600" onClick={() => handleDeletePage(page.id)} disabled={project.pages.length <= 1}>
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}

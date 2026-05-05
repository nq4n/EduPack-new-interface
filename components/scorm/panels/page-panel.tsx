"use client"

import React from "react"
import { EditorProject } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUp, ArrowDown, Trash2 } from "lucide-react"

interface PagePanelProps {
  project: EditorProject
  onChange: (updated: EditorProject) => void
  onAddPage: () => void
}

const inputClassName =
  "h-10 w-full rounded-xl border border-slate-200 bg-slate-50/90 px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:bg-slate-950 dark:focus:ring-sky-500/20"

export default function PagePanel({
  project,
  onChange,
  onAddPage,
}: PagePanelProps) {
  const { t } = useLocale()

  const handlePageTitleChange = (pageId: string, newTitle: string) => {
    const updatedPages = project.pages.map((p) =>
      p.id === pageId ? { ...p, title: newTitle } : p,
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
      alert(
        t("scorm.projectPanel.deleteLastPageError") ||
          "You cannot delete the last page.",
      )
      return
    }

    if (
      window.confirm(
        t("scorm.projectPanel.deleteConfirm") ||
          "Are you sure you want to delete this page?",
      )
    ) {
      const updatedPages = project.pages.filter((p) => p.id !== pageId)
      onChange({ ...project, pages: updatedPages })
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-4 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Lesson Flow
            </p>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {t("scorm.projectPanel.pageOrganization") || "Page Organization"}
            </h3>
            <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">
              {t("scorm.pagePanel.subtitle") || "Manage your course pages."}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={onAddPage}
            className="rounded-full border-sky-200 bg-sky-50 px-3 text-sky-700 hover:bg-sky-100 hover:text-sky-800 dark:border-sky-500/40 dark:bg-sky-500/15 dark:text-sky-200 dark:hover:bg-sky-500/25 dark:hover:text-sky-100"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            {t("scorm.projectPanel.addPage") || "Add Page"}
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-12">
        {project.pages.map((page, index) => (
          <div
            key={page.id}
            className="rounded-[24px] border border-slate-200 bg-white/95 p-3 shadow-[0_14px_32px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-none"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                {index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {t("scorm.tools.newPage", { number: index + 1 })}
                </label>
                <input
                  type="text"
                  className={inputClassName}
                  value={page.title}
                  onChange={(e) =>
                    handlePageTitleChange(page.id, e.target.value)
                  }
                />
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  onClick={() => handleMovePage(page.id, "up")}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  onClick={() => handleMovePage(page.id, "down")}
                  disabled={index === project.pages.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:text-rose-300 dark:hover:bg-rose-500/15 dark:hover:text-rose-200"
                  onClick={() => handleDeletePage(page.id)}
                  disabled={project.pages.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

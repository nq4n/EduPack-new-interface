"use client"

import React from "react"
import { EditorProject, EditorPage } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUp, ArrowDown, Trash2 } from "lucide-react"

interface ProjectPanelProps {
  project: EditorProject
  onChange: (updated: EditorProject) => void
  onAddPage: () => void
}

export default function ProjectPanel({ project, onChange, onAddPage }: ProjectPanelProps) {
  const { t } = useLocale()

  const updateProject = (partial: Partial<EditorProject>) => {
    onChange({
      ...project,
      ...partial,
    })
  }

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
              {t("scorm.projectPanel.title") || "Project Settings"}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              {t("scorm.projectPanel.subtitle") || "Manage overall course settings."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-3 text-xs space-y-4">
        {/* General Settings */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700 text-xs mt-2">
            {t("scorm.projectPanel.generalSettings") || "General"}
          </h4>
          <div>
            <label className="block mb-1 text-xs font-medium">
              {t("scorm.projectPanel.projectTitle") || "Project Title"}
            </label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1 text-xs"
              value={project.title}
              onChange={(e) => updateProject({ title: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-medium">
              {t("scorm.props.project.direction.title") || "Text Direction"}
            </label>
            <select
              className="w-full border rounded px-2 py-1 text-xs"
              value={project.theme.direction}
              onChange={(e) =>
                updateProject({
                  theme: {
                    ...project.theme,
                    direction: e.target.value as "ltr" | "rtl",
                  },
                })
              }
            >
              <option value="ltr">
                {t("scorm.props.project.direction.ltr") || "Left-to-Right"}
              </option>
              <option value="rtl">
                {t("scorm.props.project.direction.rtl") || "Right-to-Left"}
              </option>
            </select>
          </div>
        </div>

        {/* Default Styles */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700 text-xs mt-2">
            {t("scorm.props.project.styles.title") || "Default Styles"}
          </h4>
          <div>
            <label className="block mb-1 text-xs font-medium">
              {t('scorm.props.project.styles.textColor')}
            </label>
            <input
              type="color"
              className="w-full"
              value={project.theme.styles.color || "#000000"}
              onChange={(e) =>
                updateProject({
                  theme: {
                    ...project.theme,
                    styles: { ...project.theme.styles, color: e.target.value },
                  },
                })
              }
            />
          </div>
        </div>

        {/* General Tracking */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700 text-xs mt-2">
            {t("scorm.projectPanel.generalTracking")}
          </h4>
          <div className="flex items-center gap-4">
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="radio"
                name="trackingLevel"
                value="minimal"
                checked={project.tracking?.level === "minimal"}
                onChange={() => updateProject({ tracking: { ...project.tracking, level: "minimal" } })}
                className="form-radio h-3 w-3 text-blue-600"
              />
              <span>{t("scorm.projectPanel.tracking.minimal")}</span>
            </label>
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="radio"
                name="trackingLevel"
                value="standard"
                checked={project.tracking?.level === "standard"}
                onChange={() => updateProject({ tracking: { ...project.tracking, level: "standard" } })}
                className="form-radio h-3 w-3 text-blue-600"
              />
              <span>{t("scorm.projectPanel.tracking.standard")}</span>
            </label>
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="radio"
                name="trackingLevel"
                value="advanced"
                checked={project.tracking?.level === "advanced"}
                onChange={() => updateProject({ tracking: { ...project.tracking, level: "advanced" } })}
                className="form-radio h-3 w-3 text-blue-600"
              />
              <span>{t("scorm.projectPanel.tracking.advanced")}</span>
            </label>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700 text-xs mt-2">
            {t("scorm.projectPanel.advancedOptions")}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.tracking?.pageViews}
                onChange={(e) => updateProject({ tracking: { ...project.tracking, pageViews: e.target.checked } })}
                className="form-checkbox h-3 w-3 text-blue-600"
              />
              <span>{t("scorm.projectPanel.tracking.pageViews")}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.tracking?.quizInteractions}
                onChange={(e) => updateProject({ tracking: { ...project.tracking, quizInteractions: e.target.checked } })}
                className="form-checkbox h-3 w-3 text-blue-600"
              />
              <span>{t("scorm.projectPanel.tracking.quizInteractions")}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.tracking?.media}
                onChange={(e) => updateProject({ tracking: { ...project.tracking, media: e.target.checked } })}
                className="form-checkbox h-3 w-3 text-blue-600"
              />
              <span>{t("scorm.projectPanel.tracking.media")}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.tracking?.hints}
                onChange={(e) => updateProject({ tracking: { ...project.tracking, hints: e.target.checked } })}
                className="form-checkbox h-3 w-3 text-blue-600"
              />
              <span>{t("scorm.projectPanel.tracking.hints")}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.tracking?.externalLinks}
                onChange={(e) => updateProject({ tracking: { ...project.tracking, externalLinks: e.target.checked } })}
                className="form-checkbox h-3 w-3 text-blue-600"
              />
              <span>{t("scorm.projectPanel.tracking.externalLinks")}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.tracking?.timePerPage}
                onChange={(e) => updateProject({ tracking: { ...project.tracking, timePerPage: e.target.checked } })}
                className="form-checkbox h-3 w-3 text-blue-600"
              />
              <span>{t("scorm.projectPanel.tracking.timePerPage")}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.tracking?.attempts}
                onChange={(e) => updateProject({ tracking: { ...project.tracking, attempts: e.target.checked } })}
                className="form-checkbox h-3 w-3 text-blue-600"
              />
              <span>{t("scorm.projectPanel.tracking.attempts")}</span>
            </label>
          </div>
        </div>

        {/* xAPI Only Options */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700 text-xs mt-2">
            {t("scorm.projectPanel.xapiOptions")}
          </h4>
          <div className="space-y-2">
            <div>
              <label className="block mb-1 text-xs font-medium">
                {t("scorm.projectPanel.xapi.lrsEndpoint")}
              </label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-xs"
                value={project.xapi?.lrsEndpoint || ""}
                onChange={(e) => updateProject({ xapi: { ...project.xapi, lrsEndpoint: e.target.value } })}
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium">
                {t("scorm.projectPanel.xapi.authToken")}
              </label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-xs"
                value={project.xapi?.authToken || ""}
                onChange={(e) => updateProject({ xapi: { ...project.xapi, authToken: e.target.value } })}
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium">
                {t("scorm.projectPanel.xapi.activityIdFormat")}
              </label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-xs"
                value={project.xapi?.activityIdFormat || ""}
                onChange={(e) => updateProject({ xapi: { ...project.xapi, activityIdFormat: e.target.value } })}
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium">
                {t("scorm.projectPanel.xapi.statementExtensions")}
              </label>
              <textarea
                className="w-full border rounded px-2 py-1 text-xs"
                rows={3}
                value={project.xapi?.statementExtensions || ""}
                onChange={(e) => updateProject({ xapi: { ...project.xapi, statementExtensions: e.target.value } })}
              />
            </div>
          </div>
        </div>

        {/* Export Panel */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700 text-xs mt-2">
            {t("scorm.projectPanel.exportPanel")}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Button variant="outline" size="sm" className="h-7">{t('scorm.projectPanel.export.scorm12')}</Button>
            <Button variant="outline" size="sm" className="h-7">{t('scorm.projectPanel.export.scorm2004')}</Button>
            <Button variant="outline" size="sm" className="h-7">{t('scorm.projectPanel.export.xapi')}</Button>
            <Button variant="outline" size="sm" className="h-7">{t('scorm.projectPanel.export.html5')}</Button>
            <Button variant="outline" size="sm" className="h-7">{t('scorm.projectPanel.export.publicLink')}</Button>
            <Button variant="outline" size="sm" className="h-7">{t('scorm.projectPanel.export.embedCode')}</Button>
            <Button variant="outline" size="sm" className="h-7">{t('scorm.projectPanel.export.teacherPdf')}</Button>
            <Button variant="outline" size="sm" className="h-7">{t('scorm.projectPanel.export.studentPdf')}</Button>
            <Button variant="outline" size="sm" className="h-7">{t('scorm.projectPanel.export.json')}</Button>
            <Button variant="outline" size="sm" className="h-7">{t('scorm.projectPanel.export.qti')}</Button>
          </div>
        </div>

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

"use client"

import React from "react"
import { EditorProject, SCORMVersion } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"
import { Button } from "@/components/ui/button"

interface ProjectPanelProps {
  project: EditorProject
  onChange: (updated: EditorProject) => void
  onExport?: (version: SCORMVersion) => void
}

export default function ProjectPanel({ project, onChange, onExport }: ProjectPanelProps) {
  const { t } = useLocale()

  const updateProject = (partial: Partial<EditorProject>) => {
    onChange({
      ...project,
      ...partial,
    })
  }

  const exportDisabled = !onExport

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
            <Button
              variant="outline"
              size="sm"
              className="h-7"
              disabled={exportDisabled}
              onClick={() => onExport?.("1.2")}
            >
              {t("scorm.projectPanel.export.scorm12")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7"
              disabled={exportDisabled}
              onClick={() => onExport?.("2004")}
            >
              {t("scorm.projectPanel.export.scorm2004")}
            </Button>
            <Button variant="outline" size="sm" className="h-7" disabled>
              {t("scorm.projectPanel.export.xapi")}
            </Button>
            <Button variant="outline" size="sm" className="h-7" disabled>
              {t("scorm.projectPanel.export.html5")}
            </Button>
            <Button variant="outline" size="sm" className="h-7" disabled>
              {t("scorm.projectPanel.export.publicLink")}
            </Button>
            <Button variant="outline" size="sm" className="h-7" disabled>
              {t("scorm.projectPanel.export.embedCode")}
            </Button>
            <Button variant="outline" size="sm" className="h-7" disabled>
              {t("scorm.projectPanel.export.teacherPdf")}
            </Button>
            <Button variant="outline" size="sm" className="h-7" disabled>
              {t("scorm.projectPanel.export.studentPdf")}
            </Button>
            <Button variant="outline" size="sm" className="h-7" disabled>
              {t("scorm.projectPanel.export.json")}
            </Button>
            <Button variant="outline" size="sm" className="h-7" disabled>
              {t("scorm.projectPanel.export.qti")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

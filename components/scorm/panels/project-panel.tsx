"use client"

import React from "react"
import { EditorProject, ExportFormat, SCORMVersion } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"
import { Button } from "@/components/ui/button"
import ColorInput from "@/components/scorm/panels/color-input"

interface ProjectPanelProps {
  project: EditorProject
  onChange: (updated: EditorProject) => void
  onExport?: (format: ExportFormat | SCORMVersion) => void
}

const fieldClassName =
  "h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/90 px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:bg-slate-950 dark:focus:ring-sky-500/20"

const textAreaClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50/90 px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:bg-slate-950 dark:focus:ring-sky-500/20"

const sectionClassName =
  "rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_14px_32px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-none"

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section className={sectionClassName}>
      <div className="mb-4 space-y-1">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
        {subtitle ? (
          <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function FieldLabel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
      {children}
    </label>
  )
}

export default function ProjectPanel({
  project,
  onChange,
  onExport,
}: ProjectPanelProps) {
  const { t } = useLocale()

  const updateProject = (partial: Partial<EditorProject>) => {
    onChange({
      ...project,
      ...partial,
    })
  }

  const updateTracking = (
    partial: Partial<EditorProject["tracking"]>,
  ) => {
    updateProject({
      tracking: {
        ...project.tracking,
        ...partial,
      },
    })
  }

  const updateXapi = (partial: Partial<EditorProject["xapi"]>) => {
    updateProject({
      xapi: {
        ...project.xapi,
        ...partial,
      },
    })
  }

  const exportDisabled = !onExport

  const trackingLevels = [
    { value: "minimal", label: t("scorm.projectPanel.tracking.minimal") },
    { value: "standard", label: t("scorm.projectPanel.tracking.standard") },
    { value: "advanced", label: t("scorm.projectPanel.tracking.advanced") },
  ] as const

  const trackingToggles = [
    { key: "pageViews", label: t("scorm.projectPanel.tracking.pageViews") },
    {
      key: "quizInteractions",
      label: t("scorm.projectPanel.tracking.quizInteractions"),
    },
    { key: "media", label: t("scorm.projectPanel.tracking.media") },
    { key: "hints", label: t("scorm.projectPanel.tracking.hints") },
    {
      key: "externalLinks",
      label: t("scorm.projectPanel.tracking.externalLinks"),
    },
    {
      key: "timePerPage",
      label: t("scorm.projectPanel.tracking.timePerPage"),
    },
    { key: "attempts", label: t("scorm.projectPanel.tracking.attempts") },
  ] as const

  const exportOptions: Array<{
    value: ExportFormat | SCORMVersion
    label: string
  }> = [
    { value: "1.2", label: t("scorm.projectPanel.export.scorm12") },
    { value: "2004", label: t("scorm.projectPanel.export.scorm2004") },
    { value: "xapi", label: t("scorm.projectPanel.export.xapi") },
    { value: "html5", label: t("scorm.projectPanel.export.html5") },
    { value: "publicLink", label: t("scorm.projectPanel.export.publicLink") },
    { value: "embedCode", label: t("scorm.projectPanel.export.embedCode") },
    { value: "teacherPdf", label: t("scorm.projectPanel.export.teacherPdf") },
    { value: "studentPdf", label: t("scorm.projectPanel.export.studentPdf") },
    { value: "json", label: t("scorm.projectPanel.export.json") },
    { value: "qti", label: t("scorm.projectPanel.export.qti") },
  ]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-4 pb-3 pt-4">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Course Setup
          </p>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {t("scorm.projectPanel.title")}
          </h3>
          <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">
            {t("scorm.projectPanel.subtitle")}
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-12 text-xs">
        <Section
          title={t("scorm.projectPanel.generalSettings")}
          subtitle="Core lesson identity, writing direction, and theme defaults."
        >
          <div className="space-y-4">
            <div>
              <FieldLabel>{t("scorm.projectPanel.projectTitle")}</FieldLabel>
              <input
                type="text"
                className={fieldClassName}
                value={project.title}
                onChange={(e) => updateProject({ title: e.target.value })}
              />
            </div>

            <div>
              <FieldLabel>{t("scorm.props.project.direction.title")}</FieldLabel>
              <select
                className={fieldClassName}
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
                  {t("scorm.props.project.direction.ltr")}
                </option>
                <option value="rtl">
                  {t("scorm.props.project.direction.rtl")}
                </option>
              </select>
            </div>

            <ColorInput
              label={t("scorm.props.project.styles.textColor")}
              value={project.theme.styles.color || ""}
              defaultColor="#0f172a"
              helperText="This becomes the default text color across newly generated lesson content."
              onChange={(value) =>
                updateProject({
                  theme: {
                    ...project.theme,
                    styles: {
                      ...project.theme.styles,
                      color: value,
                    },
                  },
                })
              }
            />
          </div>
        </Section>

        <Section
          title={t("scorm.projectPanel.generalTracking")}
          subtitle="Choose the analytics depth and the exact learner events to record."
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {trackingLevels.map((option) => {
                const active = project.tracking?.level === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateTracking({ level: option.value })}
                    className={`rounded-2xl border px-3 py-3 text-left transition ${
                      active
                        ? "border-sky-200 bg-sky-50 shadow-[0_10px_24px_rgba(14,165,233,0.12)] dark:border-sky-500/40 dark:bg-sky-500/15 dark:shadow-none"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          active ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      />
                      <span
                        className={`text-sm font-semibold ${
                          active ? "text-sky-700 dark:text-sky-200" : "text-slate-800 dark:text-slate-100"
                        }`}
                      >
                        {option.label}
                      </span>
                    </div>
                    <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                      {option.value === "minimal"
                        ? "Capture only essential progress signals."
                        : option.value === "standard"
                          ? "Balanced tracking for normal LMS usage."
                          : "Record richer behavior and attempt detail."}
                    </p>
                  </button>
                )
              })}
            </div>

            <div className="space-y-2">
              <FieldLabel>{t("scorm.projectPanel.advancedOptions")}</FieldLabel>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {trackingToggles.map((item) => {
                  const checked = Boolean(project.tracking?.[item.key])

                  return (
                    <label
                      key={item.key}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-3 transition ${
                        checked
                          ? "border-sky-200 bg-sky-50/70 dark:border-sky-500/40 dark:bg-sky-500/15"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          updateTracking({ [item.key]: e.target.checked })
                        }
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-950 dark:focus:ring-sky-500/30"
                      />
                      <span className="text-xs font-medium leading-5 text-slate-700 dark:text-slate-200">
                        {item.label}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
        </Section>

        <Section
          title={t("scorm.projectPanel.xapiOptions")}
          subtitle="Optional LRS and statement settings for teams using xAPI or cmi5 flows."
        >
          <div className="space-y-4">
            <div>
              <FieldLabel>{t("scorm.projectPanel.xapi.lrsEndpoint")}</FieldLabel>
              <input
                type="text"
                className={fieldClassName}
                value={project.xapi?.lrsEndpoint || ""}
                onChange={(e) => updateXapi({ lrsEndpoint: e.target.value })}
              />
            </div>

            <div>
              <FieldLabel>{t("scorm.projectPanel.xapi.authToken")}</FieldLabel>
              <input
                type="password"
                className={fieldClassName}
                value={project.xapi?.authToken || ""}
                onChange={(e) => updateXapi({ authToken: e.target.value })}
              />
            </div>

            <div>
              <FieldLabel>{t("scorm.projectPanel.xapi.activityIdFormat")}</FieldLabel>
              <input
                type="text"
                className={fieldClassName}
                value={project.xapi?.activityIdFormat || ""}
                onChange={(e) =>
                  updateXapi({ activityIdFormat: e.target.value })
                }
              />
            </div>

            <div>
              <FieldLabel>
                {t("scorm.projectPanel.xapi.statementExtensions")}
              </FieldLabel>
              <textarea
                className={`${textAreaClassName} min-h-[112px] font-mono text-xs`}
                value={project.xapi?.statementExtensions || ""}
                onChange={(e) =>
                  updateXapi({ statementExtensions: e.target.value })
                }
              />
            </div>
          </div>
        </Section>

        <Section
          title={t("scorm.projectPanel.exportPanel")}
          subtitle="Fast access to every package format without leaving the inspector."
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {exportOptions.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                size="sm"
                className="h-auto min-h-[46px] rounded-2xl border-slate-200 bg-white px-4 py-3 text-left text-xs font-semibold text-slate-700 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-sky-500/50 dark:hover:bg-sky-500/15 dark:hover:text-sky-200"
                disabled={exportDisabled}
                onClick={() => onExport?.(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}

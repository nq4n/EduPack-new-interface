"use client"

import React, { useState } from "react"
import {
  EditorProject,
  EditorBlock,
  TextBlock,
  ImageBlock,
  VideoBlock,
  QuizBlock,
  InteractiveBlock,
  SvgBlock,
  SCORMVersion,
  ExportFormat,
} from "@/lib/scorm/types"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/hooks/use-locale"

// Panels
import TextPanel from "@/components/scorm/panels/text-panel"
import MediaPanel from "@/components/scorm/panels/media-panel"
import VideoPanel from "@/components/scorm/panels/video-panel"
import InteractivePanel from "@/components/scorm/panels/interactive-panel"
import ProjectPanel from "@/components/scorm/panels/project-panel"
import PagePanel from "@/components/scorm/panels/page-panel"
import QuizPanel from "@/components/scorm/panels/quiz-panel"
import SvgPanel from "@/components/scorm/panels/svg-panel"

interface PropertiesPanelProps {
  project: EditorProject
  onProjectChange: (project: EditorProject) => void
  selectedBlock: EditorBlock | null
  onBlockChange: (block: EditorBlock) => void
  panelType: "block" | "project"
  onAddPage: () => void
  onExport?: (format: ExportFormat | SCORMVersion) => void
}

export function PropertiesPanel({
  project,
  onProjectChange,
  selectedBlock,
  onBlockChange,
  panelType,
  onAddPage,
  onExport,
}: PropertiesPanelProps) {
  const { t } = useLocale()
  const [activeTab, setActiveTab] = useState<"project" | "page">("project")

  if (panelType === "project") {
    return (
      <div className="flex h-full flex-col bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <div className="border-b border-slate-200/90 bg-white/95 px-3 py-3 backdrop-blur">
          <div className="mb-2 space-y-1 px-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Inspector
            </p>
            <h3 className="text-sm font-semibold text-slate-900">
              {t("scorm.props.title") || "Properties"}
            </h3>
          </div>
          <div className="flex w-full items-center gap-1 rounded-2xl border border-slate-200 bg-slate-100/90 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <button
              onClick={() => setActiveTab("project")}
              className={`w-full rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                activeTab === "project"
                  ? "bg-white text-sky-700 shadow-[0_10px_24px_rgba(14,165,233,0.12)] ring-1 ring-sky-100"
                  : "bg-transparent text-slate-500 hover:bg-white/70 hover:text-slate-700"
              }`}
            >
              {t("scorm.tabs.project") || "Project"}
            </button>
            <button
              onClick={() => setActiveTab("page")}
              className={`w-full rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                activeTab === "page"
                  ? "bg-white text-sky-700 shadow-[0_10px_24px_rgba(14,165,233,0.12)] ring-1 ring-sky-100"
                  : "bg-transparent text-slate-500 hover:bg-white/70 hover:text-slate-700"
              }`}
            >
              {t("scorm.tabs.pages") || "Pages"}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === "project" ? (
            <ProjectPanel project={project} onChange={onProjectChange} onExport={onExport} />
          ) : (
            <PagePanel
              project={project}
              onChange={onProjectChange}
              onAddPage={onAddPage}
            />
          )}
        </div>
      </div>
    )
  }

  // --- Empty state (for block panel) -----------------------------------------

  if (!selectedBlock) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-5 py-8 text-center">
        <div className="mb-3">
          <Badge
            variant="outline"
            className="rounded-full border-slate-200 bg-white px-2.5 py-0.5 text-[11px] text-slate-600"
          >
            {t("scorm.props.title") || "Properties"}
          </Badge>
        </div>
        <p className="mb-1 text-sm font-medium text-slate-900">
          {t("scorm.props.emptyTitle") || "No block selected"}
        </p>
        <p className="max-w-xs text-[11px] leading-5 text-slate-500">
          {t("scorm.props.desc") ||
            "Click on any element in the canvas to view and edit its properties here."}
        </p>
      </div>
    )
  }

  // --- Type labels ----------------------------------------------------------

  const typeLabelMap: Record<EditorBlock["type"], string> = {
    text: t("scorm.props.block.text.label") || "Text block",
    image: t("scorm.props.block.image.label") || "Image block",
    video: t("scorm.props.block.video.label") || "Video block",
    quiz: t("scorm.props.block.quiz.label") || "Quiz block",
    interactive: t("scorm.props.block.interactive.label") || "Interactive block",
    svg: t("scorm.props.block.svg.label") || "SVG block",
  }

  // --- Render body by block type -------------------------------------------

  const renderBody = () => {
    switch (selectedBlock.type) {
      case "text":
        return (
          <TextPanel
            block={selectedBlock as TextBlock}
            onChange={(updated) => onBlockChange(updated as EditorBlock)}
          />
        )

      case "image":
        return (
          <MediaPanel
            block={selectedBlock as ImageBlock}
            onChange={(updated) => onBlockChange(updated as EditorBlock)}
          />
        )

      case "video":
        return (
          <VideoPanel
            block={selectedBlock as VideoBlock}
            onChange={(updated) => onBlockChange(updated as EditorBlock)}
          />
        )

      case "quiz":
        return (
          <QuizPanel
            block={selectedBlock as QuizBlock}
            onChange={(updated) => onBlockChange(updated as EditorBlock)}
          />
        )

      case "interactive":
        return (
          <InteractivePanel
            block={selectedBlock as InteractiveBlock}
            pages={project.pages}
            onChange={(updated) => onBlockChange(updated as EditorBlock)}
          />
        )

      case "svg":
        return (
          <SvgPanel
            block={selectedBlock as SvgBlock}
            onChange={(updated) => onBlockChange(updated as EditorBlock)}
          />
        )

      default:
        return (
          <div className="p-4 text-[11px] text-muted-foreground">
            {t("scorm.props.unsupported") ||
              "This block type does not expose editable properties yet."}
          </div>
        )
    }
  }

  // --- Main layout ----------------------------------------------------------

  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
      {/* Header */}
      <div className="border-b border-slate-200/90 bg-white/95 px-4 pb-3 pt-4 backdrop-blur">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Inspector
            </p>
            <h3 className="text-sm font-semibold leading-none text-slate-900">
              {t("scorm.props.title") || "Block properties"}
            </h3>
            <p className="text-[11px] text-slate-500">
              {t("scorm.props.subtitle") ||
                "Adjust how this element looks and behaves in the lesson."}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-0.5 text-[10px] text-sky-700"
          >
            {typeLabelMap[selectedBlock.type] ?? selectedBlock.type}
          </Badge>
        </div>
      </div>

      <Separator className="bg-slate-200/80" />

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 pt-3 text-xs">
        {renderBody()}
      </div>
    </div>
  )
}

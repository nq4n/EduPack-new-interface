import React from "react"
import {
  EditorProject,
  EditorBlock,
  TextBlock,
  ImageBlock,
  VideoBlock,
  QuizBlock,
  InteractiveBlock,
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

interface PropertiesPanelProps {
  project: EditorProject
  onProjectChange: (project: EditorProject) => void
  selectedBlock: EditorBlock | null
  onBlockChange: (block: EditorBlock) => void
  panelType: "block" | "project"
  onAddPage: () => void
}

export function PropertiesPanel({
  project,
  onProjectChange,
  selectedBlock,
  onBlockChange,
  panelType,
  onAddPage,
}: PropertiesPanelProps) {
  const { t } = useLocale()

  if (panelType === "project") {
    return (
      <ProjectPanel
        project={project}
        onChange={onProjectChange}
        onAddPage={onAddPage}
      />
    )
  }

  // --- Empty state (for block panel) -----------------------------------------

  if (!selectedBlock) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-4 py-6 text-center">
        <div className="mb-3">
          <Badge variant="outline" className="text-[11px] px-2 py-0 rounded-full">
            {t("scorm.props.title") || "Properties"}
          </Badge>
        </div>
        <p className="text-sm font-medium text-foreground mb-1">
          {t("scorm.props.emptyTitle") || "No block selected"}
        </p>
        <p className="text-[11px] text-muted-foreground max-w-xs">
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
          <div className="p-4 text-[11px] text-muted-foreground">
            Quiz editor panel not wired yet.
          </div>
        )

      case "interactive":
        return (
          <InteractivePanel
            block={selectedBlock as InteractiveBlock}
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
    <div className="h-full flex flex-col bg-card/80">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold leading-none">
              {t("scorm.props.title") || "Block properties"}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              {t("scorm.props.subtitle") ||
                "Adjust how this element looks and behaves in the lesson."}
            </p>
          </div>
          <Badge variant="secondary" className="text-[10px] px-2 py-0 rounded-full">
            {typeLabelMap[selectedBlock.type] ?? selectedBlock.type}
          </Badge>
        </div>
      </div>

      <Separator className="mb-2" />

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-2 pb-3 text-xs">
        {renderBody()}
      </div>
    </div>
  )
}

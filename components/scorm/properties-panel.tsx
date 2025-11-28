"use client"

import React from "react"
import { EditorBlock, TextBlock, ImageBlock, VideoBlock, QuizBlock } from "@/lib/scorm/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useLocale } from "@/hooks/use-locale"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PropertiesPanelProps {
  selectedBlock: EditorBlock | null
  onBlockChange: (block: EditorBlock) => void
}

export function PropertiesPanel({ selectedBlock, onBlockChange }: PropertiesPanelProps) {
  const { t } = useLocale()

  // --- Helpers --------------------------------------------------------------

  const updateBlock = (partial: Partial<EditorBlock>) => {
    if (!selectedBlock) return
    onBlockChange({ ...selectedBlock, ...partial } as EditorBlock)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const block = selectedBlock as TextBlock
    updateBlock({ ...(block as EditorBlock), html: e.target.value })
  }

  const handleImageSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const block = selectedBlock as ImageBlock
    updateBlock({ ...(block as EditorBlock), src: e.target.value })
  }

  const handleImageAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const block = selectedBlock as ImageBlock
    updateBlock({ ...(block as EditorBlock), alt: e.target.value })
  }

  const handleVideoSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const block = selectedBlock as VideoBlock
    updateBlock({ ...(block as EditorBlock), src: e.target.value })
  }

  const handleQuizQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const block = selectedBlock as QuizBlock
    updateBlock({ ...(block as EditorBlock), question: e.target.value })
  }

  const handleQuizOptionChange = (index: number, value: string) => {
    const quizBlock = selectedBlock as QuizBlock
    const options = [...(quizBlock.options || [])]
    if (!options[index]) return
    options[index] = { ...options[index], label: value }
    updateBlock({ ...(quizBlock as EditorBlock), options })
  }

  const handleQuizCorrectChange = (index: number, checked: boolean) => {
    const quizBlock = selectedBlock as QuizBlock
    const options = [...(quizBlock.options || [])].map((opt, i) =>
      i === index ? { ...opt, correct: checked } : opt,
    )
    updateBlock({ ...(quizBlock as EditorBlock), options })
  }

  const addQuizOption = () => {
    const quizBlock = selectedBlock as QuizBlock
    const options = [...(quizBlock.options || [])]
    options.push({
      id: `opt-${Date.now()}`,
      label: t("scorm.props.block.quiz.newOption") || "New Option",
      correct: false,
    })
    updateBlock({ ...(quizBlock as EditorBlock), options })
  }

  // --- Renderers ------------------------------------------------------------

  const renderTextControls = () => {
    const block = selectedBlock as TextBlock

    return (
      <div className="space-y-2">
        <Label htmlFor="text-input" className="text-xs font-medium">
          {t("scorm.props.block.text.html")}
        </Label>
        <Input
          id="text-input"
          value={block.html}
          onChange={handleTextChange}
          className="h-9 text-xs"
          placeholder="<p>...</p>"
        />
        <p className="text-[11px] text-muted-foreground">
          {t("scorm.props.block.text.help") ||
            "You can paste simple HTML such as paragraphs, bold text, or lists."}
        </p>
      </div>
    )
  }

  const renderImageControls = () => {
    const block = selectedBlock as ImageBlock

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-src-input" className="text-xs font-medium">
            {t("scorm.props.block.image.src")}
          </Label>
          <Input
            id="image-src-input"
            value={block.src}
            onChange={handleImageSrcChange}
            className="h-9 text-xs"
            placeholder="https://..."
          />
          <p className="text-[11px] text-muted-foreground">
            {t("scorm.props.block.image.srcHelp") ||
              "Use an absolute URL or a file path reachable by the learner."}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image-alt-input" className="text-xs font-medium">
            {t("scorm.props.block.image.alt")}
          </Label>
          <Input
            id="image-alt-input"
            value={block.alt}
            onChange={handleImageAltChange}
            className="h-9 text-xs"
            placeholder={t("scorm.props.block.image.altPlaceholder") || "Descriptive text for screen readers"}
          />
          <p className="text-[11px] text-muted-foreground">
            {t("scorm.props.block.image.altHelp") ||
              "Short description that explains the image for accessibility."}
          </p>
        </div>
      </div>
    )
  }

  const renderVideoControls = () => {
    const block = selectedBlock as VideoBlock

    return (
      <div className="space-y-2">
        <Label htmlFor="video-src-input" className="text-xs font-medium">
          {t("scorm.props.block.video.src")}
        </Label>
        <Input
          id="video-src-input"
          value={block.src}
          onChange={handleVideoSrcChange}
          className="h-9 text-xs"
          placeholder="https://..."
        />
        <p className="text-[11px] text-muted-foreground">
          {t("scorm.props.block.video.help") ||
            "Provide a direct link to the video file or a streaming source that your player supports."}
        </p>
      </div>
    )
  }

  const renderQuizControls = () => {
    const quizBlock = selectedBlock as QuizBlock
    const options = quizBlock.options || []

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="quiz-question-input" className="text-xs font-medium">
            {t("scorm.props.block.quiz.question")}
          </Label>
          <Input
            id="quiz-question-input"
            value={quizBlock.question}
            onChange={handleQuizQuestionChange}
            className="h-9 text-xs"
            placeholder={t("scorm.props.block.quiz.questionPlaceholder") || "Write the question here"}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">
              {t("scorm.props.block.quiz.optionsLabel") || "Options"}
            </Label>
            <Button
              type="button"
              variant="outline"
              size="xs"
              className="h-7 px-2 text-[11px]"
              onClick={addQuizOption}
            >
              {t("scorm.props.block.quiz.addOption") || "Add option"}
            </Button>
          </div>

          <div className="space-y-2">
            {options.length === 0 && (
              <p className="text-[11px] text-muted-foreground">
                {t("scorm.props.block.quiz.noOptions") ||
                  "No options yet. Click “Add option” to create choices for this question."}
              </p>
            )}

            {options.map((option, index) => (
              <div
                key={option.id}
                className="flex items-center gap-2 rounded-md border bg-muted/40 px-2.5 py-2"
              >
                <Input
                  value={option.label}
                  onChange={(e) => handleQuizOptionChange(index, e.target.value)}
                  className="h-8 text-xs"
                  placeholder={`${t("scorm.props.block.quiz.option") || "Option"} ${index + 1}`}
                />
                <div className="flex items-center gap-1">
                  <Checkbox
                    checked={!!option.correct}
                    onCheckedChange={(checked) =>
                      handleQuizCorrectChange(index, Boolean(checked))
                    }
                    className="h-4 w-4"
                  />
                  <span className="text-[11px] text-muted-foreground">
                    {t("scorm.props.block.quiz.correct") || "Correct"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-muted-foreground">
            {t("scorm.props.block.quiz.help") ||
              "Mark at least one option as correct. Learner responses will be validated against these settings."}
          </p>
        </div>
      </div>
    )
  }

  const renderControls = () => {
    if (!selectedBlock) return null

    switch (selectedBlock.type) {
      case "text":
        return renderTextControls()
      case "image":
        return renderImageControls()
      case "video":
        return renderVideoControls()
      case "quiz":
        return renderQuizControls()
      default:
        return (
          <p className="text-[11px] text-muted-foreground">
            {t("scorm.props.unsupported") ||
              "This block type does not expose editable properties yet."}
          </p>
        )
    }
  }

  // --- Empty state ----------------------------------------------------------

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
            "Click on any element in the preview area to view and edit its properties here."}
        </p>
      </div>
    )
  }

  // --- Main panel -----------------------------------------------------------

  const typeLabelMap: Record<EditorBlock["type"], string> = {
    text: t("scorm.props.block.text.label") || "Text block",
    image: t("scorm.props.block.image.label") || "Image block",
    video: t("scorm.props.block.video.label") || "Video block",
    quiz: t("scorm.props.block.quiz.label") || "Quiz block",
  }

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
                "Fine-tune the selected element to match your learning design."}
            </p>
          </div>
          <Badge variant="secondary" className="text-[10px] px-2 py-0 rounded-full">
            {typeLabelMap[selectedBlock.type] ?? selectedBlock.type}
          </Badge>
        </div>
      </div>

      <Separator className="mb-3" />

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 text-xs">
        {renderControls()}
      </div>
    </div>
  )
}

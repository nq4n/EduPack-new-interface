"use client"

import React from "react"
import { QuizBlock, TextBlock } from "@/lib/scorm/types"
import TextPanel from "@/components/scorm/panels/text-panel"
import { useLocale } from "@/hooks/use-locale"
import ColorInput from "@/components/scorm/panels/color-input"
import AnimationControls from "@/components/scorm/panels/animation-controls"
import {
  PanelLabel,
  PanelSection,
  SegmentedOption,
  ToggleCard,
  panelFieldClassName,
} from "@/components/scorm/panels/panel-ui"

interface QuizPanelProps {
  block: QuizBlock
  onChange: (updated: QuizBlock) => void
}

function readNumber(value: unknown, fallback: number) {
  const numeric =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? parseFloat(value)
        : Number.NaN
  return Number.isNaN(numeric) ? fallback : numeric
}

export default function QuizPanel({ block, onChange }: QuizPanelProps) {
  const style = block.style || {}
  const optionStyle = block.optionStyle || {}
  const { t } = useLocale()

  const alignLabels: Record<string, string> = {
    left: t("scorm.panels.common.align.left") || "Left",
    center: t("scorm.panels.common.align.center") || "Center",
    right: t("scorm.panels.common.align.right") || "Right",
  }

  const updateStyle = (key: string, value: any) => {
    onChange({
      ...block,
      style: {
        ...style,
        [key]: value,
      },
    })
  }

  const updateOptionStyle = (key: string, value: any) => {
    onChange({
      ...block,
      optionStyle: {
        ...optionStyle,
        [key]: value,
      },
    })
  }

  const questionTextBlock: TextBlock = {
    id: `${block.id}-question`,
    type: "text",
    html: block.questionHtml ?? block.question ?? "",
    style: block.questionStyle || {},
  }

  const handleQuestionChange = (updatedText: TextBlock) => {
    onChange({
      ...block,
      question: updatedText.html,
      questionHtml: updatedText.html,
      questionStyle: updatedText.style,
    })
  }

  const updateOptionLabel = (index: number, value: string) => {
    const updated = [...(block.options || [])]
    updated[index] = { ...updated[index], label: value }
    onChange({ ...block, options: updated })
  }

  const toggleOptionCorrect = (index: number) => {
    const updated = [...(block.options || [])]
    updated[index] = { ...updated[index], correct: !updated[index].correct }
    onChange({ ...block, options: updated })
  }

  const addOption = () => {
    const nextIndex = (block.options?.length || 0) + 1
    const defaultLabel =
      t("scorm.panels.quiz.optionLabel", { index: nextIndex }) ||
      `Option ${nextIndex}`

    onChange({
      ...block,
      options: [
        ...(block.options || []),
        {
          id: `opt-${Date.now()}`,
          label: defaultLabel,
          correct: false,
        },
      ],
    })
  }

  const removeOption = (index: number) => {
    const updated = [...(block.options || [])]
    updated.splice(index, 1)
    onChange({ ...block, options: updated })
  }

  return (
    <div className="space-y-4 pb-2 text-sm">
      <PanelSection
        title={t("scorm.panels.quiz.question") || "Question text"}
        description={
          t("scorm.panels.quiz.questionHelp") ||
          "Format the question like normal lesson text."
        }
      >
        <TextPanel block={questionTextBlock} onChange={handleQuestionChange} />
      </PanelSection>

      <PanelSection title={t("scorm.panels.quiz.options") || "Options"}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] leading-5 text-slate-500">
              {t("scorm.panels.quiz.correctHelp") ||
                "Mark one or more answers as correct."}
            </p>
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              onClick={addOption}
            >
              {t("scorm.panels.quiz.addOption") || "+ Add option"}
            </button>
          </div>

          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {(block.options || []).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-center text-[11px] leading-5 text-slate-500">
                {t("scorm.panels.quiz.noOptions") ||
                  "No options yet. Add choices for the learner."}
              </div>
            ) : null}

            {(block.options || []).map((option, index) => (
              <div
                key={option.id}
                className={`rounded-2xl border px-3 py-3 ${
                  option.correct
                    ? "border-sky-200 bg-sky-50/70"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!option.correct}
                    onChange={() => toggleOptionCorrect(index)}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-200"
                  />
                  <input
                    type="text"
                    className={`${panelFieldClassName} h-11 flex-1`}
                    value={option.label}
                    onChange={(e) => updateOptionLabel(index, e.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                    onClick={() => removeOption(index)}
                  >
                    {t("scorm.panels.quiz.remove") || "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PanelSection>

      <PanelSection
        title={t("scorm.panels.quiz.boxAppearance") || "Question box appearance"}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <PanelLabel>{t("scorm.panels.quiz.padding") || "Padding (px)"}</PanelLabel>
              <input
                type="number"
                className={panelFieldClassName}
                value={readNumber(style.padding, 12)}
                onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
              />
            </div>
            <div>
              <PanelLabel>{t("scorm.panels.quiz.radius") || "Border Radius (px)"}</PanelLabel>
              <input
                type="number"
                className={panelFieldClassName}
                value={readNumber(style.radius, 8)}
                onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
              />
            </div>
          </div>

          <ColorInput
            label={t("scorm.panels.quiz.background") || "Background Color"}
            value={style.background || ""}
            defaultColor="#f9fafb"
            onChange={(value) => updateStyle("background", value)}
          />

          <ColorInput
            label={t("scorm.panels.quiz.color") || "Text color"}
            value={style.color || ""}
            defaultColor="#0f172a"
            onChange={(value) => updateStyle("color", value)}
          />

          <div>
            <PanelLabel>
              {"Content alignment"}
            </PanelLabel>
            <div className="grid grid-cols-3 gap-2">
              {["left", "center", "right"].map((alignment) => (
                <SegmentedOption
                  key={alignment}
                  active={(style.align || "left") === alignment}
                  onClick={() => updateStyle("align", alignment)}
                >
                  {alignLabels[alignment] ?? alignment}
                </SegmentedOption>
              ))}
            </div>
          </div>

          <ToggleCard
            checked={style.shadow === true}
            label={t("scorm.panels.quiz.shadow") || "Shadow"}
            onChange={(checked) => updateStyle("shadow", checked)}
          />
        </div>
      </PanelSection>

      <PanelSection title={t("scorm.panels.quiz.optionStyle") || "Options text style"}>
        <div className="space-y-3">
          <div>
            <PanelLabel>{t("scorm.panels.text.typography") || "Typography"}</PanelLabel>
            <div className="flex flex-wrap items-center gap-2">
              <SegmentedOption
                active={!!optionStyle.bold}
                onClick={() => updateOptionStyle("bold", !optionStyle.bold)}
              >
                <span className="font-bold">B</span>
              </SegmentedOption>
              <SegmentedOption
                active={!!optionStyle.italic}
                onClick={() => updateOptionStyle("italic", !optionStyle.italic)}
              >
                <span className="italic">I</span>
              </SegmentedOption>
              <SegmentedOption
                active={!!optionStyle.underline}
                onClick={() => updateOptionStyle("underline", !optionStyle.underline)}
              >
                <span className="underline">U</span>
              </SegmentedOption>
              <select
                className={`${panelFieldClassName} w-24 min-w-[96px]`}
                value={optionStyle.size || "14px"}
                onChange={(e) => updateOptionStyle("size", e.target.value)}
              >
                <option value="12px">12</option>
                <option value="14px">14</option>
                <option value="16px">16</option>
                <option value="18px">18</option>
              </select>
            </div>
          </div>

          <div>
            <PanelLabel>{t("scorm.panels.quiz.align") || "Alignment"}</PanelLabel>
            <div className="grid grid-cols-3 gap-2">
              {["left", "center", "right"].map((alignment) => (
                <SegmentedOption
                  key={alignment}
                  active={(optionStyle.align || "left") === alignment}
                  onClick={() => updateOptionStyle("align", alignment)}
                >
                  {alignLabels[alignment] ?? alignment}
                </SegmentedOption>
              ))}
            </div>
          </div>

          <ColorInput
            label={t("scorm.panels.quiz.color") || "Text color"}
            value={optionStyle.color || ""}
            defaultColor="#111827"
            onChange={(value) => updateOptionStyle("color", value)}
          />
        </div>
      </PanelSection>

      <AnimationControls style={style} onChange={updateStyle} />
    </div>
  )
}

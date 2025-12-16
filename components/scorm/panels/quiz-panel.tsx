"use client"

import React from "react"
import { QuizBlock, TextBlock } from "@/lib/scorm/types"
import TextPanel from "@/components/scorm/panels/text-panel"
import { useLocale } from "@/hooks/use-locale"
import ColorInput from "@/components/scorm/panels/color-input"

interface QuizPanelProps {
  block: QuizBlock
  onChange: (updated: QuizBlock) => void
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

  // 🔗 Question as a fake TextBlock to reuse TextPanel
  const questionTextBlock: TextBlock = {
    id: `${block.id}-question`,
    type: "text",
    html: block.questionHtml ?? block.question ?? "",
    style: block.questionStyle || {},
  }

  const handleQuestionChange = (updatedText: TextBlock) => {
    onChange({
      ...block,
      question: updatedText.html,       // fallback
      questionHtml: updatedText.html,   // rich html
      questionStyle: updatedText.style, // style for question
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

    const newOption = {
      id: `opt-${Date.now()}`,
      label: defaultLabel,
      correct: false,
    }
    onChange({ ...block, options: [...(block.options || []), newOption] })
  }

  const removeOption = (index: number) => {
    const updated = [...(block.options || [])]
    updated.splice(index, 1)
    onChange({ ...block, options: updated })
  }

  return (
    <div className="p-4 space-y-4 text-sm">
      <p className="font-semibold text-slate-700">
        {t("scorm.panels.quiz.title") || "Quiz Settings"}
      </p>

      {/* 🔗 Question editor using TextPanel */}
      <div className="border rounded-lg overflow-hidden">
        <div className="px-3 pt-2 pb-1 border-b bg-slate-50">
          <p className="text-xs font-semibold text-slate-700">
            {t("scorm.panels.quiz.question") || "Question text"}
          </p>
          <p className="text-[11px] text-slate-500">
            {t("scorm.panels.quiz.questionHelp") ||
              "Format the question like normal text (bold, RTL, colors…)"}
          </p>
        </div>
        <TextPanel block={questionTextBlock} onChange={handleQuestionChange} />
      </div>

      {/* OPTIONS LIST */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold">
            {t("scorm.panels.quiz.options") || "Options"}
          </p>
          <button
            type="button"
            className="text-xs px-2 py-1 rounded border border-slate-300 hover:bg-slate-50"
            onClick={addOption}
          >
            {t("scorm.panels.quiz.addOption") || "+ Add option"}
          </button>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {(block.options || []).length === 0 && (
            <p className="text-[11px] text-slate-400">
              {t("scorm.panels.quiz.noOptions") ||
                "No options yet. Click “Add option” to create choices."}
            </p>
          )}

          {(block.options || []).map((opt, index) => (
            <div
              key={opt.id}
              className="flex items-center gap-2 border rounded px-2 py-1 bg-slate-50"
            >
              <input
                type="checkbox"
                checked={!!opt.correct}
                onChange={() => toggleOptionCorrect(index)}
              />
              <input
                type="text"
                className="flex-1 border rounded px-2 py-1 text-xs"
                value={opt.label}
                onChange={(e) => updateOptionLabel(index, e.target.value)}
              />
              <button
                type="button"
                className="text-[11px] text-red-500 hover:underline"
                onClick={() => removeOption(index)}
              >
                {t("scorm.panels.quiz.remove") || "Remove"}
              </button>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-400 mt-1">
          {t("scorm.panels.quiz.correctHelp") || "You can mark one or more options as correct."}
        </p>
      </div>

      {/* APPEARANCE (container) */}
      <div className="space-y-2">
        <p className="text-xs font-semibold">
          {t("scorm.panels.quiz.boxAppearance") || "Question box appearance"}
        </p>

        <label className="text-xs">{t("scorm.panels.quiz.padding") || "Padding (px)"}</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.padding || "12")}
          onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
        />

        <label className="text-xs">{t("scorm.panels.quiz.radius") || "Border Radius (px)"}</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.radius || "8")}
          onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
        />

        <ColorInput
          label={t("scorm.panels.quiz.background") || "Background Color"}
          value={style.background || ""}
          defaultColor="#f9fafb"
          onChange={(value) => updateStyle("background", value)}
        />

        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            checked={style.shadow === true}
            onChange={(e) => updateStyle("shadow", e.target.checked)}
          />
          <span className="text-xs">{t("scorm.panels.quiz.shadow") || "Shadow"}</span>
        </div>
      </div>

      {/* OPTION APPEARANCE */}
      <div className="space-y-2">
        <p className="text-xs font-semibold">
          {t("scorm.panels.quiz.optionStyle") || "Options text style"}
        </p>

        <div className="flex items-center gap-2">
          {/* Bold */}
          <button
            type="button"
            className={
              "px-2 py-1 rounded border text-xs " +
              (optionStyle.bold ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateOptionStyle("bold", !optionStyle.bold)}
          >
            B
          </button>

          {/* Italic */}
          <button
            type="button"
            className={
              "px-2 py-1 rounded border text-xs italic " +
              (optionStyle.italic ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateOptionStyle("italic", !optionStyle.italic)}
          >
            I
          </button>

          {/* Underline */}
          <button
            type="button"
            className={
              "px-2 py-1 rounded border text-xs underline " +
              (optionStyle.underline ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateOptionStyle("underline", !optionStyle.underline)}
          >
            U
          </button>

          {/* Size */}
          <select
            className="border rounded px-2 py-1 text-xs"
            value={optionStyle.size || "14px"}
            onChange={(e) => updateOptionStyle("size", e.target.value)}
          >
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="18px">18</option>
          </select>
        </div>

        {/* Align */}
        <div>
          <p className="text-[11px] mt-1 mb-1">
            {t("scorm.panels.quiz.align") || "Alignment"}
          </p>
          <div className="flex gap-2">
            {["left", "center", "right"].map((a) => (
              <button
                key={a}
                type="button"
                className={
                  "px-3 py-1 rounded border text-xs capitalize " +
                  (optionStyle.align === a ? "bg-sky-600 text-white" : "bg-white")
                }
                onClick={() => updateOptionStyle("align", a)}
              >
                {alignLabels[a] ?? a}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <ColorInput
          label={t("scorm.panels.quiz.color") || "Text color"}
          value={optionStyle.color || ""}
          defaultColor="#111827"
          onChange={(value) => updateOptionStyle("color", value)}
        />
      </div>
    </div>
  )
}

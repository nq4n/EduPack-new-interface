"use client"

import React from "react"
import { TextBlock } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"
import ColorInput from "@/components/scorm/panels/color-input"
import AnimationControls from "@/components/scorm/panels/animation-controls"

interface Props {
  block: TextBlock
  onChange: (updated: TextBlock) => void
}

export default function TextPanel({ block, onChange }: Props) {
  const style = block.style || {}
  const { t } = useLocale()

  const alignLabels: Record<string, string> = {
    left: t("scorm.panels.common.align.left") || "Left",
    center: t("scorm.panels.common.align.center") || "Center",
    right: t("scorm.panels.common.align.right") || "Right",
    justify: t("scorm.panels.common.align.justify") || "Justify",
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

  return (
    <div className="p-4 space-y-4 text-sm">
      {/* Title */}
      <p className="font-semibold text-slate-700">
        {t("scorm.panels.text.title") || "Text Settings"}
      </p>

      {/* TEXT CONTENT */}
      <div>
        <label className="block mb-1 text-xs">
          {t("scorm.panels.text.content") || "Content"}
        </label>
        <textarea
          className="w-full border rounded px-2 py-2 h-32 text-xs"
          value={block.html}
          onChange={(e) =>
            onChange({
              ...block,
              html: e.target.value,
            })
          }
        />
      </div>

      {/* FONT OPTIONS */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-600">
          {t("scorm.panels.text.typography") || "Typography"}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className={
              "px-2 py-1 rounded border text-xs font-bold " +
              (style.bold ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateStyle("bold", !style.bold)}
          >
            B
          </button>

          <button
            type="button"
            className={
              "px-2 py-1 rounded border text-xs italic " +
              (style.italic ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateStyle("italic", !style.italic)}
          >
            I
          </button>

          <button
            type="button"
            className={
              "px-2 py-1 rounded border text-xs underline " +
              (style.underline ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateStyle("underline", !style.underline)}
          >
            U
          </button>

          <select
            className="border rounded px-2 py-1 text-xs"
            value={style.size || "16px"}
            onChange={(e) => updateStyle("size", e.target.value)}
          >
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="18px">18</option>
            <option value="20px">20</option>
            <option value="24px">24</option>
          </select>
        </div>
      </div>

      {/* ALIGNMENT */}
      <div>
        <p className="text-xs font-semibold mb-1">
          {t("scorm.panels.text.alignment") || "Alignment"}
        </p>
        <div className="flex gap-2">
          {["left", "center", "right", "justify"].map((a) => (
            <button
              type="button"
              key={a}
              className={
                "px-2 py-1 rounded border text-xs capitalize " +
                (style.align === a ? "bg-sky-600 text-white" : "bg-white")
              }
              onClick={() => updateStyle("align", a)}
            >
              {alignLabels[a] ?? a}
            </button>
          ))}
        </div>
      </div>

      {/* DIRECTION */}
      <div>
        <p className="text-xs font-semibold mb-1">
          {t("scorm.panels.text.direction") || "Direction"}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className={
              "px-3 py-1 rounded border text-xs " +
              (style.direction === "ltr" ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateStyle("direction", "ltr")}
          >
            {t("scorm.panels.common.direction.ltr") || "LTR"}
          </button>

          <button
            type="button"
            className={
              "px-3 py-1 rounded border text-xs " +
              (style.direction === "rtl" ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateStyle("direction", "rtl")}
          >
            {t("scorm.panels.common.direction.rtl") || "RTL"}
          </button>
        </div>
      </div>

      {/* COLORS */}
      <div className="space-y-3">
        <ColorInput
          label={t("scorm.panels.text.textColor") || "Text Color"}
          value={style.color || ""}
          defaultColor="#000000"
          onChange={(value) => updateStyle("color", value)}
        />

        <ColorInput
          label={t("scorm.panels.text.background") || "Background"}
          value={style.background || ""}
          defaultColor="#ffffff"
          onChange={(value) => updateStyle("background", value)}
        />
      </div>

      {/* SPACING */}
      <div className="space-y-2">
        <p className="text-xs font-semibold">
          {t("scorm.panels.text.spacing") || "Spacing"}
        </p>

        <label className="text-xs">
          {t("scorm.panels.text.padding") || "Padding"}
        </label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.padding || 8)}
          onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
        />

        <label className="text-xs">
          {t("scorm.panels.text.radius") || "Border Radius"}
        </label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.radius || 0)}
          onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
        />

        <label className="text-xs">
          {t("scorm.panels.text.lineHeight") || "Line Height"}
        </label>
        <select
          className="w-full border rounded px-2 py-1 text-xs"
          value={style.lineHeight || "1.6"}
          onChange={(e) => updateStyle("lineHeight", e.target.value)}
        >
          <option value="1.2">1.2</option>
          <option value="1.4">1.4</option>
          <option value="1.6">1.6</option>
          <option value="1.8">1.8</option>
          <option value="2.0">2.0</option>
        </select>
      </div>

      <AnimationControls style={style} onChange={updateStyle} />
    </div>
  )
}

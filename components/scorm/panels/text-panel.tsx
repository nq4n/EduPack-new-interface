"use client"

import React from "react"
import { TextBlock } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"
import ColorInput from "@/components/scorm/panels/color-input"
import AnimationControls from "@/components/scorm/panels/animation-controls"
import {
  PanelLabel,
  PanelSection,
  SegmentedOption,
  panelFieldClassName,
  panelTextAreaClassName,
} from "@/components/scorm/panels/panel-ui"

interface Props {
  block: TextBlock
  onChange: (updated: TextBlock) => void
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
    <div className="space-y-4 pb-2 text-sm">
      <PanelSection title={t("scorm.panels.text.title") || "Text Settings"}>
        <PanelLabel>{t("scorm.panels.text.content") || "Content"}</PanelLabel>
        <textarea
          className={`${panelTextAreaClassName} min-h-[160px] resize-y`}
          value={block.html}
          onChange={(e) =>
            onChange({
              ...block,
              html: e.target.value,
            })
          }
        />
      </PanelSection>

      <PanelSection title={t("scorm.panels.text.typography") || "Typography"}>
        <div className="space-y-4">
          <div>
            <PanelLabel>{t("scorm.panels.text.typography") || "Typography"}</PanelLabel>
            <div className="flex flex-wrap items-center gap-2">
              <SegmentedOption
                active={!!style.bold}
                onClick={() => updateStyle("bold", !style.bold)}
              >
                <span className="font-bold">B</span>
              </SegmentedOption>
              <SegmentedOption
                active={!!style.italic}
                onClick={() => updateStyle("italic", !style.italic)}
              >
                <span className="italic">I</span>
              </SegmentedOption>
              <SegmentedOption
                active={!!style.underline}
                onClick={() => updateStyle("underline", !style.underline)}
              >
                <span className="underline">U</span>
              </SegmentedOption>
              <select
                className={`${panelFieldClassName} w-24 min-w-[96px]`}
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

          <div>
            <PanelLabel>{t("scorm.panels.text.alignment") || "Alignment"}</PanelLabel>
            <div className="grid grid-cols-2 gap-2">
              {["left", "center", "right", "justify"].map((alignment) => (
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

          <div>
            <PanelLabel>{t("scorm.panels.text.direction") || "Direction"}</PanelLabel>
            <div className="grid grid-cols-2 gap-2">
              <SegmentedOption
                active={(style.direction || "ltr") === "ltr"}
                onClick={() => updateStyle("direction", "ltr")}
              >
                {t("scorm.panels.common.direction.ltr") || "Left-to-right"}
              </SegmentedOption>
              <SegmentedOption
                active={style.direction === "rtl"}
                onClick={() => updateStyle("direction", "rtl")}
              >
                {t("scorm.panels.common.direction.rtl") || "Right-to-left"}
              </SegmentedOption>
            </div>
          </div>

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
      </PanelSection>

      <PanelSection title={t("scorm.panels.text.spacing") || "Spacing"}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <PanelLabel>{t("scorm.panels.text.padding") || "Padding"}</PanelLabel>
            <input
              type="number"
              className={panelFieldClassName}
              value={readNumber(style.padding, 8)}
              onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
            />
          </div>
          <div>
            <PanelLabel>{t("scorm.panels.text.radius") || "Border Radius"}</PanelLabel>
            <input
              type="number"
              className={panelFieldClassName}
              value={readNumber(style.radius, 0)}
              onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
            />
          </div>
        </div>

        <div className="mt-3">
          <PanelLabel>{t("scorm.panels.text.lineHeight") || "Line Height"}</PanelLabel>
          <select
            className={panelFieldClassName}
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
      </PanelSection>

      <AnimationControls style={style} onChange={updateStyle} />
    </div>
  )
}

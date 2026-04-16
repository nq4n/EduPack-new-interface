"use client"

import React from "react"
import { ImageBlock } from "@/lib/scorm/types"
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

interface Props {
  block: ImageBlock
  onChange: (updated: ImageBlock) => void
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

export default function MediaPanel({ block, onChange }: Props) {
  const style = block.style || {}
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

  return (
    <div className="space-y-4 pb-2 text-sm">
      <PanelSection title={t("scorm.panels.media.title") || "Image Settings"}>
        <div className="space-y-3">
          <div>
            <PanelLabel>{t("scorm.panels.media.url") || "Image URL"}</PanelLabel>
            <input
              type="text"
              className={panelFieldClassName}
              value={block.src}
              onChange={(e) => onChange({ ...block, src: e.target.value })}
            />
          </div>

          <div>
            <PanelLabel>{t("scorm.panels.media.alt") || "Alt Text"}</PanelLabel>
            <input
              type="text"
              className={panelFieldClassName}
              value={block.alt || ""}
              onChange={(e) => onChange({ ...block, alt: e.target.value })}
            />
          </div>
        </div>
      </PanelSection>

      <PanelSection title={t("scorm.panels.media.size") || "Size"}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <PanelLabel>{t("scorm.panels.media.width") || "Width (%)"}</PanelLabel>
            <input
              type="number"
              className={panelFieldClassName}
              value={readNumber(style.width, 100)}
              min={10}
              max={100}
              onChange={(e) => updateStyle("width", `${e.target.value}%`)}
            />
          </div>

          <div>
            <PanelLabel>{t("scorm.panels.media.maxWidth") || "Max Width (px)"}</PanelLabel>
            <input
              type="number"
              className={panelFieldClassName}
              value={readNumber(style.maxWidth, 800)}
              onChange={(e) => updateStyle("maxWidth", `${e.target.value}px`)}
            />
          </div>
        </div>

        <div className="mt-3">
          <PanelLabel>{t("scorm.panels.media.alignment") || "Alignment"}</PanelLabel>
          <div className="grid grid-cols-3 gap-2">
            {["left", "center", "right"].map((alignment) => (
              <SegmentedOption
                key={alignment}
                active={(style.align || "center") === alignment}
                onClick={() => updateStyle("align", alignment)}
              >
                {alignLabels[alignment] ?? alignment}
              </SegmentedOption>
            ))}
          </div>
        </div>
      </PanelSection>

      <PanelSection title={t("scorm.panels.media.appearance") || "Appearance"}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <PanelLabel>{t("scorm.panels.media.radius") || "Border Radius (px)"}</PanelLabel>
              <input
                type="number"
                className={panelFieldClassName}
                value={readNumber(style.radius, 0)}
                onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
              />
            </div>

            <div>
              <PanelLabel>{t("scorm.panels.media.padding") || "Padding (px)"}</PanelLabel>
              <input
                type="number"
                className={panelFieldClassName}
                value={readNumber(style.padding, 0)}
                onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
              />
            </div>
          </div>

          <ColorInput
            label={t("scorm.panels.media.background") || "Background Color"}
            value={style.background || ""}
            defaultColor="#ffffff"
            onChange={(value) => updateStyle("background", value)}
          />

          <ToggleCard
            checked={style.shadow === true}
            label={t("scorm.panels.media.shadow") || "Shadow"}
            onChange={(checked) => updateStyle("shadow", checked)}
          />
        </div>
      </PanelSection>

      <AnimationControls style={style} onChange={updateStyle} />
    </div>
  )
}

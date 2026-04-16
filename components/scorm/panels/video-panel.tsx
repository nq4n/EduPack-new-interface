"use client"

import React from "react"
import { VideoBlock } from "@/lib/scorm/types"
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

interface VideoPanelProps {
  block: VideoBlock
  onChange: (updated: VideoBlock) => void
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

export default function VideoPanel({ block, onChange }: VideoPanelProps) {
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
      <PanelSection title={t("scorm.panels.video.title") || "Video Settings"}>
        <PanelLabel>{t("scorm.panels.video.url") || "Video URL"}</PanelLabel>
        <input
          type="text"
          className={panelFieldClassName}
          value={block.src}
          onChange={(e) => onChange({ ...block, src: e.target.value })}
        />
      </PanelSection>

      <PanelSection title={t("scorm.panels.video.player") || "Playback"}>
        <div className="grid gap-2">
          <ToggleCard
            checked={style.autoplay === true}
            label={t("scorm.panels.video.autoplay") || "Autoplay"}
            onChange={(checked) => updateStyle("autoplay", checked)}
          />
          <ToggleCard
            checked={style.controls !== false}
            label={t("scorm.panels.video.controls") || "Show controls"}
            onChange={(checked) => updateStyle("controls", checked)}
          />
          <ToggleCard
            checked={style.loop === true}
            label={t("scorm.panels.video.loop") || "Loop video"}
            onChange={(checked) => updateStyle("loop", checked)}
          />
          <ToggleCard
            checked={style.muted === true}
            label={t("scorm.panels.video.muted") || "Muted"}
            onChange={(checked) => updateStyle("muted", checked)}
          />
        </div>
      </PanelSection>

      <PanelSection title={t("scorm.panels.video.size") || "Size"}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <PanelLabel>{t("scorm.panels.video.width") || "Width (%)"}</PanelLabel>
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
            <PanelLabel>{t("scorm.panels.video.maxWidth") || "Max Width (px)"}</PanelLabel>
            <input
              type="number"
              className={panelFieldClassName}
              value={readNumber(style.maxWidth, 800)}
              onChange={(e) => updateStyle("maxWidth", `${e.target.value}px`)}
            />
          </div>
        </div>

        <div className="mt-3">
          <PanelLabel>{t("scorm.panels.video.alignment") || "Alignment"}</PanelLabel>
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

      <PanelSection title={t("scorm.panels.video.appearance") || "Appearance"}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <PanelLabel>{t("scorm.panels.video.radius") || "Border Radius (px)"}</PanelLabel>
              <input
                type="number"
                className={panelFieldClassName}
                value={readNumber(style.radius, 0)}
                onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
              />
            </div>

            <div>
              <PanelLabel>{t("scorm.panels.video.padding") || "Padding (px)"}</PanelLabel>
              <input
                type="number"
                className={panelFieldClassName}
                value={readNumber(style.padding, 0)}
                onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
              />
            </div>
          </div>

          <ColorInput
            label={t("scorm.panels.video.background") || "Background Color"}
            value={style.background || ""}
            defaultColor="#ffffff"
            onChange={(value) => updateStyle("background", value)}
          />

          <ToggleCard
            checked={style.shadow === true}
            label={t("scorm.panels.video.shadow") || "Shadow"}
            onChange={(checked) => updateStyle("shadow", checked)}
          />
        </div>
      </PanelSection>

      <AnimationControls style={style} onChange={updateStyle} />
    </div>
  )
}

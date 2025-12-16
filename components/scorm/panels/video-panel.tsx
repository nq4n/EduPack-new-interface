"use client"

import React from "react"
import { VideoBlock } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"
import ColorInput from "@/components/scorm/panels/color-input"
import AnimationControls from "@/components/scorm/panels/animation-controls"

interface VideoPanelProps {
  block: VideoBlock
  onChange: (updated: VideoBlock) => void
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
    <div className="p-4 space-y-4 text-sm">
      <p className="font-semibold text-slate-700">
        {t("scorm.panels.video.title") || "Video Settings"}
      </p>

      {/* VIDEO URL */}
      <div>
        <label className="block mb-1 text-xs">
          {t("scorm.panels.video.url") || "Video URL"}
        </label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.src}
          onChange={(e) => onChange({ ...block, src: e.target.value })}
        />
      </div>

      {/* PLAYER BEHAVIOR */}
      <div>
        <p className="text-xs font-semibold mb-1">
          {t("scorm.panels.video.player") || "Playback"}
        </p>
        <div className="space-y-1 text-xs">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={style.autoplay === true}
              onChange={(e) => updateStyle("autoplay", e.target.checked)}
            />
            <span>{t("scorm.panels.video.autoplay") || "Autoplay"}</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={style.controls !== false}
              onChange={(e) => updateStyle("controls", e.target.checked)}
            />
            <span>{t("scorm.panels.video.controls") || "Show controls"}</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={style.loop === true}
              onChange={(e) => updateStyle("loop", e.target.checked)}
            />
            <span>{t("scorm.panels.video.loop") || "Loop video"}</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={style.muted === true}
              onChange={(e) => updateStyle("muted", e.target.checked)}
            />
            <span>{t("scorm.panels.video.muted") || "Muted"}</span>
          </label>
        </div>
      </div>

      {/* SIZE */}
      <div>
        <p className="text-xs font-semibold mb-1">
          {t("scorm.panels.video.size") || "Size"}
        </p>

        <label className="text-xs">
          {t("scorm.panels.video.width") || "Width (%)"}
        </label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.width || "100")}
          min={10}
          max={100}
          onChange={(e) => updateStyle("width", `${e.target.value}%`)}
        />

        <label className="text-xs mt-2">
          {t("scorm.panels.video.maxWidth") || "Max Width (px)"}
        </label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.maxWidth || "800")}
          onChange={(e) => updateStyle("maxWidth", `${e.target.value}px`)}
        />
      </div>

      {/* ALIGNMENT */}
      <div>
        <p className="text-xs font-semibold mb-1">
          {t("scorm.panels.video.alignment") || "Alignment"}
        </p>
        <div className="flex gap-2">
          {["left", "center", "right"].map((a) => (
            <button
              type="button"
              key={a}
              className={
                "px-3 py-1 rounded border text-xs capitalize " +
                (style.align === a ? "bg-sky-600 text-white" : "bg-white")
              }
              onClick={() => updateStyle("align", a)}
            >
              {alignLabels[a] ?? a}
            </button>
          ))}
        </div>
      </div>

      {/* APPEARANCE */}
      <div>
        <p className="text-xs font-semibold mb-1">
          {t("scorm.panels.video.appearance") || "Appearance"}
        </p>

        <label className="text-xs">
          {t("scorm.panels.video.radius") || "Border Radius (px)"}
        </label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.radius || "0")}
          onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
        />

        <label className="text-xs mt-2">
          {t("scorm.panels.video.padding") || "Padding (px)"}
        </label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.padding || "0")}
          onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
        />

        <ColorInput
          label={t("scorm.panels.video.background") || "Background Color"}
          value={style.background || ""}
          defaultColor="#ffffff"
          onChange={(value) => updateStyle("background", value)}
        />
      </div>

      {/* SHADOW */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={style.shadow === true}
          onChange={(e) => updateStyle("shadow", e.target.checked)}
        />
        <span className="text-xs">{t("scorm.panels.video.shadow") || "Shadow"}</span>
      </div>

      <AnimationControls style={style} onChange={updateStyle} />
    </div>
  )
}

"use client"

import React from "react"
import { VideoBlock } from "@/lib/scorm/types"

interface VideoPanelProps {
  block: VideoBlock
  onChange: (updated: VideoBlock) => void
}

export default function VideoPanel({ block, onChange }: VideoPanelProps) {
  const style = block.style || {}

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
      <p className="font-semibold text-slate-700">Video Settings</p>

      {/* VIDEO URL */}
      <div>
        <label className="block mb-1 text-xs">Video URL</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.src}
          onChange={(e) => onChange({ ...block, src: e.target.value })}
        />
      </div>

      {/* PLAYER BEHAVIOR */}
      <div>
        <p className="text-xs font-semibold mb-1">Playback</p>
        <div className="space-y-1 text-xs">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={style.autoplay === true}
              onChange={(e) => updateStyle("autoplay", e.target.checked)}
            />
            <span>Autoplay</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={style.controls !== false}
              onChange={(e) => updateStyle("controls", e.target.checked)}
            />
            <span>Show controls</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={style.loop === true}
              onChange={(e) => updateStyle("loop", e.target.checked)}
            />
            <span>Loop video</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={style.muted === true}
              onChange={(e) => updateStyle("muted", e.target.checked)}
            />
            <span>Muted</span>
          </label>
        </div>
      </div>

      {/* SIZE */}
      <div>
        <p className="text-xs font-semibold mb-1">Size</p>

        <label className="text-xs">Width (%)</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.width || "100")}
          min={10}
          max={100}
          onChange={(e) => updateStyle("width", `${e.target.value}%`)}
        />

        <label className="text-xs mt-2">Max Width (px)</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.maxWidth || "800")}
          onChange={(e) => updateStyle("maxWidth", `${e.target.value}px`)}
        />
      </div>

      {/* APPEARANCE */}
      <div>
        <p className="text-xs font-semibold mb-1">Appearance</p>

        <label className="text-xs">Border Radius (px)</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.radius || "0")}
          onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
        />

        <label className="text-xs mt-2">Padding (px)</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.padding || "0")}
          onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
        />

        <label className="text-xs mt-2">Background Color</label>
        <input
          type="color"
          className="w-full h-8 border rounded"
          value={style.background || "#ffffff"}
          onChange={(e) => updateStyle("background", e.target.value)}
        />
      </div>

      {/* SHADOW */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={style.shadow === true}
          onChange={(e) => updateStyle("shadow", e.target.checked)}
        />
        <span className="text-xs">Shadow</span>
      </div>
    </div>
  )
}

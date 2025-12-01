"use client"

import React from "react"
import { ImageBlock } from "@/lib/scorm/types"

interface Props {
  block: ImageBlock
  onChange: (updated: ImageBlock) => void
}

export default function MediaPanel({ block, onChange }: Props) {
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
      {/* Title */}
      <p className="font-semibold text-slate-700">Image Settings</p>

      {/* IMAGE URL */}
      <div>
        <label className="block mb-1 text-xs">Image URL</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.src}
          onChange={(e) => onChange({ ...block, src: e.target.value })}
        />
      </div>

      {/* ALT TEXT */}
      <div>
        <label className="block mb-1 text-xs">Alt Text</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.alt || ""}
          onChange={(e) => onChange({ ...block, alt: e.target.value })}
        />
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

      {/* ALIGNMENT */}
      <div>
        <p className="text-xs font-semibold mb-1">Alignment</p>
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
              {a}
            </button>
          ))}
        </div>
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

        <label className="text-xs mt-3">Background Color</label>
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
        <label className="text-xs">Shadow</label>
      </div>
    </div>
  )
}

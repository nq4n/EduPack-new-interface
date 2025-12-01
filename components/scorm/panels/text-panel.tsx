"use client"

import React from "react"
import { TextBlock } from "@/lib/scorm/types"

interface Props {
  block: TextBlock
  onChange: (updated: TextBlock) => void
}

export default function TextPanel({ block, onChange }: Props) {
  const style = block.style || {}

  // Update style object
  const updateStyle = (key: string, value: any) => {
    onChange({
      ...block,
      style: {
        ...style,
        [key]: value
      }
    })
  }

  return (
    <div className="p-4 space-y-4 text-sm">

      {/* Title */}
      <p className="font-semibold text-slate-700">Text Settings</p>

      {/* TEXT CONTENT */}
      <div>
        <label className="block mb-1 text-xs">Content</label>
        <textarea
          className="w-full border rounded px-2 py-2 h-32"
          value={block.html}
          onChange={(e) =>
            onChange({
              ...block,
              html: e.target.value
            })
          }
        />
      </div>

      {/* FONT OPTIONS */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-600">Typography</p>

        <div className="flex items-center gap-2">
          <button
            className={
              "px-2 py-1 rounded border text-xs " +
              (style.bold ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateStyle("bold", !style.bold)}
          >
            B
          </button>

          <button
            className={
              "px-2 py-1 rounded border text-xs italic " +
              (style.italic ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateStyle("italic", !style.italic)}
          >
            I
          </button>

          <button
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
        <p className="text-xs font-semibold mb-1">Alignment</p>
        <div className="flex gap-2">
          {["left", "center", "right", "justify"].map((a) => (
            <button
              key={a}
              className={
                "px-2 py-1 rounded border text-xs capitalize " +
                (style.align === a ? "bg-sky-600 text-white" : "bg-white")
              }
              onClick={() => updateStyle("align", a)}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* DIRECTION */}
      <div>
        <p className="text-xs font-semibold mb-1">Direction</p>
        <div className="flex gap-2">
          <button
            className={
              "px-3 py-1 rounded border text-xs " +
              (style.direction === "ltr" ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateStyle("direction", "ltr")}
          >
            LTR
          </button>

          <button
            className={
              "px-3 py-1 rounded border text-xs " +
              (style.direction === "rtl" ? "bg-sky-600 text-white" : "bg-white")
            }
            onClick={() => updateStyle("direction", "rtl")}
          >
            RTL
          </button>
        </div>
      </div>

      {/* COLORS */}
      <div className="flex gap-4 items-center">
        <div>
          <p className="text-xs mb-1">Text Color</p>
          <input
            type="color"
            value={style.color || "#000000"}
            onChange={(e) => updateStyle("color", e.target.value)}
          />
        </div>

        <div>
          <p className="text-xs mb-1">Background</p>
          <input
            type="color"
            value={style.background || "transparent"}
            onChange={(e) => updateStyle("background", e.target.value)}
          />
        </div>
      </div>

      {/* SPACING */}
      <div className="space-y-2">
        <p className="text-xs font-semibold">Spacing</p>

        <label className="text-xs">Padding</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.padding || 8)}
          onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
        />

        <label className="text-xs">Border Radius</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.radius || 0)}
          onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
        />

        <label className="text-xs">Line Height</label>
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
    </div>
  )
}

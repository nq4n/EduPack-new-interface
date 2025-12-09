"use client"

import React from "react"
import { InteractiveBlock, InteractiveVariant } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"

interface InteractivePanelProps {
  block: InteractiveBlock
  onChange: (updated: InteractiveBlock) => void
}

export default function InteractivePanel({ block, onChange }: InteractivePanelProps) {
  const style = block.style || {}
  const { t } = useLocale()

  const updateBlock = (partial: Partial<InteractiveBlock>) => {
    onChange({
      ...block,
      ...partial,
    })
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

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variant = e.target.value as InteractiveVariant
    updateBlock({ variant })
  }

  return (
    <div className="p-4 space-y-4 text-sm">
      <p className="font-semibold text-slate-700">
        {t("scorm.panels.interactive.title") || "Interactive element"}
      </p>

      {/* TYPE SELECT */}
      <div>
        <label className="block mb-1 text-xs">
          {t("scorm.panels.interactive.type") || "Type"}
        </label>
        <select
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.variant}
          onChange={handleVariantChange}
        >
          <option value="button">{t("scorm.panels.interactive.button") || "Button"}</option>
          <option value="callout">{t("scorm.panels.interactive.callout") || "Callout box"}</option>
          <option value="reveal">{t("scorm.panels.interactive.reveal") || "Reveal box"}</option>
          <option value="custom">{t("scorm.panels.interactive.custom") || "Custom HTML"}</option>
        </select>
      </div>

      {/* SHARED LABEL */}
      {block.variant !== "custom" && (
        <div>
          <label className="block mb-1 text-xs">
            {block.variant === "button"
              ? t("scorm.panels.interactive.buttonText") || "Button text"
              : block.variant === "reveal"
                ? t("scorm.panels.interactive.revealTitle") || "Title (what learner clicks)"
                : t("scorm.panels.interactive.titleField") || "Title"}
          </label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 text-xs"
            value={block.label}
            onChange={(e) => updateBlock({ label: e.target.value })}
          />
        </div>
      )}

      {/* BUTTON SETTINGS */}
      {block.variant === "button" && (
        <div>
          <label className="block mb-1 text-xs">
            {t("scorm.panels.interactive.link") || "Link (optional)"}
          </label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 text-xs"
            placeholder={
              t("scorm.panels.interactive.linkPlaceholder") || "https://..."
            }
            value={block.url || ""}
            onChange={(e) => updateBlock({ url: e.target.value })}
          />
          <p className="text-[11px] text-slate-400 mt-1">
            {t("scorm.panels.interactive.linkHelp") ||
              "If you leave this empty, the button will only look clickable and not open anything."}
          </p>
        </div>
      )}

      {/* CALLOUT SETTINGS */}
      {block.variant === "callout" && (
        <div>
          <label className="block mb-1 text-xs">
            {t("scorm.panels.interactive.calloutContent") || "Callout content"}
          </label>
          <textarea
            className="w-full border rounded px-2 py-2 text-xs h-24"
            value={block.bodyHtml || ""}
            onChange={(e) => updateBlock({ bodyHtml: e.target.value })}
          />
          <label className="block mb-1 mt-2 text-xs">
            {t("scorm.panels.interactive.tone") || "Tone"}
          </label>
          <select
            className="w-full border rounded px-2 py-1 text-xs"
            value={block.tone || "info"}
            onChange={(e) =>
              updateBlock({ tone: e.target.value as InteractiveBlock["tone"] })
            }
          >
            <option value="info">{t("scorm.panels.interactive.tones.info") || "Info"}</option>
            <option value="success">{t("scorm.panels.interactive.tones.success") || "Success"}</option>
            <option value="warning">{t("scorm.panels.interactive.tones.warning") || "Warning"}</option>
            <option value="danger">{t("scorm.panels.interactive.tones.danger") || "Danger"}</option>
          </select>
        </div>
      )}

      {/* REVEAL SETTINGS */}
      {block.variant === "reveal" && (
        <div className="space-y-2">
          <label className="block mb-1 text-xs">
            {t("scorm.panels.interactive.revealTitle") || "Title (clickable text)"}
          </label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 text-xs"
            value={block.label}
            onChange={(e) => updateBlock({ label: e.target.value })}
          />

          <label className="block mb-1 text-xs">
            {t("scorm.panels.interactive.revealHidden") ||
              "Hidden content (shown after learner clicks)"}
          </label>
          <textarea
            className="w-full border rounded px-2 py-2 text-xs h-24"
            value={block.bodyHtml || ""}
            onChange={(e) => updateBlock({ bodyHtml: e.target.value })}
          />
          <label className="inline-flex items-center gap-2 text-xs mt-1">
            <input
              type="checkbox"
              checked={block.initiallyOpen === true}
              onChange={(e) => updateBlock({ initiallyOpen: e.target.checked })}
            />
            <span>{t("scorm.panels.interactive.open") || "Open by default"}</span>
          </label>
        </div>
      )}

      {/* CUSTOM HTML SETTINGS */}
      {block.variant === "custom" && (
        <div className="space-y-1">
          <label className="block mb-1 text-xs">
            {t("scorm.panels.interactive.customHtml") || "Custom HTML"}
          </label>
          <textarea
            className="w-full border rounded px-2 py-2 text-xs h-32 font-mono"
            placeholder={
              t("scorm.panels.interactive.customPlaceholder") ||
              `<div class="my-widget">\n  <!-- Your HTML here -->\n</div>`
            }
            value={block.customHtml || ""}
            onChange={(e) => updateBlock({ customHtml: e.target.value })}
          />
          <p className="text-[11px] text-slate-400">
            {t("scorm.panels.interactive.customHelp") ||
              "For advanced users. Avoid using <script> tags. You can embed iframes, H5P, simple widgets, etc."}
          </p>
        </div>
      )}

      {/* APPEARANCE */}
      <div className="space-y-2">
        <p className="text-xs font-semibold">
          {t("scorm.panels.interactive.appearance") || "Appearance"}
        </p>

        <label className="text-xs">
          {t("scorm.panels.interactive.padding") || "Padding (px)"}
        </label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.padding || "8")}
          onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
        />

        <label className="text-xs">
          {t("scorm.panels.interactive.radius") || "Border radius (px)"}
        </label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 text-xs"
          value={parseInt(style.radius || (block.variant === "button" ? "999" : "10"))}
          onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
        />

        <label className="text-xs">
          {t("scorm.panels.interactive.background") || "Background color"}
        </label>
        <input
          type="color"
          className="w-full h-8 border rounded"
          value={
            style.background ||
            (block.variant === "button"
              ? "#0ea5e9"
              : block.variant === "custom"
                ? "#ffffff"
                : "#eef2ff")
          }
          onChange={(e) => updateStyle("background", e.target.value)}
        />

        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            checked={style.shadow === true}
            onChange={(e) => updateStyle("shadow", e.target.checked)}
          />
          <span className="text-xs">{t("scorm.panels.interactive.shadow") || "Shadow"}</span>
        </div>
      </div>
    </div>
  )
}

"use client"

import React from "react"
import { SvgBlock } from "@/lib/scorm/types"
import {
  coerceSvgMarkup,
  extractSvgTextNodes,
  getDefaultSvgMarkup,
  OPEN_SOURCE_SVG_SOURCES,
  SVG_TEMPLATES,
  updateSvgTextNode,
} from "@/lib/scorm/svg"
import { useLocale } from "@/hooks/use-locale"
import ColorInput from "@/components/scorm/panels/color-input"
import AnimationControls from "@/components/scorm/panels/animation-controls"
import { toast } from "sonner"

interface Props {
  block: SvgBlock
  onChange: (updated: SvgBlock) => void
}

export default function SvgPanel({ block, onChange }: Props) {
  const style = block.style || {}
  const { t } = useLocale()
  const [importSource, setImportSource] = React.useState("")
  const [importUrl, setImportUrl] = React.useState("")
  const [isImportingUrl, setIsImportingUrl] = React.useState(false)
  const textNodes = React.useMemo(() => extractSvgTextNodes(block.svg), [block.svg])

  const alignLabels: Record<string, string> = {
    left: t("scorm.panels.common.align.left"),
    center: t("scorm.panels.common.align.center"),
    right: t("scorm.panels.common.align.right"),
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

  const updateTextNode = (nodeId: string, value: string) => {
    onChange({
      ...block,
      svg: updateSvgTextNode(block.svg, nodeId, value),
    })
  }

  const importPastedSource = () => {
    const svg = coerceSvgMarkup(importSource)

    if (!svg) {
      toast.error(t("scorm.panels.svg.import.invalid"))
      return
    }

    onChange({ ...block, svg })
    toast.success(t("scorm.panels.svg.import.success"))
  }

  const importFromUrl = async () => {
    if (!importUrl.trim()) {
      toast.error(t("scorm.panels.svg.import.urlRequired"))
      return
    }

    setIsImportingUrl(true)

    try {
      const res = await fetch("/api/scorm/svg/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: importUrl.trim() }),
      })

      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(json.error || t("scorm.panels.svg.import.fetchFailed"))
      }

      if (!json.svg) {
        throw new Error(t("scorm.panels.svg.import.invalid"))
      }

      onChange({ ...block, svg: json.svg })
      toast.success(t("scorm.panels.svg.import.success"))
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : t("scorm.panels.svg.import.fetchFailed")
      toast.error(message)
    } finally {
      setIsImportingUrl(false)
    }
  }

  return (
    <div className="space-y-4 p-4 text-sm">
      <p className="font-semibold text-slate-700">
        {t("scorm.panels.svg.title")}
      </p>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-600">
          {t("scorm.panels.svg.templates")}
        </p>
        <div className="flex flex-wrap gap-2">
          {SVG_TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              className="rounded-full border px-3 py-1 text-xs text-slate-700 transition-colors hover:bg-slate-50"
              onClick={() =>
                onChange({
                  ...block,
                  svg: getDefaultSvgMarkup(template.id),
                })
              }
            >
              {template.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div>
          <p className="text-xs font-semibold text-slate-700">
            {t("scorm.panels.svg.import.title")}
          </p>
          <p className="text-[11px] text-slate-500">
            {t("scorm.panels.svg.import.help")}
          </p>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-600">
            {t("scorm.panels.svg.import.pasteLabel")}
          </label>
          <textarea
            className="h-28 w-full rounded-xl border bg-white px-2 py-2 font-mono text-xs"
            placeholder={t("scorm.panels.svg.import.pastePlaceholder")}
            value={importSource}
            onChange={(e) => setImportSource(e.target.value)}
          />
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            onClick={importPastedSource}
          >
            {t("scorm.panels.svg.import.pasteButton")}
          </button>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-600">
            {t("scorm.panels.svg.import.urlLabel")}
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              className="w-full rounded-xl border bg-white px-2 py-1 text-xs"
              placeholder={t("scorm.panels.svg.import.urlPlaceholder")}
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
            />
            <button
              type="button"
              className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
              onClick={importFromUrl}
              disabled={isImportingUrl}
            >
              {isImportingUrl
                ? t("scorm.panels.svg.import.fetching")
                : t("scorm.panels.svg.import.urlButton")}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3">
        <div>
          <p className="text-xs font-semibold text-slate-700">
            {t("scorm.panels.svg.sources.title")}
          </p>
          <p className="text-[11px] text-slate-500">
            {t("scorm.panels.svg.sources.help")}
          </p>
        </div>
        <div className="grid gap-2">
          {OPEN_SOURCE_SVG_SOURCES.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-slate-300 hover:bg-slate-100"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-800">
                  {source.name}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-slate-400">
                  {t("scorm.panels.svg.sources.open")}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                {source.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs">
          {t("scorm.panels.svg.caption")}
        </label>
        <input
          type="text"
          className="w-full rounded border px-2 py-1 text-xs"
          value={block.caption || ""}
          onChange={(e) => onChange({ ...block, caption: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-xs font-semibold text-slate-700">
            {t("scorm.panels.svg.textNodes")}
          </p>
          <p className="text-[11px] text-slate-400">
            {t("scorm.panels.svg.textNodeHelp")}
          </p>
        </div>

        {textNodes.length > 0 ? (
          <div className="space-y-2">
            {textNodes.map((node, index) => (
              <div
                key={node.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-2"
              >
                <label className="mb-1 block text-[11px] font-medium text-slate-600">
                  {t("scorm.panels.svg.textNodeLabel", { index: index + 1 })}
                </label>
                <input
                  type="text"
                  className="w-full rounded border bg-white px-2 py-1 text-xs"
                  value={node.text}
                  onChange={(e) => updateTextNode(node.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
            {t("scorm.panels.svg.textNodeEmpty")}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <label className="mb-1 block text-xs">
          {t("scorm.panels.svg.markup")}
        </label>
        <textarea
          className="h-56 w-full rounded border px-2 py-2 font-mono text-xs"
          value={block.svg}
          onChange={(e) => onChange({ ...block, svg: e.target.value })}
        />
        <p className="text-[11px] text-slate-400">
          {t("scorm.panels.svg.help")}
        </p>
      </div>

      <div>
        <p className="mb-1 text-xs font-semibold">
          {t("scorm.panels.svg.size")}
        </p>

        <label className="text-xs">
          {t("scorm.panels.svg.width")}
        </label>
        <input
          type="number"
          className="w-full rounded border px-2 py-1 text-xs"
          value={parseInt(style.width || "100", 10)}
          min={20}
          max={100}
          onChange={(e) => updateStyle("width", `${e.target.value}%`)}
        />

        <label className="mt-2 text-xs">
          {t("scorm.panels.svg.maxWidth")}
        </label>
        <input
          type="number"
          className="w-full rounded border px-2 py-1 text-xs"
          value={parseInt(style.maxWidth || "840", 10)}
          min={240}
          onChange={(e) => updateStyle("maxWidth", `${e.target.value}px`)}
        />
      </div>

      <div>
        <p className="mb-1 text-xs font-semibold">
          {t("scorm.panels.svg.alignment")}
        </p>
        <div className="flex gap-2">
          {["left", "center", "right"].map((align) => (
            <button
              key={align}
              type="button"
              className={`rounded border px-3 py-1 text-xs capitalize ${
                style.align === align ? "bg-sky-600 text-white" : "bg-white"
              }`}
              onClick={() => updateStyle("align", align)}
            >
              {alignLabels[align] ?? align}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold">
          {t("scorm.panels.svg.appearance")}
        </p>

        <label className="text-xs">
          {t("scorm.panels.svg.padding")}
        </label>
        <input
          type="number"
          className="w-full rounded border px-2 py-1 text-xs"
          value={parseInt(style.padding || "8", 10)}
          onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
        />

        <label className="text-xs">
          {t("scorm.panels.svg.radius")}
        </label>
        <input
          type="number"
          className="w-full rounded border px-2 py-1 text-xs"
          value={parseInt(style.radius || "18", 10)}
          onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
        />

        <ColorInput
          label={t("scorm.panels.svg.background")}
          value={style.background || ""}
          defaultColor="#ffffff"
          onChange={(value) => updateStyle("background", value)}
        />

        <label className="inline-flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={style.shadow === true}
            onChange={(e) => updateStyle("shadow", e.target.checked)}
          />
          <span>{t("scorm.panels.svg.shadow")}</span>
        </label>
      </div>

      <AnimationControls style={style} onChange={updateStyle} />
    </div>
  )
}

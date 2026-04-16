"use client"

import React from "react"
import { EditorPage, InteractiveBlock, InteractiveVariant } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"
import ColorInput from "@/components/scorm/panels/color-input"
import AnimationControls from "@/components/scorm/panels/animation-controls"
import {
  PanelLabel,
  PanelSection,
  SegmentedOption,
  ToggleCard,
  panelFieldClassName,
  panelTextAreaClassName,
} from "@/components/scorm/panels/panel-ui"

interface InteractivePanelProps {
  block: InteractiveBlock
  onChange: (updated: InteractiveBlock) => void
  pages: EditorPage[]
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

export default function InteractivePanel({
  block,
  onChange,
  pages,
}: InteractivePanelProps) {
  const style = block.style || {}
  const { t } = useLocale()

  const alignLabels: Record<string, string> = {
    left: t("scorm.panels.common.align.left") || "Left",
    center: t("scorm.panels.common.align.center") || "Center",
    right: t("scorm.panels.common.align.right") || "Right",
  }

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
    updateBlock({ variant: e.target.value as InteractiveVariant })
  }

  return (
    <div className="space-y-4 pb-2 text-sm">
      <PanelSection title={t("scorm.panels.interactive.title") || "Interactive element"}>
        <div className="space-y-3">
          <div>
            <PanelLabel>{t("scorm.panels.interactive.type") || "Type"}</PanelLabel>
            <select
              className={panelFieldClassName}
              value={block.variant}
              onChange={handleVariantChange}
            >
              <option value="button">{t("scorm.panels.interactive.button") || "Button"}</option>
              <option value="callout">{t("scorm.panels.interactive.callout") || "Callout box"}</option>
              <option value="reveal">{t("scorm.panels.interactive.reveal") || "Reveal box"}</option>
              <option value="custom">{t("scorm.panels.interactive.custom") || "Custom HTML"}</option>
            </select>
          </div>

          {block.variant !== "custom" ? (
            <div>
              <PanelLabel>
                {block.variant === "button"
                  ? t("scorm.panels.interactive.buttonText") || "Button text"
                  : block.variant === "reveal"
                    ? t("scorm.panels.interactive.revealTitle") ||
                      "Title (what learner clicks)"
                    : t("scorm.panels.interactive.titleField") || "Title"}
              </PanelLabel>
              <input
                type="text"
                className={panelFieldClassName}
                value={block.label}
                onChange={(e) => updateBlock({ label: e.target.value })}
              />
            </div>
          ) : null}
        </div>
      </PanelSection>

      {block.variant === "button" ? (
        <PanelSection
          title={t("scorm.panels.interactive.buttonAction") || "Button action"}
        >
          <div className="space-y-3">
            <div>
              <PanelLabel>{t("scorm.panels.interactive.buttonAction") || "Button action"}</PanelLabel>
              <select
                className={panelFieldClassName}
                value={block.action || (block.targetPageId ? "page" : "link")}
                onChange={(e) =>
                  updateBlock({
                    action: e.target.value as InteractiveBlock["action"],
                  })
                }
              >
                <option value="link">
                  {t("scorm.panels.interactive.action.link") || "Open link"}
                </option>
                <option value="page">
                  {t("scorm.panels.interactive.action.page") || "Go to page"}
                </option>
                <option value="none">
                  {t("scorm.panels.interactive.action.none") || "Do nothing"}
                </option>
              </select>
            </div>

            {(block.action || "link") === "link" ? (
              <div>
                <PanelLabel>{t("scorm.panels.interactive.link") || "Link (optional)"}</PanelLabel>
                <input
                  type="text"
                  className={panelFieldClassName}
                  placeholder={
                    t("scorm.panels.interactive.linkPlaceholder") || "https://..."
                  }
                  value={block.url || ""}
                  onChange={(e) =>
                    updateBlock({ url: e.target.value, targetPageId: undefined })
                  }
                />
                <p className="mt-2 text-[11px] leading-5 text-slate-500">
                  {t("scorm.panels.interactive.linkHelp") ||
                    "If this is empty, the button stays visual only."}
                </p>
              </div>
            ) : null}

            {(block.action || "link") === "page" ? (
              <div>
                <PanelLabel>
                  {t("scorm.panels.interactive.pageTarget") || "Choose target page"}
                </PanelLabel>
                <select
                  className={panelFieldClassName}
                  value={block.targetPageId || ""}
                  onChange={(e) =>
                    updateBlock({ targetPageId: e.target.value, url: "" })
                  }
                >
                  <option value="">
                    {t("scorm.panels.interactive.pagePlaceholder") || "Select a page"}
                  </option>
                  {pages.map((page) => (
                    <option key={page.id} value={page.id}>
                      {page.title}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">
                  {t("scorm.panels.interactive.pageHelp") ||
                    "Learners jump directly to the selected page."}
                </p>
              </div>
            ) : null}
          </div>
        </PanelSection>
      ) : null}

      {block.variant === "callout" ? (
        <PanelSection title={t("scorm.panels.interactive.callout") || "Callout box"}>
          <div className="space-y-3">
            <div>
              <PanelLabel>
                {t("scorm.panels.interactive.calloutContent") || "Callout content"}
              </PanelLabel>
              <textarea
                className={`${panelTextAreaClassName} min-h-[120px] resize-y`}
                value={block.bodyHtml || ""}
                onChange={(e) => updateBlock({ bodyHtml: e.target.value })}
              />
            </div>
            <div>
              <PanelLabel>{t("scorm.panels.interactive.tone") || "Tone"}</PanelLabel>
              <select
                className={panelFieldClassName}
                value={block.tone || "info"}
                onChange={(e) =>
                  updateBlock({
                    tone: e.target.value as InteractiveBlock["tone"],
                  })
                }
              >
                <option value="info">
                  {t("scorm.panels.interactive.tones.info") || "Info"}
                </option>
                <option value="success">
                  {t("scorm.panels.interactive.tones.success") || "Success"}
                </option>
                <option value="warning">
                  {t("scorm.panels.interactive.tones.warning") || "Warning"}
                </option>
                <option value="danger">
                  {t("scorm.panels.interactive.tones.danger") || "Danger"}
                </option>
              </select>
            </div>
          </div>
        </PanelSection>
      ) : null}

      {block.variant === "reveal" ? (
        <PanelSection title={t("scorm.panels.interactive.reveal") || "Reveal box"}>
          <div className="space-y-3">
            <div>
              <PanelLabel>
                {t("scorm.panels.interactive.revealTitle") || "Title (clickable text)"}
              </PanelLabel>
              <input
                type="text"
                className={panelFieldClassName}
                value={block.label}
                onChange={(e) => updateBlock({ label: e.target.value })}
              />
            </div>

            <div>
              <PanelLabel>
                {t("scorm.panels.interactive.revealHidden") ||
                  "Hidden content (shown after learner clicks)"}
              </PanelLabel>
              <textarea
                className={`${panelTextAreaClassName} min-h-[120px] resize-y`}
                value={block.bodyHtml || ""}
                onChange={(e) => updateBlock({ bodyHtml: e.target.value })}
              />
            </div>

            <ToggleCard
              checked={block.initiallyOpen === true}
              label={t("scorm.panels.interactive.open") || "Open by default"}
              onChange={(checked) => updateBlock({ initiallyOpen: checked })}
            />
          </div>
        </PanelSection>
      ) : null}

      {block.variant === "custom" ? (
        <PanelSection title={t("scorm.panels.interactive.custom") || "Custom HTML"}>
          <div className="space-y-3">
            <div>
              <PanelLabel>{t("scorm.panels.interactive.customHtml") || "Custom HTML"}</PanelLabel>
              <textarea
                className={`${panelTextAreaClassName} min-h-[180px] resize-y font-mono text-xs`}
                placeholder={
                  t("scorm.panels.interactive.customPlaceholder") ||
                  `<div class="my-widget">\n  <!-- Your HTML here -->\n</div>`
                }
                value={block.customHtml || ""}
                onChange={(e) => updateBlock({ customHtml: e.target.value })}
              />
            </div>
            <p className="text-[11px] leading-5 text-slate-500">
              {t("scorm.panels.interactive.customHelp") ||
                "Avoid script tags. Use simple widgets, iframes, or embedded HTML."}
            </p>
          </div>
        </PanelSection>
      ) : null}

      <PanelSection title={t("scorm.panels.interactive.text") || "Text and alignment"}>
        <div className="space-y-3">
          <ColorInput
            label={t("scorm.panels.interactive.textColor") || "Text color"}
            value={style.color || ""}
            defaultColor={block.variant === "button" ? "#ffffff" : "#0f172a"}
            onChange={(value) => updateStyle("color", value)}
          />

          <div>
            <PanelLabel>{t("scorm.panels.interactive.align") || "Alignment"}</PanelLabel>
            <div className="grid grid-cols-3 gap-2">
              {["left", "center", "right"].map((alignment) => (
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
        </div>
      </PanelSection>

      <PanelSection title={t("scorm.panels.interactive.appearance") || "Appearance"}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <PanelLabel>{t("scorm.panels.interactive.padding") || "Padding (px)"}</PanelLabel>
              <input
                type="number"
                className={panelFieldClassName}
                value={readNumber(style.padding, 8)}
                onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
              />
            </div>
            <div>
              <PanelLabel>
                {t("scorm.panels.interactive.radius") || "Border radius (px)"}
              </PanelLabel>
              <input
                type="number"
                className={panelFieldClassName}
                value={readNumber(
                  style.radius,
                  block.variant === "button" ? 999 : 10
                )}
                onChange={(e) => updateStyle("radius", `${e.target.value}px`)}
              />
            </div>
          </div>

          <ColorInput
            label={t("scorm.panels.interactive.background") || "Background color"}
            value={style.background || ""}
            defaultColor={
              block.variant === "button"
                ? "#0ea5e9"
                : block.variant === "custom"
                  ? "#ffffff"
                  : "#eef2ff"
            }
            onChange={(value) => updateStyle("background", value)}
          />

          <ToggleCard
            checked={style.shadow === true}
            label={t("scorm.panels.interactive.shadow") || "Shadow"}
            onChange={(checked) => updateStyle("shadow", checked)}
          />
        </div>
      </PanelSection>

      <AnimationControls style={style} onChange={updateStyle} />
    </div>
  )
}

"use client"

import React from "react"
import { useLocale } from "@/hooks/use-locale"
import {
  PanelLabel,
  PanelSection,
  panelFieldClassName,
} from "@/components/scorm/panels/panel-ui"

interface AnimationControlsProps {
  style: any
  onChange: (key: string, value: any) => void
}

export default function AnimationControls({ style, onChange }: AnimationControlsProps) {
  const { t } = useLocale()
  const animationType = style.animation || "none"
  const durationValue = parseFloat(style.animationDuration || "0.6")
  const delayValue = parseFloat(style.animationDelay || "0")

  return (
    <PanelSection
      title={t("scorm.panels.common.animation.title") || "Animation"}
      description="Add a simple entrance effect without overwhelming the lesson."
    >
      <div className="space-y-3">
        <div>
          <PanelLabel>
            {t("scorm.panels.common.animation.type") || "Type"}
          </PanelLabel>
          <select
            className={panelFieldClassName}
            value={animationType}
            onChange={(e) => onChange("animation", e.target.value)}
          >
            <option value="none">
              {t("scorm.panels.common.animation.none") || "None"}
            </option>
            <option value="fade">
              {t("scorm.panels.common.animation.fade") || "Fade"}
            </option>
          </select>
        </div>

        {animationType !== "none" ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <PanelLabel>
                {t("scorm.panels.common.animation.duration") || "Duration"}
              </PanelLabel>
              <input
                type="number"
                className={panelFieldClassName}
                value={Number.isNaN(durationValue) ? 0.6 : durationValue}
                min={0.1}
                step={0.1}
                onChange={(e) =>
                  onChange("animationDuration", `${e.target.value || 0.6}s`)
                }
              />
            </div>
            <div>
              <PanelLabel>
                {t("scorm.panels.common.animation.delay") || "Delay"}
              </PanelLabel>
              <input
                type="number"
                className={panelFieldClassName}
                value={Number.isNaN(delayValue) ? 0 : delayValue}
                min={0}
                step={0.1}
                onChange={(e) =>
                  onChange("animationDelay", `${e.target.value || 0}s`)
                }
              />
            </div>
          </div>
        ) : null}
      </div>
    </PanelSection>
  )
}

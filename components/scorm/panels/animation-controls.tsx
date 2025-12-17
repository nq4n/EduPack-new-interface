"use client"

import React from "react"
import { useLocale } from "@/hooks/use-locale"

interface AnimationControlsProps {
  style: any
  onChange: (key: string, value: any) => void
}

export default function AnimationControls({ style, onChange }: AnimationControlsProps) {
  const { t } = useLocale()

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold">
        {t("scorm.panels.common.animation.title")}
      </p>

      <label className="block mb-1 text-xs">
        {t("scorm.panels.common.animation.type")}
      </label>
      <select
        className="w-full border rounded px-2 py-1 text-xs"
        value={style.animation || "none"}
        onChange={(e) => onChange("animation", e.target.value)}
      >
        <option value="none">{t("scorm.panels.common.animation.none")}</option>
        <option value="fade">
          {t("scorm.panels.common.animation.fade")}
        </option>
      </select>

      {style.animation && style.animation !== "none" && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="block mb-1 text-xs">
              {t("scorm.panels.common.animation.duration")}
            </label>
            <input
              type="number"
              className="w-full border rounded px-2 py-1 text-xs"
              value={parseFloat(style.animationDuration || "0.6")}
              min={0.1}
              step={0.1}
              onChange={(e) =>
                onChange("animationDuration", `${e.target.value || 0.6}s`)
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-xs">
              {t("scorm.panels.common.animation.delay")}
            </label>
            <input
              type="number"
              className="w-full border rounded px-2 py-1 text-xs"
              value={parseFloat(style.animationDelay || "0")}
              min={0}
              step={0.1}
              onChange={(e) => onChange("animationDelay", `${e.target.value || 0}s`)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"

interface ColorInputProps {
  label?: string
  value?: string
  onChange: (value: string) => void
  defaultColor: string
  helperText?: string
}

const hexColorRegex = /^#([0-9a-fA-F]{3}){1,2}$/

export function ColorInput({
  label,
  value,
  onChange,
  defaultColor,
  helperText,
}: ColorInputProps) {
  const { t } = useLocale()
  const normalized = value || ""
  const isTransparent = normalized.toLowerCase() === "transparent"
  const colorPickerValue =
    normalized && hexColorRegex.test(normalized.toString())
      ? normalized
      : defaultColor

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm">
        <div className="relative">
          <div
            className={`absolute inset-0 rounded-xl ${
              isTransparent
                ? "bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%,transparent_50%,#e2e8f0_50%,#e2e8f0_75%,transparent_75%,transparent)] bg-[length:10px_10px]"
                : ""
            }`}
          />
          <input
            type="color"
            className="relative h-10 w-12 cursor-pointer rounded-xl border border-slate-200 bg-white p-1 shadow-sm"
            value={colorPickerValue}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
          value={normalized}
          placeholder={defaultColor}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={`h-10 rounded-xl border-slate-200 px-4 whitespace-nowrap ${
            isTransparent
              ? "bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
          onClick={() => onChange("transparent")}
        >
          {t("scorm.colorInput.transparent")}
        </Button>
      </div>
      {helperText ? (
        <p className="text-[11px] leading-5 text-slate-500">{helperText}</p>
      ) : null}
    </div>
  )
}

export default ColorInput

"use client"

import React from "react"
import { Button } from "@/components/ui/button"

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
  const normalized = value || ""
  const colorPickerValue =
    normalized && hexColorRegex.test(normalized.toString())
      ? normalized
      : defaultColor

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-medium text-foreground/80">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          type="color"
          className="h-9 w-12 rounded border"
          value={colorPickerValue}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          className="flex-1 rounded border px-2 py-1 text-xs"
          value={normalized}
          placeholder={defaultColor}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 whitespace-nowrap"
          onClick={() => onChange("transparent")}
        >
          Transparent
        </Button>
      </div>
      {helperText ? (
        <p className="text-[11px] text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  )
}

export default ColorInput

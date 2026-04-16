"use client"

import React from "react"

export const panelFieldClassName =
  "h-10 w-full rounded-xl border border-slate-200 bg-slate-50/90 px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"

export const panelTextAreaClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50/90 px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"

export function PanelSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[22px] border border-slate-200 bg-white/95 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
      <div className="mb-3 space-y-1">
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
        {description ? (
          <p className="text-[11px] leading-5 text-slate-500">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function PanelLabel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
      {children}
    </label>
  )
}

export function SegmentedOption({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
        active
          ? "border-sky-200 bg-sky-50 text-sky-700 shadow-[0_8px_20px_rgba(14,165,233,0.12)]"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
      }`}
    >
      {children}
    </button>
  )
}

export function ToggleCard({
  checked,
  label,
  onChange,
}: {
  checked: boolean
  label: string
  onChange: (checked: boolean) => void
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-3 transition ${
        checked
          ? "border-sky-200 bg-sky-50/70"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-200"
      />
      <span className="text-xs font-medium leading-5 text-slate-700">{label}</span>
    </label>
  )
}

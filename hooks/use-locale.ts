"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Locale } from "@/lib/i18n"

interface LocaleStore {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useLocale = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "edupack-locale",
    },
  ),
)

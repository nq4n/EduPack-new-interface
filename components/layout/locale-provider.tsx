"use client"

import type React from "react"

import { useEffect } from "react"
import { useLocale } from "@/hooks/use-locale"
import { getDirection } from "@/lib/i18n"

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale()

  useEffect(() => {
    // Update HTML attributes for RTL support
    document.documentElement.lang = locale
    document.documentElement.dir = getDirection(locale)

    // Add Arabic font support
    if (locale === "ar") {
      document.documentElement.classList.add("font-arabic")
    } else {
      document.documentElement.classList.remove("font-arabic")
    }
  }, [locale])

  return <>{children}</>
}

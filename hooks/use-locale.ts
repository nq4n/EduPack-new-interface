'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { t as translate, type TranslationKey } from '@/lib/translations'
import type { Locale } from '@/lib/i18n'

// 1. Define the store state and actions
interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
}

// 2. Create the Zustand store for locale persistence
const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en', // Default locale
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'edupack-locale', // Name for localStorage persistence
    },
  ),
)

// 3. Create the public hook that combines state and the translation function
export function useLocale() {
  // Get the current locale and the setter from the store
  const { locale, setLocale } = useLocaleStore()

  // Create a translation function that's pre-bound to the current locale
  const t = (key: TranslationKey) => translate(locale, key)

  // Return the locale, setter, and the bound translation function
  return { locale, setLocale, t }
}

'use client'

import { useEffect } from 'react'
import { useLocale } from '@/hooks/use-locale'

export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { locale, direction } = useLocale()

  // This effect runs on the client and updates the <html> tag
  // whenever the language changes.
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = direction
  }, [locale, direction])

  return <>{children}</>
}
"use client"

import { useEffect, useState } from "react"

import { useSupabase } from "@/components/auth-provider"
import { getUserProfile } from "@/lib/user-profile"

import { ProfileLanguage, getProfileStrings, normalizeLanguage } from "./strings"

type UsePreferredLanguageResult = {
  language: ProfileLanguage
  strings: ReturnType<typeof getProfileStrings>
}

export function usePreferredLanguage(defaultLanguage: ProfileLanguage = "en") {
  const { user } = useSupabase()
  const [language, setLanguage] = useState<ProfileLanguage>(defaultLanguage)

  useEffect(() => {
    let isMounted = true

    async function loadLanguage() {
      if (!user) {
        setLanguage(defaultLanguage)
        return
      }

      const { data } = await getUserProfile(user.id)
      if (!isMounted) return

      setLanguage(normalizeLanguage(data?.preferred_language ?? defaultLanguage))
    }

    void loadLanguage()

    return () => {
      isMounted = false
    }
  }, [defaultLanguage, user])

  const strings = getProfileStrings(language)

  return { language, strings } satisfies UsePreferredLanguageResult
}

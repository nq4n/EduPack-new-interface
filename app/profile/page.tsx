"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, User } from "lucide-react"
import { toast } from "sonner"

import { useSupabase } from "@/components/auth-provider"
import { useLocale } from "@/hooks/use-locale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getUserProfile, updateUserProfile } from "@/lib/user-profile"

import { getProfileStrings, normalizeLanguage } from "./strings"

const languageOptions = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
]

type ProfileFormState = {
  fullName: string
  email: string
  preferredLanguage: string
}

export default function ProfilePage() {
  return <PersonalInfoPanel />
}

function PersonalInfoPanel() {
  const { user } = useSupabase()
  const router = useRouter()
  const { locale, setLocale } = useLocale()
  const strings = getProfileStrings(locale as "en" | "ar")
  const [form, setForm] = useState<ProfileFormState>({
    fullName: "",
    email: "",
    preferredLanguage: locale,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setForm((current) => ({
      ...current,
      preferredLanguage: locale,
    }))
  }, [locale])

  const isRTL = locale === "ar"

  const isLoggedOut = useMemo(() => !user, [user])

  const loadProfile = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    const { data: profile, error } = await getUserProfile(user.id)
    if (error) {
      setError(strings.overview.errorLoading)
    } else if (profile) {
      initializeForm(profile)
    }
    setLoading(false)
  }, [strings.overview.errorLoading, user])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const initializeForm = (profile: {
    full_name?: string | null
    email?: string | null
    preferred_language?: string | null
  }) => {
    setForm({
      fullName: profile.full_name ?? "",
      email: profile.email ?? user?.email ?? "",
      preferredLanguage: normalizeLanguage(profile.preferred_language ?? "en"),
    })
  }

  const handleInputChange =
    (field: keyof ProfileFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleSelectChange =
    (field: keyof ProfileFormState) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value
      setForm((current) => ({ ...current, [field]: value }))
      
      // If language is changed, update global locale immediately
      if (field === "preferredLanguage") {
        setLocale(value as "en" | "ar")
      }
    }

  const handleSave = async () => {
    if (!user) {
      setError(strings.overview.mustBeLoggedIn)
      return
    }

    setSaving(true)
    setError(null)

    // Update the selected language in global locale
    setLocale(normalizeLanguage(form.preferredLanguage || "en") as "en" | "ar")

    const { error } = await updateUserProfile(user.id, {
      full_name: form.fullName,
      preferred_language: normalizeLanguage(form.preferredLanguage || "en"),
    })

    setSaving(false)

    if (error) {
      setError(strings.overview.errorLoading)
      return
    }

    toast.success(strings.overview.profileUpdated)
    await loadProfile()
    router.refresh()
  }

  if (isLoggedOut) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          {strings.overview.signInHeading}
        </h2>
        <p className="text-muted-foreground">{strings.overview.signInMessage}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          {strings.overview.loadingHeading}
        </h2>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{strings.overview.loadingMessage}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {strings.overview.personalInfo}
        </h2>

        {/* Avatar */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-foreground mb-2">
            {strings.overview.profilePicture}
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <Button variant="outline" size="sm" disabled>
              {strings.overview.uploadPhoto}
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {strings.overview.fullName}
            </label>
            <Input
              value={form.fullName}
              onChange={handleInputChange("fullName")}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {strings.overview.email}
            </label>
            <Input
              value={form.email}
              type="email"
              disabled
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-foreground mb-2">
              {strings.overview.preferredLanguage}
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              value={form.preferredLanguage}
              onChange={handleSelectChange("preferredLanguage")}
              disabled={loading}
            >
              <option value="" disabled>
                {strings.overview.selectLanguage}
              </option>
              {(strings.overview.languageOptions ?? languageOptions).map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-sm text-destructive pt-2">{error}</p>}

        <div className="pt-6 flex justify-start">
          <Button onClick={handleSave} disabled={loading || saving}>
            {saving ? strings.overview.saving : strings.overview.saveChanges}
          </Button>
        </div>
      </div>
    </div>
  )
}

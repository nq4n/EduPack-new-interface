"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, User } from "lucide-react"
import { toast } from "sonner"

import { useSupabase } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getUserProfile, updateUserProfile } from "@/lib/user-profile"

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Arabic", value: "ar" },
]

const normalizeLanguage = (language: string) =>
  language?.toLowerCase().startsWith("ar") ? "ar" : "en"

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
  const [form, setForm] = useState<ProfileFormState>({
    fullName: "",
    email: "",
    preferredLanguage: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      setError("Could not load your profile. Please try again.")
    } else if (profile) {
      initializeForm(profile)
    }
    setLoading(false)
  }, [user])

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
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleSave = async () => {
    if (!user) {
      setError("You must be logged in to update your profile.")
      return
    }

    setSaving(true)
    setError(null)

    const { error } = await updateUserProfile(user.id, {
      full_name: form.fullName,
      preferred_language: normalizeLanguage(form.preferredLanguage || "en"),
    })

    setSaving(false)

    if (error) {
      setError("Failed to save your changes. Please try again.")
      return
    }

    toast.success("Profile updated")
    await loadProfile()
    router.refresh()
  }

  if (isLoggedOut) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Profile</h2>
        <p className="text-muted-foreground">
          Please sign in to view your profile.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Profile</h2>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Syncing your profile with the database...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Personal Information
        </h2>

        {/* Avatar */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <Button variant="outline" size="sm" disabled>
              Upload Photo
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Full Name
            </label>
            <Input
              value={form.fullName}
              onChange={handleInputChange("fullName")}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Email
            </label>
            <Input value={form.email} type="email" disabled />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Preferred Language
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              value={form.preferredLanguage}
              onChange={handleSelectChange("preferredLanguage")}
              disabled={loading}
            >
              <option value="" disabled>
                Select a language
              </option>
              {languageOptions.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-sm text-destructive pt-2">{error}</p>}

        <div className="pt-6">
          <Button onClick={handleSave} disabled={loading || saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}

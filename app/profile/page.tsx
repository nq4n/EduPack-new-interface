"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, User } from "lucide-react"
import { toast } from "sonner"

import { useSupabase } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const roleOptions = ["Teacher", "Student", "EdTech Professional", "Other"]
const countryOptions = ["United States", "United Kingdom", "Canada", "Australia"]
const languageOptions = ["English", "Arabic", "Spanish"]

type ProfileFormState = {
  fullName: string
  email: string
  role: string
  country: string
  preferredLanguage: string
}

export default function ProfilePage() {
  return <PersonalInfoPanel />
}

function PersonalInfoPanel() {
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const [form, setForm] = useState<ProfileFormState>({
    fullName: "",
    email: "",
    role: "",
    country: "",
    preferredLanguage: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isLoggedOut = useMemo(() => !user, [user])

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from("users")
      .select(
        "user_id, full_name, email, role, country, preferred_language, avatar_url"
      )
      .eq("user_id", user.id)
      .single()

    if (error && error.code !== "PGRST116") {
      setError("Could not load your profile. Please try again.")
      setLoading(false)
      return
    }

    if (!data) {
      const { data: newProfile, error: insertError } = await supabase
        .from("users")
        .upsert({
          user_id: user.id,
          full_name: user.user_metadata?.full_name ?? "",
          email: user.email,
          preferred_language: user.user_metadata?.preferred_language ?? "English",
          avatar_url: user.user_metadata?.avatar_url ?? null,
        })
        .select()
        .single()

      if (insertError) {
        setError("Could not create your profile. Please try again.")
        setLoading(false)
        return
      }

      initializeForm(newProfile)
      setLoading(false)
      return
    }

    initializeForm(data)
    setLoading(false)
  }, [supabase, user])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const initializeForm = (profile: {
    full_name?: string | null
    email?: string | null
    role?: string | null
    country?: string | null
    preferred_language?: string | null
  }) => {
    setForm({
      fullName: profile.full_name ?? "",
      email: profile.email ?? user?.email ?? "",
      role: profile.role ?? "",
      country: profile.country ?? "",
      preferredLanguage: profile.preferred_language ?? "",
    })
  }

  const handleInputChange = (field: keyof ProfileFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleSelectChange = (field: keyof ProfileFormState) =>
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

    const { error } = await supabase
      .from("users")
      .upsert({
        user_id: user.id,
        full_name: form.fullName,
        email: form.email || user.email,
        role: form.role || null,
        country: form.country || null,
        preferred_language: form.preferredLanguage || null,
        avatar_url: user.user_metadata?.avatar_url ?? null,
      })

    setSaving(false)

    if (error) {
      setError("Failed to save your changes. Please try again.")
      return
    }

    toast.success("Profile updated")
    await fetchProfile()
    router.refresh()
  }

  if (isLoggedOut) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Profile</h2>
        <p className="text-muted-foreground">Please sign in to view your profile.</p>
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
        <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>

        {/* Avatar */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-foreground mb-2">Profile Picture</label>
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
            <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
            <Input
              value={form.fullName}
              onChange={handleInputChange("fullName")}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <Input value={form.email} type="email" disabled />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Role</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              value={form.role}
              onChange={handleSelectChange("role")}
              disabled={loading}
            >
              <option value="" disabled>
                Select a role
              </option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Country</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              value={form.country}
              onChange={handleSelectChange("country")}
              disabled={loading}
            >
              <option value="" disabled>
                Select a country
              </option>
              {countryOptions.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-foreground mb-2">Preferred Language</label>
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
                <option key={language} value={language}>
                  {language}
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

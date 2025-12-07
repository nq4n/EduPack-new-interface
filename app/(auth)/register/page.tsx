"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/auth-provider"
import { getAuthCallbackUrl } from "@/lib/get-auth-callback-url"

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [preferredLanguage, setPreferredLanguage] = useState("en")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const router = useRouter()
  const { supabase } = useSupabase()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setIsSubmitting(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setIsSubmitting(false)
      return
    }

    const callbackUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/api/auth/callback?next=/`
        : undefined

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          preferred_language: preferredLanguage,
        },
        emailRedirectTo: callbackUrl,
      },
    })

    if (error) {
      setError(error.message)
      setIsSubmitting(false)
      return
    }

    if (data?.session) {
      // User immediately confirmed (auto-confirmed in development)
      // Redirect to home
      router.push("/")
      router.refresh()
      setIsSubmitting(false)
      return
    }

    setMessage("Registration successful! Please check your email to confirm your account.")
    setIsSubmitting(false)
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setIsGoogleLoading(true)

    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getAuthCallbackUrl()}?next=/`,
      },
    })

    if (googleError) {
      setError(googleError.message)
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold text-primary">EduPack</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground">Start creating SCORM packages today</p>
        </div>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        {message && <p className="mb-4 text-center text-green-500">{message}</p>}

        <div className="bg-card rounded-2xl border border-border p-8">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
              <Input
                placeholder="ALi Al Badri"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Preferred Language</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                required
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 h-4 w-4" />
              <label className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">or continue with</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full mt-4 bg-transparent"
              disabled={isGoogleLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.7 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


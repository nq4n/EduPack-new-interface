"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { signInWithPassword, signInWithGoogle } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    const { error: signInError } = await signInWithPassword(email, password)

    if (signInError) {
      setError(signInError.message)
      setIsSubmitting(false)
      return
    }

    router.push("/")
    router.refresh()
    setIsSubmitting(false)
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setIsGoogleLoading(true)

    const { error: googleError } = await signInWithGoogle()

    if (googleError) {
      setError(googleError.message)
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to continue to EduPack</p>
        </div>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <div className="bg-card rounded-2xl border border-border p-8">
          <form onSubmit={handleLogin} className="space-y-6">
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

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full bg-transparent"
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
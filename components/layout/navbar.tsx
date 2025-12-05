"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { t } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"
import { supabase } from "@/lib/supabaseClient"
import type { Session } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const { locale } = useLocale()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const getInitials = (email = "") => email.charAt(0).toUpperCase()

  return (
      <nav
        id="main-navbar"
        className="bg-white border-b border-border sticky top-0 z-50"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-primary">EduPack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              {t(locale, "nav.home")}
            </Link>
            <Link href="/scorm-ai" className="text-foreground hover:text-primary transition-colors">
              {t(locale, "nav.scorm-ai")}
            </Link>
            <Link href="/packages" className="text-foreground hover:text-primary transition-colors">
              {t(locale, "nav.shop")}
            </Link>
            <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">
              {t(locale, "nav.pricing")}
            </Link>
            <Link href="/features" className="text-foreground hover:text-primary transition-colors">
              {t(locale, "nav.features")}
            </Link>
            <Link href="/resources" className="text-foreground hover:text-primary transition-colors">
              {t(locale, "nav.resources")}
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.user_metadata.avatar_url} alt={session.user.email} />
                      <AvatarFallback>{getInitials(session.user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">{t(locale, "nav.login")}</Button>
                </Link>
                <Link href="/register">
                  <Button>{t(locale, "nav.register")}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-foreground hover:text-primary">
              {t(locale, "nav.home")}
            </Link>
            <Link href="/scorm-ai" className="block text-foreground hover:text-primary">
              {t(locale, "nav.scorm-ai")}
            </Link>
            <Link href="/packages" className="block text-foreground hover:text-primary">
              {t(locale, "nav.shop")}
            </Link>
            <Link href="/pricing" className="block text-foreground hover:text-primary">
              {t(locale, "nav.pricing")}
            </Link>
            <Link href="/features" className="block text-foreground hover:text-primary">
              {t(locale, "nav.features")}
            </Link>
            <Link href="/resources" className="block text-foreground hover:text-primary">
              {t(locale, "nav.resources")}
            </Link>
            {!session && (
              <div className="flex gap-2 pt-4">
                <Link href="/login" className="flex-1">
                  <Button variant="ghost" className="w-full">
                    {t(locale, "nav.login")}
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full">{t(locale, "nav.register")}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
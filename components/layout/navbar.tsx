"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { t } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeToggle } from "./theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSupabase } from "../auth-provider"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { locale } = useLocale()
  const router = useRouter()
  const { supabase, user } = useSupabase()

  const navLinks = useMemo(
    () => [
      { href: "/", label: t(locale, "nav.home") },
      { href: "/scorm-ai", label: t(locale, "nav.scorm-ai") },
      { href: "/packages", label: t(locale, "nav.shop") },
      { href: "/pricing", label: t(locale, "nav.pricing") },
      { href: "/features", label: t(locale, "nav.features") },
      { href: "/resources", label: t(locale, "nav.resources") },
    ],
    [locale],
  )

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const getInitials = (email = "") => email.charAt(0).toUpperCase()

  return (
    <nav
      id="main-navbar"
      className="bg-white dark:bg-slate-950 border-b border-border sticky top-0 z-50 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/edupack-logo.svg"
              alt="EduPack logo"
              width={36}
              height={36}
              priority
            />
            <span className="text-xl font-bold text-primary">EduPack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || "User avatar"} />
                      <AvatarFallback>{getInitials(user.email ?? "")}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
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
        <div className="md:hidden bg-white dark:bg-slate-950 transition-colors">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 items-center border-t border-border">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            {!user && (
              <div className="flex gap-2 pt-4">
                <Link href="/login" className="flex-1">
                  <Button variant="ghost" className="w-full" onClick={() => setIsOpen(false)}>
                    {t(locale, "nav.login")}
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full" onClick={() => setIsOpen(false)}>{t(locale, "nav.register")}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
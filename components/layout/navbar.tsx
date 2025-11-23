"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { t } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { locale } = useLocale()

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
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
            <Link href="/shop" className="text-foreground hover:text-primary transition-colors">
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
            <Link href="/login">
              <Button variant="ghost">{t(locale, "nav.login")}</Button>
            </Link>
            <Link href="/register">
              <Button>{t(locale, "nav.register")}</Button>
            </Link>
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
            <Link href="/shop" className="block text-foreground hover:text-primary">
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
          </div>
        </div>
      )}
    </nav>
  )
}

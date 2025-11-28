"use client"

import Link from "next/link"
import { useLocale } from "@/hooks/use-locale"
import { t } from "@/lib/translations"

export function Footer() {
  const { locale } = useLocale()

  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-primary">EduPack</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t(locale, "hero.title")}</p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t(locale, "footer.product")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sm text-muted-foreground hover:text-primary">
                  {t(locale, "nav.features")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">
                  {t(locale, "nav.pricing")}
                </Link>
              </li>
              <li>
                <Link href="/scorm-ai" className="text-sm text-muted-foreground hover:text-primary">
                  {t(locale, "nav.scorm-ai")}
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-sm text-muted-foreground hover:text-primary">
                  {t(locale, "nav.shop")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t(locale, "footer.support")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-sm text-muted-foreground hover:text-primary">
                  {t(locale, "nav.resources")}
                </Link>
              </li>
              <li>
                <Link href="/resources#help" className="text-sm text-muted-foreground hover:text-primary">
                  {t(locale, "footer.help")}
                </Link>
              </li>
              <li>
                <Link href="/resources#contact" className="text-sm text-muted-foreground hover:text-primary">
                  {t(locale, "footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t(locale, "footer.company")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  {t(locale, "nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  {t(locale, "nav.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  {t(locale, "nav.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">© 2025 EduPack. {t(locale, "footer.rights")}</p>
        </div>
      </div>
    </footer>
  )
}

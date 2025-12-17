"use client"

import Link from "next/link"
import { useLocale } from "@/hooks/use-locale"

export default function HelpCenterPage() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{t("help.title")}</h1>
        <p className="text-muted-foreground mb-10">
          {t("help.description")}
        </p>

        <div className="grid gap-6">
          <Link href="/docs/scorm" className="block bg-card border rounded-xl p-6 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-1">{t("help.scormBasics")}</h2>
            <p className="text-muted-foreground">{t("help.scormBasicsDesc")}</p>
          </Link>

          <Link href="/docs/best-practices" className="block bg-card border rounded-xl p-6 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-1">{t("help.bestPractices")}</h2>
            <p className="text-muted-foreground">{t("help.bestPracticesDesc")}</p>
          </Link>

          <Link href="/support" className="block bg-card border rounded-xl p-6 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-1">{t("help.support")}</h2>
            <p className="text-muted-foreground">{t("help.supportDesc")}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

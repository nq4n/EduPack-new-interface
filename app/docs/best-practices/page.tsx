"use client"

import { useLocale } from "@/hooks/use-locale"

export default function BestPracticesPage() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{t("docs.bestPractices.title")}</h1>
        <p className="text-muted-foreground mb-10">
          {t("docs.bestPractices.intro")}
        </p>

        <div className="grid gap-6">
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">1) {t("docs.bestPractices.tip1")}</h2>
            <p className="text-muted-foreground">
              {t("docs.bestPractices.tip1Desc")}
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">2) {t("docs.bestPractices.tip2")}</h2>
            <p className="text-muted-foreground">
              {t("docs.bestPractices.tip2Desc")}
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">3) {t("docs.bestPractices.tip3")}</h2>
            <p className="text-muted-foreground">
              {t("docs.bestPractices.tip3Desc")}
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">4) {t("docs.bestPractices.tip4")}</h2>
            <p className="text-muted-foreground">
              {t("docs.bestPractices.tip4Desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

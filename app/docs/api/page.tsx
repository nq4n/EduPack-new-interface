"use client"

import { useLocale } from "@/hooks/use-locale"

export default function ApiDocsPage() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{t("docs.api.title")}</h1>
        <p className="text-muted-foreground mb-10">
          {t("docs.api.intro")}
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold">{t("docs.api.auth")}</h2>
          <div className="bg-card border rounded-xl p-5">
            <p className="text-muted-foreground">
              {t("docs.api.authDesc")}
            </p>
          </div>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold">{t("docs.api.endpoints")}</h2>
          <div className="bg-card border rounded-xl p-5 space-y-3">
            <div>
              <div className="font-mono text-sm">GET /api/projects</div>
              <div className="text-muted-foreground text-sm">{t("resources.project.ai.title")}</div>
            </div>
            <div>
              <div className="font-mono text-sm">POST /api/projects</div>
              <div className="text-muted-foreground text-sm">إنشاء مشروع</div>
            </div>
            <div>
              <div className="font-mono text-sm">POST /api/export/scorm</div>
              <div className="text-muted-foreground text-sm">تصدير zip SCORM</div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Webhooks (اختياري)</h2>
          <div className="bg-card border rounded-xl p-5">
            <p className="text-muted-foreground">
              {t("docs.api.webhooksDesc")}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

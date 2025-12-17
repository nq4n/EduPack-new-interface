"use client"

import { useLocale } from "@/hooks/use-locale"

export default function ScormReferencePage() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{t("docs.scorm.title")}</h1>
        <p className="text-muted-foreground mb-10">
          {t("docs.scorm.intro")}
        </p>

        <div className="grid gap-6">
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">{t("docs.scorm.version12")}</h2>
            <p className="text-muted-foreground">
              {t("docs.scorm.version12Desc")}
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">{t("docs.scorm.version2004")}</h2>
            <p className="text-muted-foreground">
              {t("docs.scorm.version2004Desc")}
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">{t("docs.scorm.manifest")}</h2>
            <p className="text-muted-foreground">
              {t("docs.scorm.manifestDesc")}
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">EduPack {t("docs.scorm.export")}</h2>
            <p className="text-muted-foreground">
              {t("docs.scorm.exportDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

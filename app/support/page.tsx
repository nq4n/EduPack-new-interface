"use client"

import { useLocale } from "@/hooks/use-locale"

export default function SupportDeskPage() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{t("support.title")}</h1>
        <p className="text-muted-foreground mb-10">
          {t("support.intro")}
        </p>

        <div className="grid gap-6">
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">{t("support.email")}</h2>
            <p className="text-muted-foreground">{t("support.emailValue")}</p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">{t("support.liveChat")}</h2>
            <p className="text-muted-foreground">
              {t("support.liveChatDesc")}
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">{t("support.tickets")}</h2>
            <p className="text-muted-foreground">
              {t("support.ticketsDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

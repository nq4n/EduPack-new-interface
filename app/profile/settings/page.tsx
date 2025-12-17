"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

import { useLocale } from "@/hooks/use-locale"
import { getProfileStrings } from "../strings"

export default function SettingsPage() {
  const { locale } = useLocale()
  const strings = getProfileStrings(locale as "en" | "ar")
  const isRTL = locale === "ar"

  return (
    <div className={`space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
      <div>
        <h2 className={`text-2xl font-bold text-foreground mb-6 ${isRTL ? "text-right" : "text-left"}`}>
          {strings.settings.heading}
        </h2>

        {/* Notifications */}
        <div className="space-y-4 mb-8">
          <h3 className={`text-lg font-semibold text-foreground ${isRTL ? "text-right" : "text-left"}`}>
            {strings.settings.notifications}
          </h3>
          <div className="space-y-3">
            <label className={`flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="font-medium text-foreground">
                  {strings.settings.emailNotifications}
                </div>
                <div className="text-sm text-muted-foreground">
                  {strings.settings.emailNotificationsHint}
                </div>
              </div>
              <input type="checkbox" defaultChecked className={`h-4 w-4 ${isRTL ? "ml-4" : "ml-4"}`} />
            </label>
            <label className={`flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="font-medium text-foreground">
                  {strings.settings.marketingEmails}
                </div>
                <div className="text-sm text-muted-foreground">
                  {strings.settings.marketingEmailsHint}
                </div>
              </div>
              <input type="checkbox" className={`h-4 w-4 ${isRTL ? "ml-4" : "ml-4"}`} />
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`border border-destructive/30 rounded-xl p-6 bg-destructive/5 ${isRTL ? "text-right" : "text-left"}`}>
          <h3 className={`text-lg font-semibold text-destructive mb-2 ${isRTL ? "text-right" : "text-left"}`}>
            {strings.settings.dangerZone}
          </h3>
          <p className={`text-sm text-muted-foreground mb-4 ${isRTL ? "text-right" : "text-left"}`}>
            {strings.settings.dangerZoneHint}
          </p>
          <Button variant="destructive">
            <Trash2 className={`${isRTL ? "ml-2" : "mr-2"} h-4 w-4`} />
            {strings.settings.deleteAccount}
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

import { usePreferredLanguage } from "../use-preferred-language"

export default function SettingsPage() {
  const { strings } = usePreferredLanguage()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {strings.settings.heading}
        </h2>

        {/* Notifications */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-foreground">
            {strings.settings.notifications}
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer">
              <div>
                <div className="font-medium text-foreground">
                  {strings.settings.emailNotifications}
                </div>
                <div className="text-sm text-muted-foreground">
                  {strings.settings.emailNotificationsHint}
                </div>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer">
              <div>
                <div className="font-medium text-foreground">
                  {strings.settings.marketingEmails}
                </div>
                <div className="text-sm text-muted-foreground">
                  {strings.settings.marketingEmailsHint}
                </div>
              </div>
              <input type="checkbox" className="h-4 w-4" />
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-destructive/30 rounded-xl p-6 bg-destructive/5">
          <h3 className="text-lg font-semibold text-destructive mb-2">
            {strings.settings.dangerZone}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {strings.settings.dangerZoneHint}
          </p>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            {strings.settings.deleteAccount}
          </Button>
        </div>
      </div>
    </div>
  )
}

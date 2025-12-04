"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Account Settings</h2>

        {/* Notifications */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer">
              <div>
                <div className="font-medium text-foreground">Email notifications</div>
                <div className="text-sm text-muted-foreground">Receive updates about your account</div>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer">
              <div>
                <div className="font-medium text-foreground">Marketing emails</div>
                <div className="text-sm text-muted-foreground">Receive tips and promotional offers</div>
              </div>
              <input type="checkbox" className="h-4 w-4" />
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-destructive/30 rounded-xl p-6 bg-destructive/5">
          <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}

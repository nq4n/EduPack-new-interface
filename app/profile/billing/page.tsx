"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Subscription & Billing</h2>

        {/* Current Plan */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Free Plan</h3>
              <p className="text-sm text-muted-foreground">10 trial credits remaining</p>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
          <Button>Upgrade Plan</Button>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
          <p className="text-sm text-muted-foreground mb-4">No payment method on file</p>
          <Button variant="outline">Add Payment Method</Button>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Invoices</h3>
        <p className="text-sm text-muted-foreground">No invoices available</p>
      </div>
    </div>
  )
}

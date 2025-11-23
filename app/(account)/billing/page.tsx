"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

export default function BillingPage() {
  const { t } = useLocale()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">{t("account.billing.title")}</h1>
        <p className="text-muted-foreground mt-2">{t("account.billing.description")}</p>
      </div>

      {/* Current Plan */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Professional Plan</h3>
            <p className="text-muted-foreground mt-1">500 credits per month</p>
            <p className="text-sm text-muted-foreground mt-2">Next billing date: January 15, 2025</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">$29.99</div>
            <p className="text-sm text-muted-foreground">per month</p>
            <Badge className="mt-2">Active</Badge>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="outline">Change Plan</Button>
          <Button variant="outline">Cancel Subscription</Button>
        </div>
      </Card>

      {/* Credits Balance */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Credits Balance</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-3xl font-bold text-primary">325</div>
            <p className="text-sm text-muted-foreground mt-1">Available Credits</p>
          </div>
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-3xl font-bold">175</div>
            <p className="text-sm text-muted-foreground mt-1">Used This Month</p>
          </div>
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-3xl font-bold">500</div>
            <p className="text-sm text-muted-foreground mt-1">Monthly Allowance</p>
          </div>
        </div>
        <Button className="mt-4">Buy More Credits</Button>
      </Card>

      {/* Payment Method */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <CreditCard className="w-8 h-8 text-primary" />
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/2025</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>
      </Card>

      {/* Billing History */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: "Dec 15, 2024", amount: "$29.99", status: "Paid" },
            { date: "Nov 15, 2024", amount: "$29.99", status: "Paid" },
            { date: "Oct 15, 2024", amount: "$29.99", status: "Paid" },
          ].map((invoice, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{invoice.date}</p>
                <p className="text-sm text-muted-foreground">Professional Plan</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">{invoice.amount}</span>
                <Badge variant="secondary">{invoice.status}</Badge>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

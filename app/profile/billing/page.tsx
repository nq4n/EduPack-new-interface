"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useSupabase } from "@/components/auth-provider"
import { getUserSubscription, getUserCredits } from "@/lib/profile-data"

type BillingData = {
  subscription: any | null
  credits: number
}

export default function BillingPage() {
  const { user } = useSupabase()
  const [billing, setBilling] = useState<BillingData>({
    subscription: null,
    credits: 0,
  })
  const [loading, setLoading] = useState(true)

  const loadBillingData = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const [subResult, creditsResult] = await Promise.all([
        getUserSubscription(user.id),
        getUserCredits(user.id),
      ])

      setBilling({
        subscription: subResult.data,
        credits: creditsResult.balance,
      })
    } catch (error) {
      toast.error("Failed to load billing information")
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadBillingData()
  }, [loadBillingData])

  if (loading) {
    return <div className="text-center py-12">Loading billing information...</div>
  }

  const planStatus = billing.subscription ? "Active" : "Free"
  const planName = billing.subscription?.notes || "Free Plan"

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Subscription & Billing</h2>

        {/* Current Plan */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{planName}</h3>
              <p className="text-sm text-muted-foreground">{billing.credits} credits available</p>
            </div>
            <Badge variant={planStatus === "Active" ? "default" : "secondary"}>
              {planStatus}
            </Badge>
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
        <p className="text-sm text-muted-foreground">
          {billing.subscription ? "Loading invoices..." : "No invoices available"}
        </p>
      </div>
    </div>
  )

  }


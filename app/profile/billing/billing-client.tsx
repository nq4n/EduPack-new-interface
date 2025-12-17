"use client"

import { useLocale } from "@/hooks/use-locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getProfileStrings } from "../strings"

interface BillingClientProps {
  subscription: any
  credits: number
  planName: string
  planStatus: string
}

export function BillingClient({ subscription, credits, planName, planStatus }: BillingClientProps) {
  const { locale } = useLocale()
  const strings = getProfileStrings(locale as "en" | "ar")
  const isRTL = locale === "ar"
  const direction = isRTL ? "rtl" : "ltr"

  return (
    <div dir={direction} className={`space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
      <h2 className={`text-2xl font-bold text-foreground mb-6 ${isRTL ? "text-right" : "text-left"}`}>{strings.billing.heading}</h2>

      {/* Current Plan */}
      <div className={`bg-accent/10 border border-accent/30 rounded-xl p-6 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
        <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""} justify-between mb-4`}>
          <div className={isRTL ? "text-right" : "text-left"}>
            <h3 className={`text-lg font-semibold text-foreground ${isRTL ? "text-right" : "text-left"}`}>{planName}</h3>
            <p className={`text-sm text-muted-foreground ${isRTL ? "text-right" : "text-left"}`}>
              {strings.billing.creditsLabel(credits)}
            </p>
          </div>

          <Badge variant={subscription ? "default" : "secondary"}>
            {planStatus}
          </Badge>
        </div>

        <Button>{strings.billing.upgradePlan}</Button>
      </div>

      {/* Payment Method */}
      <div className={isRTL ? "text-right" : "text-left"}>
        <h3 className={`text-lg font-semibold text-foreground mb-4 ${isRTL ? "text-right" : "text-left"}`}>
          {strings.billing.paymentMethod}
        </h3>
        <p className={`text-sm text-muted-foreground mb-4 ${isRTL ? "text-right" : "text-left"}`}>
          {strings.billing.noPaymentMethod}
        </p>
        <Button variant="outline">{strings.billing.addPaymentMethod}</Button>
      </div>

      {/* Invoices */}
      <div className={isRTL ? "text-right" : "text-left"}>
        <h3 className={`text-lg font-semibold text-foreground mb-4 ${isRTL ? "text-right" : "text-left"}`}>{strings.billing.invoices}</h3>
        <p className={`text-sm text-muted-foreground ${isRTL ? "text-right" : "text-left"}`}>
          {subscription ? strings.billing.loadingInvoices : strings.billing.noInvoices}
        </p>
      </div>
    </div>
  )
}

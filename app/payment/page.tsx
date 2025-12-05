"use client"

import Link from "next/link"
import { ArrowLeft, ShieldCheck, ShoppingBag, Timer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { t } from "@/lib/translations"

export default function PaymentPage() {
  const { locale } = useLocale()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          <Link href="/packages" className="hover:text-primary transition-colors">
            {t(locale, "payment.back")}
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t(locale, "payment.title")}</h1>
              <p className="text-muted-foreground">{t(locale, "payment.subtitle")}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {t(locale, "payment.status.title")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t(locale, "payment.status.desc")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border p-4 bg-muted/40">
                <Timer className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t(locale, "payment.progress")}</p>
                  <p className="text-xs text-muted-foreground">{t(locale, "payment.progress.desc")}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-semibold text-foreground">{t(locale, "payment.support.title")}</h2>
              <p className="text-sm text-muted-foreground">{t(locale, "payment.support.desc")}</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-foreground">{t(locale, "payment.summary.title")}</h2>
            <p className="text-sm text-muted-foreground">{t(locale, "payment.summary.desc")}</p>

            <div className="border border-dashed border-border rounded-lg p-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>{t(locale, "payment.summary.item")}</span>
                <span>{t(locale, "payment.summary.price")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t(locale, "payment.summary.tax")}</span>
                <span>{t(locale, "payment.summary.taxValue")}</span>
              </div>
              <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border">
                <span>{t(locale, "payment.summary.total")}</span>
                <span>{t(locale, "payment.summary.totalValue")}</span>
              </div>
            </div>

            <Button className="w-full" variant="outline" asChild>
              <Link href="/checkout">{t(locale, "payment.cta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

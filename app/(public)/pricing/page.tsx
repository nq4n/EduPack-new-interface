"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/hooks/use-locale"

export default function PricingPage() {
  const [billingType, setBillingType] = useState<"credits" | "subscribe">("credits")
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('pricing.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.description')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingType("credits")}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              billingType === "credits"
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t('pricing.tabs.credits')}
          </button>
          <button
            onClick={() => setBillingType("subscribe")}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              billingType === "subscribe"
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t('pricing.tabs.subscribe')}
          </button>
        </div>

        {/* Pricing Cards */}
        {billingType === "credits" ? (
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title={t('pricing.credits.starter.title')}
              credits={t('pricing.credits.starter.credits')}
              price={t('pricing.credits.starter.price')}
              description={t('pricing.credits.starter.description')}
              features={[
                t('pricing.credits.starter.feature1'),
                t('pricing.credits.starter.feature2'),
                t('pricing.credits.starter.feature3'),
                t('pricing.credits.starter.feature4'),
              ]}
              cta={t('pricing.credits.starter.cta')}
            />
            <PricingCard
              title={t('pricing.credits.teacher.title')}
              credits={t('pricing.credits.teacher.credits')}
              price={t('pricing.credits.teacher.price')}
              description={t('pricing.credits.teacher.description')}
              features={[
                t('pricing.credits.teacher.feature1'),
                t('pricing.credits.teacher.feature2'),
                t('pricing.credits.teacher.feature3'),
                t('pricing.credits.teacher.feature4'),
                t('pricing.credits.teacher.feature5'),
              ]}
              highlighted
              cta={t('pricing.credits.teacher.cta')}
            />
            <PricingCard
              title={t('pricing.credits.team.title')}
              credits={t('pricing.credits.team.credits')}
              price={t('pricing.credits.team.price')}
              description={t('pricing.credits.team.description')}
              features={[
                t('pricing.credits.team.feature1'),
                t('pricing.credits.team.feature2'),
                t('pricing.credits.team.feature3'),
                t('pricing.credits.team.feature4'),
                t('pricing.credits.team.feature5'),
                t('pricing.credits.team.feature6'),
              ]}
              cta={t('pricing.credits.team.cta')}
            />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title={t('pricing.subscribe.monthly.title')}
              subtitle={t('pricing.subscribe.monthly.subtitle')}
              price={t('pricing.subscribe.monthly.price')}
              period={t('pricing.subscribe.monthly.period')}
              description={t('pricing.subscribe.monthly.description')}
              features={[
                t('pricing.subscribe.monthly.feature1'),
                t('pricing.subscribe.monthly.feature2'),
                t('pricing.subscribe.monthly.feature3'),
                t('pricing.subscribe.monthly.feature4'),
                t('pricing.subscribe.monthly.feature5'),
              ]}
              cta={t('pricing.subscribe.monthly.cta')}
            />
            <PricingCard
              title={t('pricing.subscribe.semester.title')}
              subtitle={t('pricing.subscribe.semester.subtitle')}
              price={t('pricing.subscribe.semester.price')}
              period={t('pricing.subscribe.semester.period')}
              description={t('pricing.subscribe.semester.description')}
              features={[
                t('pricing.subscribe.semester.feature1'),
                t('pricing.subscribe.semester.feature2'),
                t('pricing.subscribe.semester.feature3'),
                t('pricing.subscribe.semester.feature4'),
              ]}
              highlighted
              cta={t('pricing.subscribe.semester.cta')}
            />
            <PricingCard
              title={t('pricing.subscribe.yearly.title')}
              subtitle={t('pricing.subscribe.yearly.subtitle')}
              price={t('pricing.subscribe.yearly.price')}
              period={t('pricing.subscribe.yearly.period')}
              description={t('pricing.subscribe.yearly.description')}
              features={[
                t('pricing.subscribe.yearly.feature1'),
                t('pricing.subscribe.yearly.feature2'),
                t('pricing.subscribe.yearly.feature3'),
                t('pricing.subscribe.yearly.feature4'),
                t('pricing.subscribe.yearly.feature5'),
              ]}
              cta={t('pricing.subscribe.yearly.cta')}
            />
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">{t('pricing.faq.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FAQItem
              question={t('pricing.faq.q1')}
              answer={t('pricing.faq.a1')}
            />
            <FAQItem
              question={t('pricing.faq.q2')}
              answer={t('pricing.faq.a2')}
            />
            <FAQItem
              question={t('pricing.faq.q3')}
              answer={t('pricing.faq.a3')}
            />
            <FAQItem
              question={t('pricing.faq.q4')}
              answer={t('pricing.faq.a4')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface PricingCardProps {
  title: string
  subtitle?: string
  credits?: string
  price: string
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

function PricingCard({
  title,
  subtitle,
  credits,
  price,
  period,
  description,
  features,
  highlighted,
  cta,
}: PricingCardProps) {
  return (
    <div
      className={`bg-card rounded-2xl border-2 p-8 flex flex-col ${
        highlighted ? "border-primary shadow-xl scale-105" : "border-border"
      }`}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        {credits && <p className="text-sm text-primary font-semibold">{credits}</p>}
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold text-foreground">{price}</span>
          {period && <span className="text-muted-foreground">{period}</span>}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href="/checkout">
        <Button className="w-full" variant={highlighted ? "default" : "outline"} size="lg">
          {cta}
        </Button>
      </Link>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}

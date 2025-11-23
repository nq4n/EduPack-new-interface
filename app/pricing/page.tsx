"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [billingType, setBillingType] = useState<"credits" | "subscribe">("credits")

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you need credits for occasional use or a subscription for regular content creation, we have flexible
            options for everyone.
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
            Credits
          </button>
          <button
            onClick={() => setBillingType("subscribe")}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              billingType === "subscribe"
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Subscribe
          </button>
        </div>

        {/* Pricing Cards */}
        {billingType === "credits" ? (
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              credits="50 Credits"
              price="$9"
              description="Perfect for trying out EduPack"
              features={[
                "Create up to 5 packages",
                "SCORM 1.2 & 2004 export",
                "Basic AI assistance",
                "Community support",
              ]}
              cta="Choose Starter"
            />
            <PricingCard
              title="Teacher"
              credits="200 Credits"
              price="$29"
              description="Best for individual educators"
              features={[
                "Create up to 20 packages",
                "All SCORM formats + xAPI",
                "Advanced AI features",
                "Priority email support",
                "Custom branding",
              ]}
              highlighted
              cta="Choose Teacher"
            />
            <PricingCard
              title="Team"
              credits="500 Credits"
              price="$59"
              description="For schools and institutions"
              features={[
                "Create up to 50 packages",
                "All SCORM formats + xAPI",
                "Premium AI features",
                "Priority phone support",
                "Team collaboration",
                "Analytics dashboard",
              ]}
              cta="Choose Team"
            />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Monthly"
              subtitle="Billed monthly"
              price="$19"
              period="/month"
              description="Flexible month-to-month billing"
              features={[
                "Unlimited packages",
                "All SCORM formats",
                "Full AI assistance",
                "Priority support",
                "Cancel anytime",
              ]}
              cta="Start Monthly"
            />
            <PricingCard
              title="Semester"
              subtitle="Billed every 6 months"
              price="$89"
              period="/6 months"
              description="Save 20% with semester billing"
              features={["Everything in Monthly", "Save $25 per semester", "Extended storage", "Advanced analytics"]}
              highlighted
              cta="Start Semester"
            />
            <PricingCard
              title="Yearly"
              subtitle="Billed annually"
              price="$149"
              period="/year"
              description="Best value - save 35%"
              features={[
                "Everything in Semester",
                "Save $79 per year",
                "Premium templates",
                "Dedicated account manager",
                "Custom integrations",
              ]}
              cta="Start Yearly"
            />
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FAQItem
              question="What's the difference between credits and subscriptions?"
              answer="Credits are one-time purchases for occasional use, while subscriptions give you unlimited access for a recurring fee."
            />
            <FAQItem
              question="Can I upgrade or downgrade my plan?"
              answer="Yes! You can change your plan at any time. Credits never expire, and subscriptions can be upgraded immediately."
            />
            <FAQItem
              question="Do you offer refunds?"
              answer="We offer a 30-day money-back guarantee on all plans. If you're not satisfied, contact us for a full refund."
            />
            <FAQItem
              question="Is there a free trial?"
              answer="Yes! All new users get 10 free trial credits to explore EduPack's features before committing to a plan."
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

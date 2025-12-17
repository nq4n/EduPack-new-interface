'use client'

import type React from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Layout, Download, Users, BarChart3, Languages, Zap, DollarSign, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/hooks/use-locale"

export default function FeaturesPage() {
  const { t, locale } = useLocale()
  const isRTL = locale === "ar"

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">{t('features.hero.title')}</h1>
          <p className={`text-xl text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('features.hero.description')}
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">{t('features.comparison.title')}</h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className={`px-6 py-4 text-sm font-semibold text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>{t('features.comparison.feature')}</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                    {t('features.comparison.traditional')}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary">{t('features.comparison.edupack')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <ComparisonRow feature={t('features.comparison.price.feature')} traditional={t('features.comparison.price.traditional')} edupack={t('features.comparison.price.edupack')} isRTL={isRTL} />
                <ComparisonRow feature={t('features.comparison.curve.feature')} traditional={t('features.comparison.curve.traditional')} edupack={t('features.comparison.curve.edupack')} isRTL={isRTL} />
                <ComparisonRow feature={t('features.comparison.ai.feature')} traditional={t('features.comparison.ai.traditional')} edupack={t('features.comparison.ai.edupack')} isRTL={isRTL} />
                <ComparisonRow feature={t('features.comparison.marketplace.feature')} traditional={t('features.comparison.marketplace.traditional')} edupack={t('features.comparison.marketplace.edupack')} isRTL={isRTL} />
                <ComparisonRow
                  feature={t('features.comparison.support.feature')}
                  traditional={t('features.comparison.support.traditional')}
                  edupack={t('features.comparison.support.edupack')}
                  isRTL={isRTL}
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            {t('features.grid.title')}
          </h2>
          <p className={`text-center text-muted-foreground mb-12 max-w-2xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('features.grid.description')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="h-8 w-8" />}
              title={t('features.grid.card1.title')}
              description={t('features.grid.card1.description')}
              isRTL={isRTL}
            />
            <FeatureCard
              icon={<Layout className="h-8 w-8" />}
              title={t('features.grid.card2.title')}
              description={t('features.grid.card2.description')}
              isRTL={isRTL}
            />
            <FeatureCard
              icon={<Download className="h-8 w-8" />}
              title={t('features.grid.card3.title')}
              description={t('features.grid.card3.description')}
              isRTL={isRTL}
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title={t('features.grid.card4.title')}
              description={t('features.grid.card4.description')}
              isRTL={isRTL}
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title={t('features.grid.card5.title')}
              description={t('features.grid.card5.description')}
              isRTL={isRTL}
            />
            <FeatureCard
              icon={<Languages className="h-8 w-8" />}
              title={t('features.grid.card6.title')}
              description={t('features.grid.card6.description')}
              isRTL={isRTL}
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title={t('features.grid.card7.title')}
              description={t('features.grid.card7.description')}
              isRTL={isRTL}
            />
            <FeatureCard
              icon={<DollarSign className="h-8 w-8" />}
              title={t('features.grid.card8.title')}
              description={t('features.grid.card8.description')}
              isRTL={isRTL}
            />
            <FeatureCard
              icon={<Lightbulb className="h-8 w-8" />}
              title={t('features.grid.card9.title')}
              description={t('features.grid.card9.description')}
              isRTL={isRTL}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">{t('features.cta.title')}</h2>
          <p className={`text-xl text-muted-foreground mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('features.cta.description')}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="/register">
              <Button size="lg">{t('features.cta.start')}</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                {t('features.cta.pricing')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ComparisonRow({ feature, traditional, edupack, isRTL }: { feature: string; traditional: string; edupack: string; isRTL: boolean }) {
  return (
    <tr>
      <td className={`px-6 py-4 text-sm font-medium text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>{feature}</td>
      <td className="px-6 py-4 text-sm text-muted-foreground text-center">{traditional}</td>
      <td className="px-6 py-4 text-sm text-primary font-medium text-center">{edupack}</td>
    </tr>
  )
}

function FeatureCard({ icon, title, description, isRTL }: { icon: React.ReactNode; title: string; description: string; isRTL: boolean }) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
      <div className={`text-primary mb-4 ${isRTL ? 'flex justify-end' : ''}`}>{icon}</div>
      <h3 className={`text-lg font-semibold text-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{title}</h3>
      <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>{description}</p>
    </div>
  )
}

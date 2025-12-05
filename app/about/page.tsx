'use client'

import { useLocale } from "@/hooks/use-locale"

export default function AboutPage() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">{t('about.title')}</h1>

        <div className="prose prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('about.mission.title')}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t('about.mission.p1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.mission.p2')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('about.who.title')}</h2>
            <div className="space-y-4">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{t('about.who.teachers.title')}</h3>
                <p className="text-muted-foreground">
                  {t('about.who.teachers.p')}
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{t('about.who.edtech.title')}</h3>
                <p className="text-muted-foreground">
                  {t('about.who.edtech.p')}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('about.purpose.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.purpose.p')}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

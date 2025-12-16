'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  ShoppingBag,
  GraduationCap,
  Building2,
  Boxes,
  Cloud,
} from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'
import { t } from '@/lib/translations'
import { FeaturedPackages } from '@/components/featured-packages'
import AnimatedScormBg from '@/components/AnimatedScormBg'
export default function HomePage() {
  const { locale } = useLocale()
  const isRTL = locale === 'ar'

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={isRTL ? 'font-ar' : ''}
    >
      {/* ================= HERO ================= */}
      
      <section className="min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8">
        <AnimatedScormBg />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-[1.25] tracking-normal">
            {t(locale, 'hero.title')}
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-[1.9]">
            {t(locale, 'hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/scorm-ai">
              <Button size="lg">
                <Sparkles className="me-2 h-5 w-5" />
                {t(locale, 'hero.cta.start')}
              </Button>
            </Link>

            <Link href="/packages">
              <Button size="lg" variant="outline">
                <ShoppingBag className="me-2 h-5 w-5" />
                {t(locale, 'hero.cta.browse')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PACKAGES ================= */}
      <section className="py-16">
        <FeaturedPackages />
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          <FeatureCard
            icon={<Boxes className="h-8 w-8 text-primary mx-auto" />}
            title={t(locale, 'feature.scorm.title')}
            description={t(locale, 'feature.scorm.desc')}
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-primary mx-auto" />}
            title={t(locale, 'feature.ai.title')}
            description={t(locale, 'feature.ai.desc')}
          />
          <FeatureCard
            icon={<ShoppingBag className="h-8 w-8 text-primary mx-auto" />}
            title={t(locale, 'feature.marketplace.title')}
            description={t(locale, 'feature.marketplace.desc')}
          />
          <FeatureCard
            icon={<Cloud className="h-8 w-8 text-primary mx-auto" />}
            title={t(locale, 'feature.lms.title')}
            description={t(locale, 'feature.lms.desc')}
          />
        </div>
      </section>

      {/* ================= AUDIENCE ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t(locale, 'audience.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <AudienceCard
              icon={<GraduationCap className="h-12 w-12 text-primary" />}
              title={t(locale, 'audience.teachers.title')}
              points={[
                t(locale, 'audience.teachers.point1'),
                t(locale, 'audience.teachers.point2'),
                t(locale, 'audience.teachers.point3'),
                t(locale, 'audience.teachers.point4'),
              ]}
            />

            <AudienceCard
              icon={<Building2 className="h-12 w-12 text-primary" />}
              title={t(locale, 'audience.institutions.title')}
              points={[
                t(locale, 'audience.institutions.point1'),
                t(locale, 'audience.institutions.point2'),
                t(locale, 'audience.institutions.point3'),
                t(locale, 'audience.institutions.point4'),
              ]}
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t(locale, 'cta.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t(locale, 'cta.description')}
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              {t(locale, 'cta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

/* ================= COMPONENTS ================= */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function AudienceCard({
  icon,
  title,
  points,
}: {
  icon: React.ReactNode
  title: string
  points: string[]
}) {
  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
            <span className="text-muted-foreground">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

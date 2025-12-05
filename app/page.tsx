'use client'

import type React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, FileText, GraduationCap, Building2, Sparkles, ShoppingBag, Boxes, Cloud } from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'
import { t } from '@/lib/translations'
import { FeaturedPackages } from '@/components/featured-packages'

export default function HomePage() {
  const { locale } = useLocale()

  const previewTabs = [
    {
      label: t(locale, 'preview.name'),
      value: 'name',
      content: <PreviewContent title={t(locale, 'preview.title.name')} locale={locale} />,
    },
    {
      label: t(locale, 'preview.grade'),
      value: 'grade',
      content: <PreviewContent title={t(locale, 'preview.title.grade')} locale={locale} />,
    },
    {
      label: t(locale, 'preview.subject'),
      value: 'subject',
      content: <PreviewContent title={t(locale, 'preview.title.subject')} locale={locale} />,
    },
    {
      label: t(locale, 'preview.measure'),
      value: 'measure',
      content: <PreviewContent title={t(locale, 'preview.title.measure')} locale={locale} />,
    },
    {
      label: t(locale, 'preview.language'),
      value: 'language',
      content: <PreviewContent title={t(locale, 'preview.title.language')} locale={locale} />,
    },
  ]
  return (
    <div className='bg-background'>
      {/* Hero Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            {/* Left Column */}
            <div>
              <h1 className='text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight text-balance'>
                {t(locale, 'hero.title')}
              </h1>
              <p className='text-lg text-muted-foreground mb-8 leading-relaxed'>{t(locale, 'hero.description')}</p>
              <div className='flex flex-col sm:flex-row gap-4 mb-6'>
                <Link href='/scorm-ai'>
                  <Button size='lg' className='w-full sm:w-auto'>
                    <Sparkles className='mr-2 h-5 w-5' />
                    {t(locale, 'hero.cta.start')}
                  </Button>
                </Link>
                <Link href='/packages'>
                  <Button size='lg' variant='outline' className='w-full sm:w-auto bg-transparent'>
                    <ShoppingBag className='mr-2 h-5 w-5' />
                    {t(locale, 'hero.cta.browse')}
                  </Button>
                </Link>
              </div>
              <p className='text-sm text-muted-foreground'>
                {t(locale, 'hero.no-card')} • {t(locale, 'hero.free-trial')}
              </p>
            </div>

            {/* Right Column - Preview Card */}
            <div className='bg-card rounded-2xl shadow-xl p-6 border border-border'>
              <Tabs defaultValue='name'>
                <TabsList>
                  {previewTabs.map(tab => <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>)}
                </TabsList>
                {previewTabs.map(tab => <TabsContent key={tab.value} value={tab.value}>{tab.content}</TabsContent>)}
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <FeaturedPackages />

      {/* Features Summary Band */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-background'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <FeatureCard
              icon={<Boxes className='h-8 w-8 text-primary' />}
              title={t(locale, 'feature.scorm.title')}
              description={t(locale, 'feature.scorm.desc')}
            />
            <FeatureCard
              icon={<Sparkles className='h-8 w-8 text-primary' />}
              title={t(locale, 'feature.ai.title')}
              description={t(locale, 'feature.ai.desc')}
            />
            <FeatureCard
              icon={<ShoppingBag className='h-8 w-8 text-primary' />}
              title={t(locale, 'feature.marketplace.title')}
              description={t(locale, 'feature.marketplace.desc')}
            />
            <FeatureCard
              icon={<Cloud className='h-8 w-8 text-primary' />}
              title={t(locale, 'feature.lms.title')}
              description={t(locale, 'feature.lms.desc')}
            />
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-muted/30'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-3xl font-bold text-center text-foreground mb-12'>{t(locale, 'audience.title')}</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <AudienceCard
              icon={<GraduationCap className='h-12 w-12 text-primary' />}
              title={t(locale, 'audience.teachers.title')}
              points={[
                t(locale, 'audience.teachers.point1'),
                t(locale, 'audience.teachers.point2'),
                t(locale, 'audience.teachers.point3'),
                t(locale, 'audience.teachers.point4'),
              ]}
            />
            <AudienceCard
              icon={<Building2 className='h-12 w-12 text-primary' />}
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

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl lg:text-4xl font-bold mb-6'>{t(locale, 'cta.title')}</h2>
          <p className='text-lg mb-8 opacity-90'>{t(locale, 'cta.description')}</p>
          <Link href='/register'>
            <Button size='lg' variant='secondary'>
              {t(locale, 'cta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function PreviewContent({ title, locale }: { title: string; locale: 'en' | 'ar' }) {
  return (
    <div className='bg-accent/20 rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center border-2 border-accent/50'>
      <div className='text-center space-y-4'>
        <div className='bg-accent/30 rounded-full p-4 inline-flex'>
          <Play className='h-8 w-8 text-foreground' />
        </div>
        <h3 className='text-xl font-semibold text-foreground'>{title}</h3>
        <p className='text-sm text-muted-foreground'>{t(locale, 'preview.area')}</p>
        <div className='mt-8 flex gap-3'>
          <Button variant='outline' size='sm'>
            <Play className='mr-2 h-4 w-4' />
            {t(locale, 'preview.play')}
          </Button>
          <Button variant='outline' size='sm'>
            <FileText className='mr-2 h-4 w-4' />
            {t(locale, 'preview.view')}
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className='text-center'>
      <div className='inline-flex items-center justify-center mb-4'>{icon}</div>
      <h3 className='text-lg font-semibold text-foreground mb-2'>{title}</h3>
      <p className='text-sm text-muted-foreground leading-relaxed'>{description}</p>
    </div>
  )
}

function AudienceCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <div className='bg-card rounded-2xl p-8 border border-border shadow-lg'>
      <div className='flex items-center gap-4 mb-6'>
        {icon}
        <h3 className='text-xl font-bold text-foreground'>{title}</h3>
      </div>
      <ul className='space-y-3'>
        {points.map((point, index) => (
          <li key={index} className='flex items-start gap-3'>
            <div className='mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0' />
            <span className='text-muted-foreground'>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

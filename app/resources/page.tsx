'use client'

import type React from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, FileText, Mail, MessageCircle, Sparkles, Upload, ShoppingBag, Cloud } from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/hooks/use-locale"

export default function ResourcesPage() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('resources.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('resources.description')}
          </p>
        </div>

        {/* Guide Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <GuideCard
            number="1"
            icon={<Sparkles className="h-6 w-6" />}
            title={t('resources.guide1.title')}
            description={t('resources.guide1.description')}
            duration={t('resources.guide1.duration')}
            level={t('resources.guide1.level')}
          />
          <GuideCard
            number="2"
            icon={<Upload className="h-6 w-6" />}
            title={t('resources.guide2.title')}
            description={t('resources.guide2.description')}
            duration={t('resources.guide2.duration')}
            level={t('resources.guide2.level')}
          />
          <GuideCard
            number="3"
            icon={<ShoppingBag className="h-6 w-6" />}
            title={t('resources.guide3.title')}
            description={t('resources.guide3.description')}
            duration={t('resources.guide3.duration')}
            level={t('resources.guide3.level')}
          />
          <GuideCard
            number="4"
            icon={<Cloud className="h-6 w-6" />}
            title={t('resources.guide4.title')}
            description={t('resources.guide4.description')}
            duration={t('resources.guide4.duration')}
            level={t('resources.guide4.level')}
          />
        </div>

        {/* Video Tutorials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">{t('resources.videos.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <VideoCard
              title={t('resources.video1.title')}
              duration={t('resources.video1.duration')}
              thumbnail="/placeholder.svg?height=200&width=400"
            />
            <VideoCard
              title={t('resources.video2.title')}
              duration={t('resources.video2.duration')}
              thumbnail="/placeholder.svg?height=200&width=400"
            />
            <VideoCard
              title={t('resources.video3.title')}
              duration={t('resources.video3.duration')}
              thumbnail="/placeholder.svg?height=200&width=400"
            />
          </div>
        </section>

        {/* Documentation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">{t('resources.docs.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DocLink
              icon={<FileText className="h-5 w-5" />}
              title={t('resources.doc1.title')}
              description={t('resources.doc1.description')}
            />
            <DocLink
              icon={<BookOpen className="h-5 w-5" />}
              title={t('resources.doc2.title')}
              description={t('resources.doc2.description')}
            />
            <DocLink
              icon={<FileText className="h-5 w-5" />}
              title={t('resources.doc3.title')}
              description={t('resources.doc3.description')}
            />
          </div>
        </section>

        {/* Contact Team */}
        <section id="contact" className="bg-card rounded-2xl border border-border p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('resources.help.title')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('resources.help.description')}
              </p>

              <div className="space-y-4 mb-8">
                <ContactPerson
                  name={t('resources.contact1.name')}
                  role={t('resources.contact1.role')}
                  avatar="/placeholder.svg?height=48&width=48"
                />
                <ContactPerson
                  name={t('resources.contact2.name')}
                  role={t('resources.contact2.role')}
                  avatar="/placeholder.svg?height=48&width=48"
                />
              </div>

              <div className="space-y-3">
                <a href="mailto:support@edupack.app" className="flex items-center gap-3 text-primary hover:underline">
                  <Mail className="h-5 w-5" />
                  <span>support@edupack.app</span>
                </a>
                <Link href="#" className="flex items-center gap-3 text-primary hover:underline">
                  <MessageCircle className="h-5 w-5" />
                  <span>{t('resources.help.chat')}</span>
                </Link>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">{t('resources.form.title')}</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t('resources.form.name')}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm"
                    placeholder={t('resources.form.name.placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t('resources.form.email')}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm"
                    placeholder={t('resources.form.email.placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t('resources.form.message')}</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm min-h-[120px]"
                    placeholder={t('resources.form.message.placeholder')}
                  />
                </div>
                <Button className="w-full">{t('resources.form.send')}</Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function GuideCard({
  number,
  icon,
  title,
  description,
  duration,
  level,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
  duration: string
  level: string
}) {
  const { t } = useLocale()
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
          {number}
        </div>
        <div className="flex-1">
          <div className="text-primary mb-2">{icon}</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{duration}</span>
            <span>•</span>
            <span className="text-primary font-medium">{level}</span>
          </div>
        </div>
      </div>
      <Button variant="outline" className="w-full bg-transparent">
        <BookOpen className="mr-2 h-4 w-4" />
        {t('resources.guide.open')}
      </Button>
    </div>
  )
}

function VideoCard({ title, duration, thumbnail }: { title: string; duration: string; thumbnail: string }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video bg-muted">
        <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
            <Video className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
    </div>
  )
}

function DocLink({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link href="#" className="block bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
      <div className="text-primary mb-3">{icon}</div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}

function ContactPerson({ name, role, avatar }: { name: string; role: string; avatar: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
        <img src={avatar || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="font-semibold text-foreground">{name}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </div>
  )
}



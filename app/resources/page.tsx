'use client'

import type React from "react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Mail, MessageCircle, Sparkles, Upload, ShoppingBag, Cloud, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/hooks/use-locale"
import { createClient } from "@/lib/supabase/client"

export default function ResourcesPage() {
  const { t } = useLocale()

  const guideLinks = useMemo(
    () => [
      {
        number: "1",
        icon: <Sparkles className="h-6 w-6" />,
        title: t("resources.guide1.title"),
        description: t("resources.guide1.description"),
        duration: t("resources.guide1.duration"),
        level: t("resources.guide1.level"),
        href: "https://scorm.com/scorm-explained/"
      },
      {
        number: "2",
        icon: <Upload className="h-6 w-6" />,
        title: t("resources.guide2.title"),
        description: t("resources.guide2.description"),
        duration: t("resources.guide2.duration"),
        level: t("resources.guide2.level"),
        href: "https://help.edupack.app/upload"
      },
      {
        number: "3",
        icon: <ShoppingBag className="h-6 w-6" />,
        title: t("resources.guide3.title"),
        description: t("resources.guide3.description"),
        duration: t("resources.guide3.duration"),
        level: t("resources.guide3.level"),
        href: "https://edupack.app/shop"
      },
      {
        number: "4",
        icon: <Cloud className="h-6 w-6" />,
        title: t("resources.guide4.title"),
        description: t("resources.guide4.description"),
        duration: t("resources.guide4.duration"),
        level: t("resources.guide4.level"),
        href: "https://help.edupack.app/lms-integration"
      }
    ],
    [t]
  )

  const readingResources = useMemo(
    () => [
      {
        icon: <FileText className="h-5 w-5" />,
        title: t("resources.reading.api.title"),
        description: t("resources.reading.api.description"),
        href: "https://api.edupack.app/docs"
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        title: t("resources.reading.scorm.title"),
        description: t("resources.reading.scorm.description"),
        href: "https://scorm.com/scorm-explained/technical-scorm/"
      },
      {
        icon: <FileText className="h-5 w-5" />,
        title: t("resources.reading.bestPractices.title"),
        description: t("resources.reading.bestPractices.description"),
        href: "https://help.edupack.app/best-practices"
      }
    ],
    [t]
  )

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({
    type: "idle",
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: t("resources.form.validation") })
      return
    }

    try {
      setStatus({ type: "loading" })
      const supabase = createClient()
      const { error } = await supabase.from("team_messages").insert({
        message_name: formData.name,
        message_email: formData.email,
        message_text: formData.message,
      })

      if (error) throw error

      setStatus({ type: "success", message: t("resources.form.success") })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Failed to submit message", error)
      setStatus({ type: "error", message: t("resources.form.error") })
    }
  }

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
          {guideLinks.map((guide) => (
            <GuideCard key={guide.number} {...guide} />
          ))}
        </div>

        {/* Reading Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('resources.reading.title')}</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">{t('resources.reading.description')}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readingResources.map((resource) => (
              <DocLink key={resource.title} {...resource} />
            ))}
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
              href="https://api.edupack.app/docs"
            />
            <DocLink
              icon={<BookOpen className="h-5 w-5" />}
              title={t('resources.doc2.title')}
              description={t('resources.doc2.description')}
              href="https://help.edupack.app/best-practices"
            />
            <DocLink
              icon={<FileText className="h-5 w-5" />}
              title={t('resources.doc3.title')}
              description={t('resources.doc3.description')}
              href="https://scorm.com/scorm-explained/technical-scorm/"
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
                <Link href="https://edupack.app/support" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary hover:underline">
                  <MessageCircle className="h-5 w-5" />
                  <span>{t('resources.help.chat')}</span>
                </Link>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">{t('resources.form.title')}</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t('resources.form.name')}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm"
                    placeholder={t('resources.form.name.placeholder')}
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t('resources.form.email')}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm"
                    placeholder={t('resources.form.email.placeholder')}
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t('resources.form.message')}</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm min-h-[120px]"
                    placeholder={t('resources.form.message.placeholder')}
                    value={formData.message}
                    onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  />
                </div>
                {status.type !== "idle" && status.message && (
                  <div
                    className={`rounded-lg border px-4 py-2 text-sm ${
                      status.type === "success"
                        ? "border-green-500 text-green-700"
                        : status.type === "error"
                          ? "border-destructive text-destructive"
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                <Button className="w-full" type="submit" disabled={status.type === "loading"}>
                  {status.type === "loading" ? t('resources.form.sending') : t('resources.form.send')}
                </Button>
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
  href,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
  duration: string
  level: string
  href: string
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
      <Button variant="outline" className="w-full bg-transparent" asChild>
        <a href={href} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
          <BookOpen className="h-4 w-4" />
          {t('resources.guide.open')}
        </a>
      </Button>
    </div>
  )
}

function DocLink({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href: string }) {
  const isExternal = href.startsWith("http")
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="block bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between text-primary mb-3">
        {icon}
        <ExternalLink className="h-4 w-4" />
      </div>
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



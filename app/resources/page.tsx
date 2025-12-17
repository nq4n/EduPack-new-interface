"use client"

import type React from "react"
import { useMemo, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  FileText,
  Mail,
  MessageCircle,
  Sparkles,
  Upload,
  ShoppingBag,
  Cloud,
  ExternalLink,
  HelpCircle,
  Link as LinkIcon,
} from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/hooks/use-locale"
import { createClient } from "@/lib/supabase/client"

/* -----------------------------------------------------
   POPUP GUIDANCE (EN + AR) - EDIT HERE
----------------------------------------------------- */

const GUIDANCE_POPUPS = {
  guide1: {
    en: {
      title: "Create your first SCORM package with AI",
      heading: "How to start fast",
      summary:
        "Use this guide to generate your first lesson and keep everything editable inside EduPack.",
      points: [
        "Open SCORM AI Builder from the resources list.",
        "Write your goal + grade + subject in one simple message.",
        "Let AI generate pages, then apply changes when you’re happy.",
      ],
    },
    ar: {
      title: "إنشاء أول حزمة SCORM بالذكاء الاصطناعي",
      heading: "كيف تبدأ بسرعة",
      summary:
        "استخدم هذا الدليل لإنشاء درس كامل، ثم عدّل كل شيء داخل EduPack بسهولة.",
      points: [
        "افتح SCORM AI Builder من صفحة الموارد.",
        "اكتب الهدف + الصف + المادة برسالة واحدة بسيطة.",
        "دع الذكاء الاصطناعي ينشئ الصفحات ثم طبّق التغييرات عندما تكون راضي.",
      ],
    },
  },

  guide2: {
    en: {
      title: "Upload console",
      heading: "Upload & publish safely",
      summary:
        "Use Upload console if you already have a SCORM package and want to publish it in EduPack.",
      points: [
        "Prepare a SCORM 1.2 or SCORM 2004 zip file.",
        "Upload it, then preview it before publishing.",
        "Publish and reuse it anytime.",
      ],
    },
    ar: {
      title: "وحدة رفع الحزم",
      heading: "رفع ونشر بشكل آمن",
      summary:
        "استخدم الرفع إذا لديك ملف SCORM جاهز وتريد نشره داخل EduPack.",
      points: [
        "جهّز ملف zip بصيغة SCORM 1.2 أو SCORM 2004.",
        "ارفعه ثم عاينه قبل النشر.",
        "انشره وأعد استخدامه في أي وقت.",
      ],
    },
  },

  guide3: {
    en: {
      title: "Marketplace",
      heading: "Reuse ready-made packages",
      summary:
        "Marketplace helps you browse and download ready-to-use lessons and customize them.",
      points: [
        "Browse packages by grade/subject.",
        "Preview the structure before downloading.",
        "Edit and customize after importing.",
      ],
    },
    ar: {
      title: "السوق",
      heading: "استخدم حزم جاهزة",
      summary:
        "السوق يساعدك في تصفح وتحميل دروس جاهزة ثم تعديلها حسب احتياجك.",
      points: [
        "تصفح الحزم حسب الصف/المادة.",
        "عاين البنية قبل التحميل.",
        "قم بالتعديل بعد الاستيراد.",
      ],
    },
  },

  guide4: {
    en: {
      title: "LMS integration",
      heading: "Run inside any LMS",
      summary:
        "Export from EduPack as SCORM and upload into Moodle/Canvas/Blackboard (or any SCORM LMS).",
      points: [
        "Export your project as SCORM 1.2 or SCORM 2004.",
        "Upload it into your LMS.",
        "Test it before sharing with learners.",
      ],
    },
    ar: {
      title: "الربط مع نظام إدارة التعلم",
      heading: "تشغيل داخل أي LMS",
      summary:
        "قم بالتصدير من EduPack بصيغة SCORM ثم ارفعه إلى Moodle/Canvas/Blackboard أو أي نظام يدعم SCORM.",
      points: [
        "صدّر مشروعك بصيغة SCORM 1.2 أو SCORM 2004.",
        "ارفعه إلى نظام إدارة التعلم.",
        "اختبره قبل نشره للمتعلمين.",
      ],
    },
  },

  reading: {
    en: {
      title: "Reading guidance",
      heading: "What to read first",
      summary:
        "If you’re new, start with SCORM basics then move to best practices and API docs.",
      points: [
        "Read SCORM basics to understand package structure.",
        "Read best practices to build good lessons faster.",
        "Use API docs only if you are integrating EduPack programmatically.",
      ],
    },
    ar: {
      title: "إرشاد القراءة",
      heading: "ماذا تقرأ أولاً؟",
      summary:
        "إذا كنت جديد: ابدأ بـ SCORM ثم أفضل الممارسات، وبعدها الـ API إذا احتجت تكامل برمجي.",
      points: [
        "اقرأ أساسيات SCORM لفهم بنية الحزم.",
        "اقرأ أفضل الممارسات لتصميم درس قوي بسرعة.",
        "استخدم API فقط إذا كنت تعمل على تكامل برمجي مع EduPack.",
      ],
    },
  },
} as const

type GuideKey = keyof typeof GUIDANCE_POPUPS

export default function ResourcesPage() {
  const { t, locale } = useLocale()
  const lang = locale === "ar" ? "ar" : "en"

  const [activePopup, setActivePopup] = useState<null | GuideKey>(null)

  // ✅ Guides = popup (not external)
  const guideLinks = useMemo(
    () => [
      {
        number: "1",
        icon: <Sparkles className="h-6 w-6" />,
        title: t("resources.guide1.title"),
        description: t("resources.guide1.description"),
        duration: t("resources.guide1.duration"),
        level: t("resources.guide1.level"),
        popupKey: "guide1" as const,
      },
      {
        number: "2",
        icon: <Upload className="h-6 w-6" />,
        title: t("resources.guide2.title"),
        description: t("resources.guide2.description"),
        duration: t("resources.guide2.duration"),
        level: t("resources.guide2.level"),
        popupKey: "guide2" as const,
      },
      {
        number: "3",
        icon: <ShoppingBag className="h-6 w-6" />,
        title: t("resources.guide3.title"),
        description: t("resources.guide3.description"),
        duration: t("resources.guide3.duration"),
        level: t("resources.guide3.level"),
        popupKey: "guide3" as const,
      },
      {
        number: "4",
        icon: <Cloud className="h-6 w-6" />,
        title: t("resources.guide4.title"),
        description: t("resources.guide4.description"),
        duration: t("resources.guide4.duration"),
        level: t("resources.guide4.level"),
        popupKey: "guide4" as const,
      },
    ],
    [t]
  )

  // ✅ Reading cards = internal docs pages (we will create them)
  const readingResources = useMemo(
    () => [
      {
        icon: <FileText className="h-5 w-5" />,
        title: t("resources.reading.api.title"),
        description: t("resources.reading.api.description"),
        content: t("resources.reading.api.content"),
        href: "/docs/api",
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        title: t("resources.reading.scorm.title"),
        description: t("resources.reading.scorm.description"),
        content: t("resources.reading.scorm.content"),
        href: "/docs/scorm",
      },
      {
        icon: <FileText className="h-5 w-5" />,
        title: t("resources.reading.bestPractices.title"),
        description: t("resources.reading.bestPractices.description"),
        content: t("resources.reading.bestPractices.content"),
        href: "/docs/best-practices",
      },
    ],
    [t]
  )

  // ✅ Platform resources = internal pages (must navigate)
  const projectResources = useMemo(
    () => [
      {
        icon: <Sparkles className="h-5 w-5" />,
        title: t("resources.project.ai.title"),
        description: t("resources.project.ai.description"),
        href: "/scorm-ai",
      },
      {
        icon: <Upload className="h-5 w-5" />,
        title: t("resources.project.upload.title"),
        description: t("resources.project.upload.description"),
        href: "/upload",
      },
      {
        icon: <ShoppingBag className="h-5 w-5" />,
        title: t("resources.project.marketplace.title"),
        description: t("resources.project.marketplace.description"),
        href: "/shop",
      },
      {
        icon: <Cloud className="h-5 w-5" />,
        title: t("resources.project.docs.title"),
        description: t("resources.project.docs.description"),
        href: "/help",
      },
      {
        icon: <LinkIcon className="h-5 w-5" />,
        title: t("resources.project.api.title"),
        description: t("resources.project.api.description"),
        href: "/docs/api",
      },
      {
        icon: <HelpCircle className="h-5 w-5" />,
        title: t("resources.project.support.title"),
        description: t("resources.project.support.description"),
        href: "/support",
      },
    ],
    [t]
  )

  // ✅ Documentation section (screenshot)
  const documentationCards = useMemo(
    () => [
      {
        icon: <FileText className="h-5 w-5" />,
        title: t("resources.doc1.title"),
        description: t("resources.doc1.description"),
        href: "/docs/api",
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        title: t("resources.doc2.title"),
        description: t("resources.doc2.description"),
        href: "/docs/best-practices",
      },
      {
        icon: <FileText className="h-5 w-5" />,
        title: t("resources.doc3.title"),
        description: t("resources.doc3.description"),
        href: "/docs/scorm",
      },
    ],
    [t]
  )

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({
    type: "idle",
  })

  // Auto-clear success/error messages after 5 seconds
  useEffect(() => {
    if (status.type === "success" || status.type === "error") {
      const timer = setTimeout(() => {
        setStatus({ type: "idle" })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [status.type])

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: t("resources.form.validation") })
      return
    }

    if (!isValidEmail(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address" })
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
          <h1 className="text-4xl font-bold text-foreground mb-4">{t("resources.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("resources.description")}</p>
        </div>

        {/* Guide Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {guideLinks.map((guide) => (
            <GuideCard
              key={guide.number}
              number={guide.number}
              icon={guide.icon}
              title={guide.title}
              description={guide.description}
              duration={guide.duration}
              level={guide.level}
              onOpen={() => setActivePopup(guide.popupKey)}
            />
          ))}
        </div>

        {/* Project Resources */}
        <section className="mb-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">{t("resources.project.title")}</h2>
              <p className="text-muted-foreground max-w-3xl mt-2">{t("resources.project.description")}</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="#contact">{t("resources.project.cta")}</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {projectResources.map((resource) => (
              <DocLink key={resource.title} {...resource} />
            ))}
          </div>
        </section>

        {/* Reading Resources */}
        <section className="mb-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-3xl font-bold text-foreground">{t("essentialResources.title")}</h2>
            <Button variant="secondary" onClick={() => setActivePopup("reading")}>
              {t("resources.reading.guidance.button")}
            </Button>
          </div>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            {t("essentialResources.description")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readingResources.map((resource) => (
              <DocLink key={resource.title} {...resource} />
            ))}
          </div>
        </section>

        {/* Documentation (screenshot section) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">{t("resources.docs.title")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {documentationCards.map((doc) => (
              <DocLink key={doc.title} {...doc} />
            ))}
          </div>
        </section>

        {/* Contact Team */}
        <section id="contact" className="bg-card rounded-2xl border border-border p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">{t("resources.help.title")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("resources.help.description")}
              </p>

              <div className="space-y-4 mb-8">
                <ContactPerson name={t("resources.contact1.name")} role={t("resources.contact1.role")} avatar="/placeholder.svg?height=48&width=48" />
                <ContactPerson name={t("resources.contact2.name")} role={t("resources.contact2.role")} avatar="/placeholder.svg?height=48&width=48" />
              </div>

              <div className="space-y-3">
                <a href="mailto:support@edupack.app" className="flex items-center gap-3 text-primary hover:underline">
                  <Mail className="h-5 w-5" />
                  <span>support@edupack.app</span>
                </a>

                {/* internal support page (no external) */}
                <Link href="/support" className="flex items-center gap-3 text-primary hover:underline">
                  <MessageCircle className="h-5 w-5" />
                  <span>{t("resources.help.chat")}</span>
                </Link>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">{t("resources.form.title")}</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t("resources.form.name")}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm"
                    placeholder={t("resources.form.name.placeholder")}
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t("resources.form.email")}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm"
                    placeholder={t("resources.form.email.placeholder")}
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t("resources.form.message")}</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm min-h-[140px]"
                    placeholder={t("resources.form.message.placeholder")}
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
                  {status.type === "loading" ? t("resources.form.sending") : t("resources.form.send")}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Unified Popup (Guides + Reading guidance) */}
      {activePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-xl w-full p-6 relative">
            <button
              aria-label="Close"
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              onClick={() => setActivePopup(null)}
            >
              ×
            </button>

            <div className="flex items-center gap-3 mb-3 text-primary">
              <HelpCircle className="h-5 w-5" />
              <span className="font-semibold">
                {GUIDANCE_POPUPS[activePopup][lang].title}
              </span>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-2">
              {GUIDANCE_POPUPS[activePopup][lang].heading}
            </h3>

            <p className="text-muted-foreground mb-4">
              {GUIDANCE_POPUPS[activePopup][lang].summary}
            </p>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {GUIDANCE_POPUPS[activePopup][lang].points.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setActivePopup(null)}>
                {lang === "ar" ? "إغلاق" : "Close"}
              </Button>
              {activePopup !== "reading" && (
                <Button asChild>
                  <Link href="/scorm-ai">
                    {lang === "ar" ? "افتح SCORM AI" : "Open SCORM AI"}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* -----------------------------------------------------
   COMPONENTS
----------------------------------------------------- */

function GuideCard({
  number,
  icon,
  title,
  description,
  duration,
  level,
  onOpen,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
  duration: string
  level: string
  onOpen: () => void
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
      <Button variant="outline" className="w-full bg-transparent" onClick={onOpen}>
        <BookOpen className="h-4 w-4 mr-2" />
        {t("resources.guide.open")}
      </Button>
    </div>
  )
}

function DocLink({
  icon,
  title,
  description,
  content,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  content?: string
  href: string
}) {
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
        {isExternal && <ExternalLink className="h-4 w-4" />}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {content && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{content}</p>}
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

"use client"

import type React from "react"
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"
import { t } from "@/lib/translations"
import {
  Save,
  Eye,
  Download,
  Type,
  ImageIcon,
  Video,
  FileQuestion,
  MousePointerClick,
  Upload,
  MessageCircle,
} from "lucide-react"

type Status = "draft" | "published"

type ChatMessage = {
  id: number
  role: "assistant" | "user"
  content: string
}

export default function ScormAIPage() {
  const { locale } = useLocale()
  const [packageName, setPackageName] = useState("Untitled Package")
  const [status] = useState<Status>("draft")

  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content: t(locale, "scorm.ai.welcome"),
    },
  ])

  const handleSend = (e: FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: chatInput.trim() }])

    // later: call your AI backend here
    setChatInput("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top editor bar (sticks under your main navbar, which is top-16) */}
      <header className="sticky top-16 z-40 bg-card border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: name + status */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Input value={packageName} onChange={(e) => setPackageName(e.target.value)} className="max-w-xs" />
            <Badge variant={status === "draft" ? "secondary" : "default"}>
              {status === "draft" ? t(locale, "scorm.topbar.status.draft") : t(locale, "scorm.topbar.status.published")}
            </Badge>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              {t(locale, "scorm.topbar.preview")}
            </Button>
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              {t(locale, "scorm.topbar.save")}
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              {t(locale, "scorm.topbar.export")}
            </Button>
          </div>
        </div>
      </header>

      {/* Full-screen editor under the bar */}
      <main className="h-[calc(100vh-4rem-4rem)] flex flex-col gap-3 px-2 sm:px-4 pb-3 pt-2">
        {/* 1) Preview strip at top – like the storyboard big preview above workspace */}
        <section className="bg-card border border-border rounded-xl p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold truncate">{t(locale, "scorm.preview.title")}</h2>
              <p className="text-xs text-muted-foreground">{t(locale, "scorm.preview.desc")}</p>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              {t(locale, "scorm.preview.open")}
            </Button>
          </div>

          <div className="h-40 sm:h-52 lg:h-60 rounded-lg border border-dashed border-accent/60 bg-accent/30 flex items-center justify-center">
            <span className="text-xs sm:text-sm text-muted-foreground">{t(locale, "scorm.preview.player")}</span>
          </div>
        </section>

        {/* 2) Editor area – fills the rest of the viewport */}
        <section className="flex-1 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/20 border border-primary/20 rounded-2xl p-2 sm:p-3">
          {/* This container is the “app” with 3 vertical zones: chat, canvas, tools */}
          <div className="h-full bg-card/80 backdrop-blur rounded-xl border border-border/70 flex flex-col">
            {/* A) AI chat at top */}
            <div className="border-b border-border/60 p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{t(locale, "scorm.ai.title")}</h3>
                  <p className="text-xs text-muted-foreground">{t(locale, "scorm.ai.desc")}</p>
                </div>
              </div>

              {/* messages area */}
              <div className="h-32 sm:h-40 overflow-y-auto rounded-lg border border-border/60 bg-background/70 p-2 space-y-2 text-xs sm:text-sm">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-accent/40 text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* input bar */}
              <form onSubmit={handleSend} className="flex gap-2 pt-1">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t(locale, "scorm.ai.placeholder")}
                  className="text-xs sm:text-sm"
                />
                <Button type="submit" size="sm">
                  {t(locale, "scorm.ai.send")}
                </Button>
              </form>
            </div>

            {/* B) Canvas in the middle – flexible height, scroll if content grows */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-auto px-4 py-4 flex items-center justify-center">
                <div className="max-w-xl text-center space-y-3">
                  <h2 className="text-base sm:text-lg font-semibold">{t(locale, "scorm.canvas.title")}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t(locale, "scorm.canvas.desc")}</p>
                  <Button variant="outline" size="sm" type="button">
                    <MousePointerClick className="mr-2 h-4 w-4" />
                    {t(locale, "scorm.canvas.start")}
                  </Button>
                </div>
              </div>
            </div>

            {/* C) Bottom toolbar – merged into editor, always visible */}
            <div className="border-t border-border/60 bg-card/90 px-3 py-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  {t(locale, "scorm.tools.title")}
                </span>
                <span className="hidden sm:inline text-[11px] text-muted-foreground">
                  {t(locale, "scorm.tools.desc")}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                <ToolButton icon={<Type className="h-4 w-4" />} label={t(locale, "scorm.tools.text")} />
                <ToolButton icon={<ImageIcon className="h-4 w-4" />} label={t(locale, "scorm.tools.image")} />
                <ToolButton icon={<Video className="h-4 w-4" />} label={t(locale, "scorm.tools.video")} />
                <ToolButton icon={<FileQuestion className="h-4 w-4" />} label={t(locale, "scorm.tools.quiz")} />
                <ToolButton
                  icon={<MousePointerClick className="h-4 w-4" />}
                  label={t(locale, "scorm.tools.interactive")}
                />
                <ToolButton icon={<Upload className="h-4 w-4" />} label={t(locale, "scorm.tools.upload")} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function ToolButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-1 rounded-lg border border-accent/50 bg-accent/20 hover:bg-accent/30 px-2 py-2 text-[11px] sm:text-xs font-medium text-foreground transition-colors"
    >
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

"use client"

import type React from "react"
import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Sparkles,
  LayoutTemplate,
  Languages,
} from "lucide-react"

type Status = "draft" | "published"

type ChatMessage = {
  id: number
  role: "assistant" | "user"
  content: string
}

export default function ScormAIPage() {
  const [packageName, setPackageName] = useState("Untitled Package")
  const [status] = useState<Status>("draft")

  const [grade, setGrade] = useState("Grade / Stage")
  const [subject, setSubject] = useState("Subject")
  const [measure, setMeasure] = useState("Lesson / Quiz")
  const [language, setLanguage] = useState("EN")

  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Welcome to EduPack SCORM AI. Tell me the grade, topic, and what you want learners to achieve – I’ll help you build the package below.",
    },
  ])

  const handleSend = (e: FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: chatInput.trim() },
    ])

    // later: call your AI backend here & push assistant reply
    setChatInput("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Command bar (sticks under global navbar) */}
      <header className="sticky top-16 z-40 border-b border-border bg-gradient-to-r from-primary/90 via-primary to-primary/80 text-primary-foreground">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: name + breadcrumbs style */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="hidden sm:flex flex-col min-w-0">
              <span className="text-[11px] uppercase tracking-wide opacity-70">
                EduPack · SCORM AI editor
              </span>
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <span className="truncate">{packageName}</span>
                <span className="opacity-60">·</span>
                <span className="opacity-80">Authoring</span>
              </div>
            </div>
            <Input
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="max-w-xs text-xs sm:text-sm bg-primary/20 border-primary/40 text-primary-foreground placeholder:text-primary-foreground/60"
              aria-label="Package name"
            />
            <Badge
              variant="outline"
              className="border-primary-foreground/50 text-[11px] font-medium"
            >
              {status === "draft" ? "Draft" : "Published"}
            </Badge>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-primary-foreground/50 bg-primary/10"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-primary-foreground/50 bg-primary/10"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button size="sm" className="bg-accent text-primary hover:bg-accent/90">
              <Download className="mr-2 h-4 w-4" />
              Export SCORM
            </Button>
          </div>
        </div>
      </header>

      {/* Full-screen editor space */}
      <main className="h-[calc(100vh-4rem-4rem)] px-2 sm:px-4 pb-3 pt-3 flex flex-col gap-3">
        {/* 1) Live Preview strip (matches storyboard: preview above editor) */}
        <section className="bg-card border border-border rounded-2xl p-3 sm:p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4 text-primary" />
              <div>
                <h2 className="text-sm font-semibold">Package Preview</h2>
                <p className="text-xs text-muted-foreground">
                  Preview of the learner experience. Driven by the canvas and AI instructions below.
                </p>
              </div>
            </div>

            {/* Meta chips row like the storyboard (name / grade / subject / measure / lang) */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
              <MetaPill label="Grade / Stage" value={grade} onClick={() => setGrade("Grade 5")} />
              <MetaPill label="Subject" value={subject} onClick={() => setSubject("Mathematics")} />
              <MetaPill
                label="Measure"
                value={measure}
                onClick={() => setMeasure("Quiz + Lesson")}
              />
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted"
                onClick={() => setLanguage(language === "EN" ? "AR" : "EN")}
              >
                <Languages className="h-3 w-3" />
                <span>{language === "EN" ? "EN · LTR" : "AR · RTL"}</span>
              </button>
            </div>
          </div>

          <div className="h-40 sm:h-52 lg:h-64 rounded-xl border border-dashed border-accent/60 bg-accent/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-accent/0 to-primary/10 opacity-70" />
            <div className="relative h-full flex items-center justify-center">
              <span className="text-xs sm:text-sm text-muted-foreground">
                SCORM player / iframe placeholder – package preview lives here.
              </span>
            </div>
          </div>
        </section>

        {/* 2) Editor area – one big professional workspace */}
        <section className="flex-1 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/20 shadow-sm p-2 sm:p-3">
          <div className="h-full bg-card/90 backdrop-blur rounded-2xl border border-border/80 flex flex-col">
            {/* A) AI chat on top of editor */}
            <div className="border-b border-border/70 p-3 sm:p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">EduPack AI · Package Designer</h3>
                    <p className="text-xs text-muted-foreground">
                      Describe screens, questions, and flow. AI will update the outline and canvas, and you can refine
                      with the tools at the bottom.
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="hidden sm:inline-flex text-[11px]">
                  Guided by chat
                </Badge>
              </div>

              {/* Messages */}
              <div className="h-28 sm:h-32 lg:h-36 overflow-y-auto rounded-xl border border-border/60 bg-background/80 p-2 space-y-2 text-xs sm:text-sm">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
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

              {/* Input bar */}
              <form onSubmit={handleSend} className="flex gap-2 pt-1">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Example: Build a 3-screen lesson on fractions for grade 5 with a 10-question quiz and feedback."
                  className="text-xs sm:text-sm"
                />
                <Button type="submit" size="sm">
                  <MessageCircle className="mr-1.5 h-4 w-4" />
                  Send
                </Button>
              </form>
            </div>

            {/* B) Editor body: Outline · Canvas · Inspector */}
            <div className="flex-1 grid grid-cols-12 gap-0 sm:gap-2 overflow-hidden">
              {/* Outline / pages (left) */}
              <aside className="hidden md:flex md:col-span-3 border-r border-border/60 bg-muted/20 flex-col">
                <div className="px-3 py-2 border-b border-border/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Outline
                  </span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    <Type className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto px-2 py-2 space-y-1 text-xs">
                  <OutlineItem index={1} title="Intro – Learning objectives" active />
                  <OutlineItem index={2} title="Concept explanation" />
                  <OutlineItem index={3} title="Guided example" />
                  <OutlineItem index={4} title="Quiz – 10 questions" />
                  <OutlineItem index={5} title="Summary & next steps" />
                </div>
              </aside>

              {/* Canvas (center) */}
              <div className="col-span-12 md:col-span-6 border-x md:border-x-0 border-border/60">
                <div className="h-full flex flex-col">
                  <div className="px-3 py-2 border-b border-border/60 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Canvas
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Page 1 · 1280 × 720 · Responsive
                    </span>
                  </div>
                  <div className="flex-1 overflow-auto flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(19,59,92,0.12),_transparent_55%),_linear-gradient(to_bottom,_rgba(19,59,92,0.02),_transparent_40%)]">
                    <div className="relative bg-accent/30 border border-accent/60 rounded-2xl shadow-lg w-[90%] max-w-3xl aspect-video overflow-hidden">
                      {/* subtle grid */}
                      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:32px_32px]" />
                      <div className="relative h-full flex flex-col items-center justify-center gap-3 px-6 text-center">
                        <h2 className="text-base sm:text-lg font-semibold text-foreground">
                          Visual layout of the current page
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          When you confirm an AI suggestion or add blocks from the toolbar, this canvas will show the
                          slide structure, components, and interactions.
                        </p>
                        <Button variant="outline" size="sm" type="button">
                          <MousePointerClick className="mr-2 h-4 w-4" />
                          Add first block
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inspector / properties (right) */}
              <aside className="hidden lg:flex lg:col-span-3 border-l border-border/60 bg-muted/10 flex-col">
                <div className="px-3 py-2 border-b border-border/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Inspector
                  </span>
                </div>
                <div className="flex-1 overflow-auto px-3 py-3 space-y-3 text-xs">
                  <div>
                    <p className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                      Page settings
                    </p>
                    <div className="space-y-1">
                      <LabelRow label="Title" value="Intro – Learning objectives" />
                      <LabelRow label="Type" value="Content + Objective" />
                      <LabelRow label="Tracking" value="Completion + Time" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                      Accessibility
                    </p>
                    <div className="space-y-1">
                      <LabelRow label="Alt text" value="Not set" muted />
                      <LabelRow label="Keyboard nav" value="Default" />
                      <LabelRow label="Captions" value="Pending" muted />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                      Export
                    </p>
                    <div className="space-y-1">
                      <LabelRow label="Profile" value="SCORM 1.2" />
                      <LabelRow label="Passing score" value="70%" />
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* C) Toolbelt – merged at bottom for full dev experience */}
            <div className="border-t border-border/70 bg-card/95 px-3 py-2 sm:py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  Content tools
                </span>
                <span className="hidden sm:inline text-[11px] text-muted-foreground">
                  Tools can use your latest AI message to pre-configure blocks before inserting them.
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
                <ToolButton icon={<Type className="h-4 w-4" />} label="Text block" />
                <ToolButton icon={<ImageIcon className="h-4 w-4" />} label="Image" />
                <ToolButton icon={<Video className="h-4 w-4" />} label="Video" />
                <ToolButton icon={<FileQuestion className="h-4 w-4" />} label="Question set" />
                <ToolButton icon={<MousePointerClick className="h-4 w-4" />} label="Interactive hotspot" />
                <ToolButton icon={<Upload className="h-4 w-4" />} label="Upload asset" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* --- Small presentational helpers --- */

function ToolButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 rounded-lg border border-accent/60 bg-accent/20 px-3 py-2 hover:bg-accent/30 transition-colors text-foreground"
    >
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function OutlineItem({
  index,
  title,
  active,
}: {
  index: number
  title: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={`w-full flex items-start gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
        active
          ? "bg-primary/10 text-foreground border border-primary/40"
          : "hover:bg-muted/60 text-muted-foreground border border-transparent"
      }`}
    >
      <span
        className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
          active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70"
        }`}
      >
        {index}
      </span>
      <span className="text-[11px] leading-snug line-clamp-2">{title}</span>
    </button>
  )
}

function LabelRow({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span
        className={`text-[11px] font-medium ${
          muted ? "text-muted-foreground/70" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function MetaPill({
  label,
  value,
  onClick,
}: {
  label: string
  value: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] hover:bg-muted"
    >
      <span className="text-muted-foreground/80">{label}:</span>
      <span className="font-medium text-foreground">{value}</span>
    </button>
  )
}

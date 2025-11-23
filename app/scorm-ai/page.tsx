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

  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! Describe the lesson you want (grade, topic, activities) and I’ll help you build the package below.",
    },
  ])

  const handleSend = (e: FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: chatInput.trim() },
    ])

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
            <Input
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="max-w-xs"
            />
            <Badge variant={status === "draft" ? "secondary" : "default"}>
              {status === "draft" ? "Draft" : "Published"}
            </Badge>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export SCORM
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
              <h2 className="text-sm font-semibold truncate">Live Package Preview</h2>
              <p className="text-xs text-muted-foreground">
                This is a preview of what learners will see. It updates when you change the canvas.
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Open in new tab
            </Button>
          </div>

          <div className="h-40 sm:h-52 lg:h-60 rounded-lg border border-dashed border-accent/60 bg-accent/30 flex items-center justify-center">
            <span className="text-xs sm:text-sm text-muted-foreground">
              SCORM player / iframe goes here
            </span>
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
                  <h3 className="text-sm font-semibold">EduPack AI</h3>
                  <p className="text-xs text-muted-foreground">
                    Chat with the assistant to generate pages, questions and media in the canvas below.
                  </p>
                </div>
              </div>

              {/* messages area */}
              <div className="h-32 sm:h-40 overflow-y-auto rounded-lg border border-border/60 bg-background/70 p-2 space-y-2 text-xs sm:text-sm">
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

              {/* input bar */}
              <form onSubmit={handleSend} className="flex gap-2 pt-1">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="e.g. Create a 10-question quiz on fractions for grade 5 with feedback..."
                  className="text-xs sm:text-sm"
                />
                <Button type="submit" size="sm">
                  Send
                </Button>
              </form>
            </div>

            {/* B) Canvas in the middle – flexible height, scroll if content grows */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-auto px-4 py-4 flex items-center justify-center">
                <div className="max-w-xl text-center space-y-3">
                  <h2 className="text-base sm:text-lg font-semibold">
                    Authoring Canvas
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    The AI will populate this canvas with pages, questions, and media based on your
                    chat. You can also insert blocks manually using the tools below.
                  </p>
                  <Button variant="outline" size="sm" type="button">
                    <MousePointerClick className="mr-2 h-4 w-4" />
                    Start from empty page
                  </Button>
                </div>
              </div>
            </div>

            {/* C) Bottom toolbar – merged into editor, always visible */}
            <div className="border-t border-border/60 bg-card/90 px-3 py-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  Content tools
                </span>
                <span className="hidden sm:inline text-[11px] text-muted-foreground">
                  Click a tool to insert it into the current page. Tools can also respond to the last AI
                  message.
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                <ToolButton icon={<Type className="h-4 w-4" />} label="Text" />
                <ToolButton icon={<ImageIcon className="h-4 w-4" />} label="Image" />
                <ToolButton icon={<Video className="h-4 w-4" />} label="Video" />
                <ToolButton icon={<FileQuestion className="h-4 w-4" />} label="Quiz" />
                <ToolButton icon={<MousePointerClick className="h-4 w-4" />} label="Interactive" />
                <ToolButton icon={<Upload className="h-4 w-4" />} label="Upload" />
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

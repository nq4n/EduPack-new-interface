"use client"

import type React from "react"
import { useState, type FormEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"
import { EditorBlock, EditorPage, EditorProject } from "@/lib/scorm/types"
import { BlockRenderer } from "@/lib/scorm/block-engine"
import { useLocalStorage } from "@/hooks/use-local-storage"
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
  FilePlus,
} from "lucide-react"

type Status = "draft" | "published"

type ChatMessage = {
  id: number
  role: "assistant" | "user" | "system"
  content: string
}

const initialProject: EditorProject = {
  id: `proj-${Date.now()}`,
  title: "Untitled Project",
  language: "en",
  version: "1.0",
  pages: [
    {
      id: "page-1",
      title: "Introduction",
      blocks: [],
    },
  ],
}

export default function ScormAIPage() {
  const { t } = useLocale()
  const [project, setProject] = useLocalStorage<EditorProject>("scorm-project", initialProject)

  const hasContent = project.pages.length > 1 || project.pages[0]?.blocks.length > 0
  const [editorMode, setEditorMode] = useState<"choice" | "ai" | "blank">(hasContent ? "ai" : "choice")

  const [activePage, setActivePage] = useState<EditorPage>(project.pages[0])

  const [status, setStatus] = useState<Status>("draft")

  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content: t("scorm.ai.welcome"),
    },
    {
      id: 2,
      role: "system",
      content:
        'You are a SCORM authoring assistant. Your responses should be in the form of JSON that conforms to the EditorBlock types. For example, to create a text block, you would respond with: {"type":"text","html":"<p>Hello world</p>"}. To create a quiz, you would respond with: {"type":"quiz","question":"What is 2+2?","options":[{"id":"1","label":"3","correct":false},{"id":"2","label":"4","correct":true}]}',
    },
  ])

  useEffect(() => {
    const currentPage = project.pages.find((p) => p.id === activePage.id)
    if (currentPage) {
      setActivePage(currentPage)
    }
  }, [project, activePage.id])

  const handleSend = async (e: FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const newMessages: ChatMessage[] = [
      ...messages,
      { id: Date.now(), role: "user", content: chatInput.trim() },
    ]
    setMessages(newMessages)
    setChatInput("")

    try {
      const response = await fetch("/api/scorm/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages.map(({ id, ...rest }) => rest) }),
      })

      if (!response.ok) {
        throw new Error("API error")
      }

      const aiResponse = await response.json()

      try {
        const block = JSON.parse(aiResponse.content) as EditorBlock
        addBlock(block.type, block)

        setMessages((prev) => [
          ...prev,
          { id: Date.now(), role: "assistant", content: `Added a new ${block.type} block.` },
        ])
      } catch (e) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), role: "assistant", content: aiResponse.content },
        ])
      }
    } catch (error) {
      console.error("Failed to get AI response:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content: "Sorry, I had trouble connecting to the AI. Please check your setup and try again.",
        },
      ])
    }
  }

  const handleSave = () => {
    console.log("Project saved!", project)
    alert("Project saved to local storage!")
  }

  const handleExport = async () => {
    try {
      const response = await fetch("/api/scorm/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })

      if (!response.ok) {
        throw new Error("Export failed")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${project.title.replace(/ /g, "_") || "scorm-package"}.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to export project:", error)
      alert("Error exporting project. See console for details.")
    }
  }

  const addBlock = (type: EditorBlock["type"], data?: Partial<EditorBlock>) => {
    let newBlock: EditorBlock = { id: `block-${Date.now()}`, type, ...(data as any) }

    if (!data) {
      switch (type) {
        case "text":
          ;(newBlock as any).html = "<p>New text block. Edit me!</p>"
          break
        case "image":
          ;(newBlock as any).src = "https://via.placeholder.com/600x400"
          ;(newBlock as any).alt = "Placeholder image"
          break
        case "video":
          ;(newBlock as any).src = "https://www.w3schools.com/html/mov_bbb.mp4"
          break
        case "quiz":
          ;(newBlock as any).question = "New Question"
          ;(newBlock as any).options = [
            { id: "1", label: "Option 1", correct: true },
            { id: "2", label: "Option 2", correct: false },
          ]
          break
      }
    }

    setProject((prevProject) => {
      const updatedPages = prevProject.pages.map((p) => {
        if (p.id === activePage.id) {
          const newBlocks = [...p.blocks, newBlock]
          return { ...p, blocks: newBlocks }
        }
        return p
      })
      return { ...prevProject, pages: updatedPages }
    })
  }

  const handlePreview = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${project.language || "en"}">
      <head>
        <meta charset="UTF-8">
        <title>Preview: ${project.title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; color: #333; }
          article { margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
          h1, h2 { color: #111; }
          figure { margin: 0 0 1em 0; }
          img, video { max-width: 100%; height: auto; border-radius: 8px; }
          figcaption { font-size: 0.9em; color: #666; text-align: center; margin-top: 5px; }
          fieldset { border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-top: 1em; }
          legend { font-weight: bold; padding: 0 5px; }
          form div { margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <h1>${project.title}</h1>
        ${project.pages
          .map(
            (page) => `
          <article>
            <h2>${page.title}</h2>
            ${page.blocks
              .map((block) => {
                switch (block.type) {
                  case "text":
                    return (block as any).html
                  case "image":
                    return `<figure><img src="${(block as any).src}" alt="${(block as any).alt || ""}"><figcaption>${
                      (block as any).alt || ""
                    }</figcaption></figure>`
                  case "video":
                    return `<video src="${(block as any).src}" controls></video>`
                  case "quiz":
                    return `
                  <form onsubmit="event.preventDefault();">
                    <fieldset>
                      <legend>${(block as any).question}</legend>
                      ${((block as any).options || [])
                        .map(
                          (o: any) => `
                        <div>
                          <input type="radio" id="${o.id}" name="${block.id}" value="${o.id}">
                          <label for="${o.id}">${o.label}</label>
                        </div>
                      `,
                        )
                        .join("")}
                    </fieldset>
                  </form>
                `
                  default:
                    return ""
                }
              })
              .join("")}
          </article>
        `,
          )
          .join("")}
      </body>
      </html>
    `
    const previewWindow = window.open("", "_blank")
    previewWindow?.document.write(htmlContent)
    previewWindow?.document.close()
  }

  // first screen: choose AI or blank
  if (editorMode === "choice") {
    const start = (mode: "ai" | "blank") => {
      setProject(initialProject)
      setEditorMode(mode)
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Create a New SCORM Package</h1>
          <p className="text-lg text-muted-foreground mb-8">How would you like to get started?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => start("ai")} className="h-auto py-4">
              <div className="flex flex-col items-center">
                <MessageCircle className="h-8 w-8 mb-2" />
                <span className="font-bold text-base">Build with AI Assistant</span>
                <span className="font-normal text-sm text-primary-foreground/80">
                  Let AI help create your course content.
                </span>
              </div>
            </Button>
            <Button size="lg" variant="secondary" onClick={() => start("blank")} className="h-auto py-4">
              <div className="flex flex-col items-center">
                <FilePlus className="h-8 w-8 mb-2" />
                <span className="font-bold text-base">Start from a Blank Page</span>
                <span className="font-normal text-sm text-secondary-foreground/80">
                  Build your course manually from scratch.
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // main full-screen editor: chat + preview + tools in one wrapper
  const visibleMessages = messages.filter((m) => m.role !== "system").slice(-4)

  return (
    <div className="min-h-screen bg-background">
      {/* Top editor bar */}
      <header className="sticky top-16 z-40 bg-card border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Input
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              className="max-w-xs"
            />
            <Badge variant={status === "draft" ? "secondary" : "default"}>
              {status === "draft" ? t("scorm.topbar.status.draft") : t("scorm.topbar.status.published")}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="mr-2 h-4 w-4" />
              {t("scorm.topbar.preview")}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              {t("scorm.topbar.save")}
            </Button>
            <Button size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              {t("scorm.topbar.export")}
            </Button>
          </div>
        </div>
      </header>

      {/* ONE wrapped editor section: chat + real preview + tools */}
      <main className="h-[calc(100vh-4rem-4rem)] px-2 sm:px-4 pb-3 pt-2 flex justify-center">
        <section className="w-full max-w-6xl bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
          {/* Chat strip */}
          {editorMode === "ai" && (
            <div className="border-b border-border px-3 sm:px-4 py-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">{t("scorm.ai.title")}</h3>
                  <p className="text-xs text-muted-foreground">{t("scorm.ai.desc")}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="rounded-2xl border border-border bg-background px-3 py-2 max-h-28 overflow-y-auto text-xs sm:text-sm">
                  {visibleMessages.length > 0 ? (
                    visibleMessages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} mb-1`}
                      >
                        <div
                          className={
                            m.role === "user"
                              ? "inline-block rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-3 py-1"
                              : "inline-block rounded-2xl rounded-bl-sm bg-accent/40 text-foreground px-3 py-1"
                          }
                        >
                          {m.content}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted-foreground">{t("scorm.ai.welcome")}</span>
                  )}
                </div>

                <form onSubmit={handleSend} className="flex gap-2 items-stretch">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={t("scorm.ai.placeholder")}
                    className="text-xs sm:text-sm rounded-2xl"
                  />
                  <Button type="submit" size="sm" className="rounded-2xl px-4">
                    {t("scorm.ai.send")}
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* Real package preview (canvas) */}
          <div className="flex-1 overflow-hidden px-3 sm:px-4 py-4">
            <div className="h-full overflow-auto rounded-2xl border border-dashed border-accent/60 bg-accent/10 px-4 py-6">
              <div className="max-w-3xl mx-auto space-y-4">
                {activePage.blocks.length > 0 ? (
                  activePage.blocks.map((block) => <BlockRenderer key={block.id} block={block} />)
                ) : (
                  <div className="text-center space-y-3 py-12">
                    <h2 className="text-base sm:text-lg font-semibold">{t("scorm.canvas.title")}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t("scorm.canvas.desc")}</p>
                    <Button variant="outline" size="sm" type="button" onClick={() => addBlock("text")}>
                      <MousePointerClick className="mr-2 h-4 w-4" />
                      {t("scorm.canvas.start")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="border-t border-border/60 bg-card/90 px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                {t("scorm.tools.title")}
              </span>
              <span className="hidden sm:inline text-[11px] text-muted-foreground">
                {t("scorm.tools.desc")}
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <ToolButton
                onClick={() => addBlock("text")}
                icon={<Type className="h-4 w-4" />}
                label={t("scorm.tools.text")}
              />
              <ToolButton
                onClick={() => addBlock("image")}
                icon={<ImageIcon className="h-4 w-4" />}
                label={t("scorm.tools.image")}
              />
              <ToolButton
                onClick={() => addBlock("video")}
                icon={<Video className="h-4 w-4" />}
                label={t("scorm.tools.video")}
              />
              <ToolButton
                onClick={() => addBlock("quiz")}
                icon={<FileQuestion className="h-4 w-4" />}
                label={t("scorm.tools.quiz")}
              />
              <ToolButton
                onClick={() => alert("Interactive blocks coming soon!")}
                icon={<MousePointerClick className="h-4 w-4" />}
                label={t("scorm.tools.interactive")}
              />
              <ToolButton
                onClick={() => alert("Upload feature coming soon!")}
                icon={<Upload className="h-4 w-4" />}
                label={t("scorm.tools.upload")}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function ToolButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center justify-center gap-1 rounded-lg border border-accent/50 bg-accent/20 hover:bg-accent/30 px-2 py-2 text-[11px] sm:text-xs font-medium text-foreground transition-colors disabled:opacity-50 disabled:pointer-events-none"
      disabled={!onClick}
    >
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

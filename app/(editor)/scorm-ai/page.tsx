"use client"

import type React from "react"
import { useState, type FormEvent, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"
import {
  EditorBlock,
  EditorPage,
  EditorProject,
  TextBlock,
  ImageBlock,
  VideoBlock,
  QuizBlock,
} from "@/lib/scorm/types"
import { BlockRenderer } from "@/lib/scorm/block-engine"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { PropertiesPanel } from "@/components/scorm/properties-panel"
import {
  Save,
  Eye,
  Download,
  Type,
  Paperclip,
  FileQuestion,
  MousePointerClick,
  Upload,
  MessageCircle,
  FilePlus,
  Settings,
  LayoutDashboard,
  Clock,
} from "lucide-react"

type Status = "draft" | "published"

type ChatMessage = {
  id: number
  role: "assistant" | "user" | "system"
  content: string
}

export default function ScormAIPage() {
  const { t } = useLocale()

  const initialProject: EditorProject = {
    id: `proj-${Date.now()}`,
    title: t("scorm.ai.untitledProject"),
    language: "en",
    version: "1.0",
    pages: [
      {
        id: "page-1",
        title: t("scorm.ai.introduction"),
        blocks: [],
      },
    ],
  }

  const [project, setProject] = useLocalStorage<EditorProject>("scorm-project", initialProject)

  const hasContent = project.pages.length > 1 || project.pages[0]?.blocks.length > 0
  const [editorMode, setEditorMode] = useState<"choice" | "ai" | "blank">(hasContent ? "ai" : "choice")

  const [activePage, setActivePage] = useState<EditorPage>(project.pages[0])
  const [selectedBlock, setSelectedBlock] = useState<EditorBlock | null>(null)

  const [status, setStatus] = useState<Status>("draft")

  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          role: "assistant",
          content: t("scorm.ai.welcome"),
        },
      ])
    }
  }, [t, messages.length])

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const [aiOpen, setAiOpen] = useState(false)

  // navbar toggle
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    if (typeof document === "undefined") return
    const nav = document.getElementById("main-navbar") as HTMLElement | null
    if (!nav) return

    if (navVisible) {
      nav.style.display = ""
    } else {
      nav.style.display = "none"
    }
  }, [navVisible])

  useEffect(() => {
    const currentPage = project.pages.find((p) => p.id === activePage.id)
    if (currentPage) {
      setActivePage(currentPage)
    }
  }, [project, activePage.id])

  const handleBlockClick = (block: EditorBlock) => {
    setSelectedBlock(block)
  }

  const handleBlockChange = (updatedBlock: EditorBlock) => {
    setProject((prevProject) => {
      const updatedPages = prevProject.pages.map((p) => {
        if (p.id === activePage.id) {
          const updatedBlocks = p.blocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b))
          return { ...p, blocks: updatedBlocks }
        }
        return p
      })
      return { ...prevProject, pages: updatedPages }
    })
    setSelectedBlock(updatedBlock)
  }

  const handleSend = (e: FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: chatInput.trim(),
    }

    setChatInput("")
    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: Date.now() + 1,
        role: "assistant",
        content: t("scorm.ai.notConfigured"),
      },
    ])
  }

  const handleSave = () => {
    console.log("Project saved!", project)
    alert(t("scorm.ai.projectSaved"))
    setStatus("draft")
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
        throw new Error(t("scorm.ai.exportFailed"))
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
      setStatus("published")
    } catch (error) {
      console.error("Failed to export project:", error)
      alert(t("scorm.ai.exportError"))
    }
  }

  const addBlock = (type: EditorBlock["type"], data?: Partial<EditorBlock>) => {
    let newBlock: EditorBlock

    if (data) {
      newBlock = { ...data, id: `block-${Date.now()}`, type } as EditorBlock
    } else {
      const baseBlock = { id: `block-${Date.now()}` }
      switch (type) {
        case "text":
          newBlock = {
            ...baseBlock,
            type: "text",
            html: t("scorm.ai.newTextBlock"),
          }
          break
        case "image":
          newBlock = {
            ...baseBlock,
            type: "image",
            src: "https://via.placeholder.com/600x400",
            alt: t("scorm.ai.placeholderImage"),
          }
          break
        case "video":
          newBlock = {
            ...baseBlock,
            type: "video",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
          }
          break
        case "quiz":
          newBlock = {
            ...baseBlock,
            type: "quiz",
            question: t("scorm.ai.newQuestion"),
            options: [
              { id: "1", label: t("scorm.ai.option1"), correct: true },
              { id: "2", label: t("scorm.ai.option2"), correct: false },
            ],
          }
          break
        default:
          return
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
        <title>${t("scorm.ai.previewTitle", { title: project.title })}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 1000px; margin: 0 auto; color: #333; }
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
                    return (block as TextBlock).html
                  case "image":
                    return `<figure><img src="${(block as ImageBlock).src}" alt="${
                      (block as ImageBlock).alt || t("scorm.ai.placeholderImage")
                    }"><figcaption>${
                      (block as ImageBlock).alt || t("scorm.ai.placeholderImage")
                    }</figcaption></figure>`
                  case "video":
                    return `<video src="${(block as VideoBlock).src}" controls></video>`
                  case "quiz":
                    const quizBlock = block as QuizBlock
                    return `
                  <form onsubmit="event.preventDefault();">
                    <fieldset>
                      <legend>${quizBlock.question}</legend>
                      ${(quizBlock.options || [])
                        .map(
                          (o) => `
                        <div>
                          <input type="radio" id="${o.id}" name="${quizBlock.id}" value="${o.id}">
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

  const handleFileProcess = (file: File) => {
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result

      if (file.type.startsWith("image/")) {
        addBlock("image", { src: result as string, alt: file.name } as ImageBlock)
      } else if (file.type.startsWith("video/")) {
        addBlock("video", { src: result as string } as VideoBlock)
      } else if (file.type === "application/json") {
        try {
          const parsedData = JSON.parse(result as string)
          // Try to load as EditorProject
          if (
            parsedData.id &&
            parsedData.title &&
            Array.isArray(parsedData.pages)
          ) {
            setProject(parsedData as EditorProject)
            setActivePage(parsedData.pages[0])
            setSelectedBlock(null)
            alert(t("scorm.ai.projectLoaded"))
          }
          // Try to load as QuizBlock
          else if (parsedData.question && Array.isArray(parsedData.options)) {
            addBlock("quiz", parsedData as QuizBlock)
          } else {
            console.error("Unknown JSON format:", parsedData)
            alert(t("scorm.ai.invalidJsonFormat"))
          }
        } catch (err) {
          console.error("Error parsing JSON file:", err)
          alert(t("scorm.ai.invalidProjectFile"))
        }
      } else if (file.type === "text/csv") {
        // For CSV, create a text block with preformatted content
        addBlock("text", {
          html: `<pre>${result as string}</pre>`,
        } as TextBlock)
      } else {
        alert(t("scorm.ai.unsupportedFileType", { type: file.type }))
      }
    }

    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      reader.readAsDataURL(file)
    } else if (file.type === "application/json" || file.type === "text/csv") {
      reader.readAsText(file)
    } else {
      alert(t("scorm.ai.unsupportedFileType", { type: file.type }))
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileProcess(file)
    }
    event.target.value = "" // Clear the input so same file can be uploaded again
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      handleFileProcess(file)
      e.dataTransfer.clearData()
    }
  }

  const handleAddMedia = () => {
    const url = window.prompt(t("scorm.tools.mediaPrompt")) || ""
    if (!url.trim()) return

    const imageUrlRegex = /\.(jpeg|jpg|gif|png|webp|svg)$/i
    const videoUrlRegex = /\.(mp4|webm|ogg)$/i

    if (imageUrlRegex.test(url)) {
      addBlock("image", {
        type: "image",
        src: url.trim(),
        alt: t("scorm.ai.media"),
      } as ImageBlock)
    } else if (videoUrlRegex.test(url)) {
      addBlock("video", {
        type: "video",
        src: url.trim(),
      } as VideoBlock)
    } else {
      alert(t("scorm.ai.unsupportedMediaUrl"))
    }
  }

  const handleAddPage = () => {
    const newPage: EditorPage = {
      id: `page-${Date.now()}`,
      title: t("scorm.tools.newPage", { number: project.pages.length + 1 }),
      blocks: [],
    }
    setProject((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
    }))
    setActivePage(newPage)
    setSelectedBlock(null)
  }

  // first screen: choice
  if (editorMode === "choice") {
    const start = (mode: "ai" | "blank") => {
      setProject(initialProject)
      setEditorMode(mode)
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50">
        <div className="text-center max-w-lg bg-white/80 border border-slate-200 rounded-3xl shadow-sm px-8 py-10">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            {t("scorm.choice.title")}
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            {t("scorm.choice.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => start("ai")} className="h-auto py-4 rounded-2xl px-6">
              <div className="flex flex-col items-center gap-1">
                <MessageCircle className="h-6 w-6 mb-1" />
                <span className="font-semibold text-sm">{t("scorm.choice.aiAssistant")}</span>
                <span className="font-normal text-xs text-primary-foreground/80">
                  {t("scorm.choice.aiAssistantDesc")}
                </span>
              </div>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => start("blank")}
              className="h-auto py-4 rounded-2xl px-6 bg-white"
            >
              <div className="flex flex-col items-center gap-1">
                <FilePlus className="h-6 w-6 mb-1" />
                <span className="font-semibold text-sm">{t("scorm.choice.blankPage")}</span>
                <span className="font-normal text-xs text-slate-500">
                  {t("scorm.choice.blankPageDesc")}
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const visibleMessages = messages.slice(-4)

  return (
    <>
      {/* hidden input for upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,application/json,text/csv"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* navbar toggle button */}
      <button
        type="button"
        onClick={() => setNavVisible((v) => !v)}
        className="fixed top-4 left-4 z-[1200] flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800"
        title={navVisible ? t("scorm.nav.hide") : t("scorm.nav.show")}
      >
        <span className="text-xl">☰</span>
      </button>

      {/* full-page background */}
      <div className="min-h-screen bg-slate-50 px-4 sm:px-8 py-6">
        {/* editor wrapper – no max width (takes full page) */}
        <div className="w-full h-full mx-auto flex flex-col">
          <div className="flex-1 relative flex flex-col">
            {/* top bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-50"
                  onClick={handlePreview}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {t("scorm.topbar.preview")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-50"
                  onClick={handleExport}
                >
                  <Download className="h-4 w-4 mr-1" />
                  {t("scorm.topbar.export")}
                </Button>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <Badge
                  variant={status === "draft" ? "secondary" : "default"}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {status === "draft"
                    ? t("scorm.topbar.status.draft")
                    : t("scorm.topbar.status.published")}
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{t("scorm.tools.history")}</span>
                </div>
              </div>
            </div>

            {/* AI popup */}
            {aiOpen && (
              <div className="absolute right-10 top-[90px] z-30 w-full max-w-sm">
                <div className="rounded-2xl bg-white/95 border border-slate-200 shadow-xl px-4 py-3 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100">
                        <MessageCircle className="h-4 w-4 text-sky-700" />
                      </span>
                      <span className="text-sm font-semibold text-slate-800">
                        {t("scorm.ai.title")}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-slate-400 hover:text-slate-600"
                      onClick={() => setAiOpen(false)}
                    >
                      {t("scorm.ai.close")}
                    </button>
                  </div>
                  <div className="max-h-40 overflow-y-auto text-[11px] rounded-xl bg-slate-50 px-3 py-2 border border-slate-100 mb-2">
                    {visibleMessages.length > 0 ? (
                      visibleMessages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex ${
                            m.role === "user" ? "justify-end" : "justify-start"
                          } mb-1`}
                        >
                          <div
                            className={
                              m.role === "user"
                                ? "inline-block rounded-2xl rounded-br-sm bg-sky-600 text-white px-2.5 py-1"
                                : "inline-block rounded-2xl rounded-bl-sm bg-white text-slate-800 px-2.5 py-1 border border-slate-100"
                            }
                          >
                            {m.content}
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-400">
                        {t("scorm.ai.welcome")}
                      </span>
                    )}
                  </div>
                  <form onSubmit={handleSend} className="flex items-center gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={t("scorm.ai.placeholder")}
                      className="text-[11px] rounded-full h-8 bg-slate-50 border-slate-200"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="rounded-full h-8 px-3 text-xs bg-sky-600 hover:bg-sky-700"
                    >
                      {t("scorm.ai.send")}
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {/* canvas + preview (takes all width) */}
            <div className="flex-1 flex items-stretch justify-center mt-4">
              <div
                className={`relative w-full ${isDragging ? "border-2 border-dashed border-sky-500 bg-sky-50/20" : ""}`}
                onClick={() => setSelectedBlock(null)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="bg-sky-50 rounded-[28px] border border-sky-100 shadow-inner px-6 py-6 min-h-[520px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-sm font-semibold mr-2 text-slate-800">
                        {t("scorm.canvas.title")}
                      </h2>
                      <div className="flex flex-wrap gap-1">
                        {project.pages.map((page) => (
                          <button
                            key={page.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActivePage(page)
                              setSelectedBlock(null)
                            }}
                            className={
                              "px-3 py-1 rounded-full text-xs border transition-colors " +
                              (page.id === activePage.id
                                ? "bg-sky-600 text-white border-sky-600"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50")
                            }
                          >
                            {page.title}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-slate-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSave()
                      }}
                    >
                      <Save className="h-4 w-4 text-slate-700" />
                    </Button>
                  </div>

                  <div className="max-h-[600px] overflow-auto pr-1">
                    {activePage.blocks.length > 0 ? (
                      <div className="space-y-4">
                        {activePage.blocks.map((block) => {
                          const isSelected = selectedBlock?.id === block.id
                          return (
                            <div key={block.id} className="relative group">
                              {isSelected && (
                                <div className="absolute -top-2 -left-2 z-20 max-w-xs" onClick={(e) => e.stopPropagation()}>
                                  <div className="rounded-2xl border border-slate-200 bg-white shadow-lg p-2">
                                    <PropertiesPanel
                                      selectedBlock={selectedBlock}
                                      onBlockChange={handleBlockChange}
                                    />
                                  </div>
                                </div>
                              )}

                              <div
                                className={`rounded-2xl border px-4 py-3 bg-white transition-shadow cursor-pointer ${
                                  isSelected
                                    ? "ring-2 ring-sky-500 shadow-md"
                                    : "hover:shadow-sm border-slate-200"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleBlockClick(block)
                                }}
                              >
                                <BlockRenderer block={block} onClick={handleBlockClick} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center space-y-3 py-12">
                        <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                          {t("scorm.canvas.title")}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500">
                          {t("scorm.canvas.desc")}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            addBlock("text")
                          }}
                          className="rounded-full border-sky-500 text-sky-700 hover:bg-sky-50"
                        >
                          <MousePointerClick className="mr-2 h-4 w-4" />
                          {t("scorm.canvas.start")}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating editing bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]">
        <div className="inline-flex items-center gap-0.5 rounded-full bg-white/95 shadow-[0_12px_30px_rgba(15,23,42,0.18)] px-2.5 py-1.5 border border-slate-200 backdrop-blur-md">
          <IconToolButton
            onClick={handleUploadClick}
            icon={<Upload className="h-4 w-4" />}
            label="scorm.tools.upload"
          />
          <IconToolButton
            onClick={() => alert(t("scorm.alerts.interactiveSoon"))}
            icon={<MousePointerClick className="h-4 w-4" />}
            label="scorm.tools.interactive"
          />
          <IconToolButton
            onClick={() => addBlock("quiz")}
            icon={<FileQuestion className="h-4 w-4" />}
            label="scorm.tools.quiz"
          />
          <IconToolButton
            onClick={handleAddPage}
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="scorm.tools.pageEditor"
          />
          <IconToolButton
            onClick={handleAddMedia}
            icon={<Paperclip className="h-4 w-4" />}
            label="scorm.tools.media"
          />
          <IconToolButton
            onClick={() => addBlock("text")}
            icon={<Type className="h-4 w-4" />}
            label="scorm.tools.text"
          />
          <IconToolButton
            onClick={() => setAiOpen((v) => !v)}
            icon={<MessageCircle className="h-4 w-4" />}
            label="scorm.tools.ai"
            emphasis
          />
          <IconToolButton
            onClick={() => alert(t("scorm.alerts.settingsLater"))}
            icon={<Settings className="h-4 w-4" />}
            label="scorm.tools.settings"
          />
        </div>
      </div>
    </>
  )
}

function IconToolButton({
  icon,
  label,
  onClick,
  emphasis,
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  emphasis?: boolean
}) {
  const { t } = useLocale()
  const translatedLabel = t(label as any)
  return (
    <button
      onClick={onClick}
      type="button"
      title={translatedLabel}
      className={
        "flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition-colors " +
        (emphasis ? "bg-sky-600 text-white hover:bg-sky-700" : "hover:bg-slate-100")
      }
      disabled={!onClick}
    >
      {icon}
      <span className="sr-only">{translatedLabel}</span>
    </button>
  )
}

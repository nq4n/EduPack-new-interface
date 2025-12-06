"use client"

import { useState, type FormEvent, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"
import { useSupabase } from "@/components/auth-provider"
import {
  EditorBlock,
  EditorPage,
  EditorProject,
  ExportFormat,
  SCORMVersion,
  TextBlock,
  ImageBlock,
  VideoBlock,
  QuizBlock,
  InteractiveBlock
} from "@/lib/scorm/types"
import { BlockRenderer } from "@/lib/scorm/block-engine"
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
import { useScormAI, type ChatMessage } from "@/hooks/useScormAI"
import { toast } from "sonner";
import { buildScormZip } from "@/lib/scorm/exporter"
type Status = "draft" | "published"

export default function ScormAIPage() {
  const { t } = useLocale()
  const { supabase } = useSupabase()

  const initialProject: EditorProject = {
    id: `proj-${Date.now()}`,
    title: t("scorm.ai.untitledProject"),
    version: "1.0",
    theme: {
      direction: "ltr",
      styles: {},
    },
    tracking: {
      level: "standard",
      pageViews: true,
      quizInteractions: true,
      media: true,
      hints: false,
      externalLinks: false,
      timePerPage: true,
      attempts: true,
    },
    xapi: {
      lrsEndpoint: "",
      authToken: "",
      activityIdFormat: "iri",
      statementExtensions: "{}",
    },
    pages: [
      {
        id: "page-1",
        title: t("scorm.ai.introduction"),
        blocks: [],
      },
    ],
  }

  const [project, setProject] = useState<EditorProject>(initialProject)

  const hasContent = project.pages.length > 1 || project.pages[0]?.blocks.length > 0
  const [editorMode, setEditorMode] = useState<"choice" | "ai" | "blank">(
    hasContent ? "ai" : "choice"
  )

  const [activePageId, setActivePageId] = useState<string>(project.pages[0]?.id)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)

  const [status, setStatus] = useState<Status>("draft")

  const [aiChatMode, setAiChatMode] = useState<"hidden" | "visible" | "animating">("hidden");

  const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([])
  useEffect(() => {
    if (initialMessages.length === 0) {
      setInitialMessages([
        {
          id: 1,
          role: "assistant",
          content: t("scorm.ai.welcome"),
        },
      ])
    }
  }, [t, initialMessages.length])

  const {
    messages,
    chatInput,
    setChatInput,
    isGenerating,
    submitPrompt,
    pendingLesson,
    acceptPendingLesson,
    rejectPendingLesson,
  } = useScormAI({
    setProject,
    setActivePageId,
    setSelectedBlockId,
    setEditorMode,
    setAiChatMode,
    initialMessages,
    onLessonApplied: showHighlights,
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [highlightedBlockIds, setHighlightedBlockIds] = useState<string[]>([])
  const highlightTimerRef = useRef<NodeJS.Timeout | null>(null)



  // navbar toggle
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    const nav = document.getElementById("main-navbar")
    if (!nav) return;

    const originalDisplay = nav.style.display;
    if (navVisible) {
      nav.style.display = originalDisplay || "";
    } else {
      nav.style.display = "none";
    }

    return () => {
      nav.style.display = originalDisplay || "";
    };
  }, [navVisible]);

  const showHighlights = useCallback((ids: string[]) => {
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current)
    }

    setHighlightedBlockIds(ids)

    highlightTimerRef.current = setTimeout(() => {
      setHighlightedBlockIds([])
    }, 4500)
  }, [])

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        clearTimeout(highlightTimerRef.current)
      }
    }
  }, [])

  const activePage = project.pages.find((p) => p.id === activePageId) ?? project.pages[0]

  const selectedBlock =
    activePage.blocks.find((b) => b.id === selectedBlockId) ?? null

  const [rightPanel, setRightPanel] = useState<"block" | "project">("project")

  const handleBlockClick = useCallback((block: EditorBlock) => {
    setSelectedBlockId(block.id)
    setRightPanel("block")
  }, [])

  const handleBlockChange = (updatedBlock: EditorBlock) => {
    setProject((prevProject) => {
      const updatedPages = prevProject.pages.map((p) => {
        if (p.id === activePageId) {
          const updatedBlocks = p.blocks.map((b) =>
            b.id === updatedBlock.id ? updatedBlock : b
          )
          return { ...p, blocks: updatedBlocks }
        }
        return p
      })
      return { ...prevProject, pages: updatedPages }
    })
  }

  const handleSend = async (e: FormEvent) => {
    e.preventDefault()
    const prompt = chatInput.trim()
    if (!prompt) return
    
    // Determine if this is the first generation that transitions the view
    const isInitialGeneration = aiChatMode === "visible"

    submitPrompt(prompt, isInitialGeneration)
  }

  const handleSave = async () => {
    const promise = (async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error("Error getting session:", sessionError)
      }

      if (!session?.access_token) {
        throw new Error("User not logged in (no token from Supabase).")
      }

      const response = await fetch("/api/scorm/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(project),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        const message = errorBody.error ?? "Failed to save package"
        throw new Error(message)
      }

      const { data } = await response.json()
      setStatus("draft")
      return data
    })()

    toast.promise(promise, {
      loading: "Saving package...",
      success: () => `Package saved successfully!`,
      error: (error) => error.message || "Error saving package",
    })
  }
  

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

  const renderStandaloneBlock = (block: EditorBlock) => {
    switch (block.type) {
      case "text": {
        const textBlock = block as TextBlock
        return `<div>${textBlock.html}</div>`
      }
      case "image": {
        const img = block as ImageBlock
        const alt = img.alt || t("scorm.ai.placeholderImage")
        return `<figure><img src="${img.src}" alt="${alt}" /><figcaption>${alt}</figcaption></figure>`
      }
      case "video": {
        const vid = block as VideoBlock
        return `<video src="${vid.src}" controls></video>`
      }
      case "quiz": {
        const quizBlock = block as QuizBlock
        const options = (quizBlock.options || [])
          .map(
            (o) => `
              <label style="display:block;margin-bottom:6px;">
                <input type="radio" name="${quizBlock.id}" value="${o.id}" /> ${o.label}
              </label>
            `,
          )
          .join("\n")

        return `
          <div>
            <p><strong>${quizBlock.question}</strong></p>
            <div>${options}</div>
          </div>
        `
      }
      case "interactive": {
        const interactive = block as InteractiveBlock
        if (interactive.variant === "button") {
          return `<button>${interactive.label || "Interactive"}</button>`
        }

        if (interactive.variant === "callout") {
          return `<div><p><strong>${interactive.label || "Callout"}</strong></p><div>${interactive.bodyHtml || ""}</div></div>`
        }

        if (interactive.variant === "reveal") {
          return `<details ${interactive.initiallyOpen ? "open" : ""}><summary>${interactive.label || "Show"}</summary><div>${
            interactive.bodyHtml || ""
          }</div></details>`
        }

        return `<div>${interactive.customHtml || interactive.bodyHtml || ""}</div>`
      }
      default:
        return ""
    }
  }

  const buildStandaloneHtml = (title: string) => {
    const pagesHtml = project.pages
      .map(
        (page) => `
        <article style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #e5e7eb;">
          <h2 style="margin-bottom:12px;">${page.title}</h2>
          ${page.blocks.map((block) => renderStandaloneBlock(block)).join("\n")}
        </article>
      `,
      )
      .join("\n")

    return `<!DOCTYPE html>
    <html lang="en" dir="${project.theme.direction}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; padding: 24px; max-width: 960px; margin: 0 auto; }
          img, video { max-width: 100%; border-radius: 8px; }
          figure { margin: 0 0 12px 0; }
          figcaption { font-size: 12px; color: #4b5563; text-align: center; }
          button { padding: 8px 14px; border-radius: 999px; background: #0ea5e9; color: white; border: none; cursor: pointer; }
        </style>
      </head>
      <body>
        <h1 style="margin-bottom:16px;">${title}</h1>
        ${pagesHtml}
      </body>
    </html>`
  }

  const buildQtiXml = () => {
    const quizzes = project.pages
      .flatMap((page) => page.blocks.filter((b) => b.type === "quiz") as QuizBlock[])
      .map(
        (quiz) => `
        <assessmentItem identifier="${quiz.id}" title="${quiz.question}" adaptive="false" timeDependent="false">
          <responseDeclaration identifier="RESPONSE" cardinality="single" baseType="identifier" />
          <itemBody>
            <choiceInteraction responseIdentifier="RESPONSE" shuffle="true" maxChoices="1">
              <prompt>${quiz.question}</prompt>
              ${(quiz.options || [])
                .map(
                  (option) => `
                <simpleChoice identifier="${option.id}"${option.correct ? " data-correct=\"true\"" : ""}>${option.label}</simpleChoice>
              `,
                )
                .join("\n")}
            </choiceInteraction>
          </itemBody>
        </assessmentItem>`,
      )
      .join("\n")

    return `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-items>
${quizzes || "<assessmentItem identifier=\"placeholder\" title=\"No quizzes available\" />"}
</qti-assessment-items>`
  }

  const openPrintableReport = (role: "teacher" | "student") => {
    const learningSummary = project.pages
      .map((page, index) => `${index + 1}. ${page.title} (${page.blocks.length} blocks)`).join("<br />")

    const reportHtml = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>${project.title} - ${role} report</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 24px; color: #111827; }
            h1 { margin-bottom: 4px; }
            h2 { margin-bottom: 12px; color: #374151; }
            .meta { color: #6b7280; font-size: 13px; margin-bottom: 16px; }
            .panel { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <h1>${project.title}</h1>
          <div class="meta">Role: ${role === "teacher" ? "Instructor" : "Learner"} • Pages: ${project.pages.length}</div>
          <div class="panel">
            <h2>Lesson outline</h2>
            <div>${learningSummary || "No pages prepared."}</div>
          </div>
          <div class="panel">
            <h2>Notes</h2>
            <p>This printable view can be saved as PDF from your browser's print dialog.</p>
          </div>
        </body>
      </html>`

    const win = window.open("", "_blank")
    if (win) {
      win.document.write(reportHtml)
      win.document.close()
      win.focus()
      win.print()
    } else {
      downloadBlob(new Blob([reportHtml], { type: "text/html" }), `${project.title || "lesson"}-${role}.html`)
    }
  }

  const ensureShareUrl = () => {
    if (shareUrl) return shareUrl
    const html = buildStandaloneHtml(project.title)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    setShareUrl(url)
    return url
  }

  const handleExport = async (format: ExportFormat | SCORMVersion = "1.2") => {
    const target: ExportFormat =
      format === "1.2" ? "scorm12" : format === "2004" ? "scorm2004" : format

    const slug = (project.title || "scorm-package")
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "")
      .toLowerCase()

    try {
      switch (target) {
        case "scorm12":
        case "scorm2004": {
          const blob = await buildScormZip(project, target === "scorm12" ? "1.2" : "2004")
          downloadBlob(blob, `${slug || "scorm-package"}.zip`)
          setStatus("published")
          toast.success(t("scorm.ai.exportSuccess") || "Export completed")
          break
        }
        case "xapi": {
          const payload = {
            exportedAt: new Date().toISOString(),
            project,
            xapi: project.xapi,
            tracking: project.tracking,
          }
          downloadBlob(
            new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
            `${slug || "lesson"}-xapi.json`,
          )
          toast.success("xAPI package ready as JSON")
          break
        }
        case "html5": {
          const html = buildStandaloneHtml(project.title)
          downloadBlob(new Blob([html], { type: "text/html" }), `${slug || "lesson"}-offline.html`)
          toast.success("HTML5 offline page downloaded")
          break
        }
        case "publicLink": {
          const url = ensureShareUrl()
          window.open(url, "_blank")
          toast.success("Opened a shareable preview link")
          break
        }
        case "embedCode": {
          const url = ensureShareUrl()
          const iframe = `<iframe src="${url}" width="100%" height="640" title="${project.title}"></iframe>`
          navigator.clipboard?.writeText(iframe).catch(() => null)
          toast.success("Embed code copied to clipboard")
          break
        }
        case "teacherPdf": {
          openPrintableReport("teacher")
          toast.success("Opened teacher printable view")
          break
        }
        case "studentPdf": {
          openPrintableReport("student")
          toast.success("Opened student printable view")
          break
        }
        case "json": {
          downloadBlob(
            new Blob([JSON.stringify(project, null, 2)], { type: "application/json" }),
            `${slug || "lesson"}.json`,
          )
          toast.success("Project JSON downloaded")
          break
        }
        case "qti": {
          const xml = buildQtiXml()
          downloadBlob(new Blob([xml], { type: "application/xml" }), `${slug || "lesson"}-qti.xml`)
          toast.success("QTI export ready")
          break
        }
      }
  const handleExport = async (version: SCORMVersion = "1.2") => {
    try {
      const blob = await buildScormZip(project, version)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${project.title.replace(/ /g, "_") || "scorm-package"}.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
      setStatus("published")
      toast.success(t("scorm.ai.exportSuccess") || "Export completed")
    } catch (error) {
      console.error("Failed to export project:", error)
      const fallback = t("scorm.ai.exportError")
      const message = error instanceof Error && error.message ? error.message : fallback
      toast.error(message)
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
  case "interactive": {
    const raw = t("scorm.ai.interactive.defaultLabel") as string
    const label =
      raw && raw !== "scorm.ai.interactive.defaultLabel"
        ? raw
        : "Interactive element"

    newBlock = {
      ...baseBlock,
      type: "interactive",
      variant: "button",
      label,
      url: "",
      bodyHtml: "",
      style: {
        padding: "8px",
        radius: "999px",
        background: "#0ea5e9",
        shadow: true,
      },
    } as EditorBlock
    break
  }
  default:
    return
}

    }

    setProject((prevProject) => {
      const updatedPages = prevProject.pages.map((p) => {
        if (p.id === activePageId) {
          const newBlocks = [...p.blocks, newBlock]
          return { ...p, blocks: newBlocks }
        }
        return p
      })
      return { ...prevProject, pages: updatedPages }
    })

    showHighlights([newBlock.id])
    setSelectedBlockId(newBlock.id)
    return newBlock
  }

  const handlePreview = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html dir="${project.theme.direction}">
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
                  case "text": {
                    const textBlock = block as TextBlock
                    const style = textBlock.style || {}
                    const styleString = `
                      font-weight: ${style.bold ? "bold" : "normal"};
                      font-style: ${style.italic ? "italic" : "normal"};
                      text-decoration: ${style.underline ? "underline" : "none"};
                      font-size: ${style.size || "inherit"};
                      text-align: ${style.align || "left"};
                      direction: ${style.direction || "ltr"};
                      color: ${style.color || "inherit"};
                      background: ${style.background || "transparent"};
                      padding: ${style.padding || "0"};
                      border-radius: ${style.radius || "0"};
                      line-height: ${style.lineHeight || "inherit"};
                    `
                    return `<div style="${styleString}">${textBlock.html}</div>`
                  }

                  case "image": {
                    const img = block as ImageBlock
                    const alt = img.alt || t("scorm.ai.placeholderImage")
                    return `<figure><img src="${img.src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`
                  }

                  case "video": {
                    const vid = block as VideoBlock
                    return `<video src="${vid.src}" controls></video>`
                  }

                  case "quiz": {
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
                            `
                            )
                            .join("")}
                        </fieldset>
                      </form>
                    `
                  }

                  case "interactive": {
                    const ib = block as InteractiveBlock
                    const style = ib.style || {}

                    const styleString = `
                      padding: ${style.padding || "10px"};
                      border-radius: ${style.radius || (ib.variant === "button" ? "999px" : "12px")};
                      background: ${style.background || (ib.variant === "button" ? "#0ea5e9" : ib.variant === "callout" ? "#eef2ff" : "#f1f5f9")};
                      box-shadow: ${style.shadow ? "0 8px 20px rgba(0,0,0,0.15)" : "none"};
                      color: ${style.background && (style.background as string).startsWith("#") ? (parseInt((style.background as string).substring(1), 16) > 0xffffff / 2 ? "#000" : "#fff") : "#fff"};
                      border: none;
                    `

                    if (ib.variant === "button") {
                      return `<button style="${styleString}">${ib.label || "Interactive element"}</button>`
                    }

                    if (ib.variant === "callout") {
                      return `<div style="${styleString}">
                        ${ib.label ? `<p><strong>${ib.label}</strong></p>` : ""}
                        ${
                          ib.bodyHtml ||
                          "<p style='font-size:11px;color:#6b7280;'>Add callout content from the editor.</p>"
                        }
                      </div>`
                    }

                    if (ib.variant === "reveal") {
                      return `
                        <details ${ib.initiallyOpen ? "open" : ""} style="${styleString}">
                          <summary>${ib.label || "Details"}</summary>
                          ${
                            ib.bodyHtml ||
                            "<p style='font-size:11px;color:#6b7280;'>Add reveal content from the editor.</p>"
                          }
                        </details>
                      `
                    }

                    if (ib.variant === "custom") {
                      return ib.customHtml || ""
                    }

                    return ""
                  }

                  default:
                    return ""
                }
              })
              .join("")}
          </article>
        `
          )
          .join("")}
      </body>
      </html>
    `
    const previewWindow = window.open("", "_blank")
    if (previewWindow) {
      previewWindow.document.write(htmlContent)
      previewWindow.document.close()
    } else {
      alert(t("scorm.ai.popupBlocked"))
    }
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
            setActivePageId(parsedData.pages[0].id)
            setSelectedBlockId(null)
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

  const handleProjectChange = (updatedProject: EditorProject) => {
    setProject(updatedProject)
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
    setActivePageId(newPage.id)
    setSelectedBlockId(null)
  }

  // Render logic based on editor mode and AI chat state
  if (editorMode === "choice") {
    const start = (mode: "ai" | "blank") => {
      if (mode === "blank") {
        setProject(initialProject)
        setEditorMode(mode) // Sets editorMode to "blank"
      } else { // mode === "ai"
        setAiChatMode("visible")
        setProject(initialProject) // Initialize project for AI build as well
        setEditorMode(mode) // Also sets editorMode to "ai"
      }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50">
        <div className="text-center w-full max-w-2xl bg-white/80 border border-slate-200 rounded-3xl shadow-sm px-4 sm:px-8 py-10">
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

  // Central AI Chat for initial project generation
  if (aiChatMode === "visible" || aiChatMode === "animating") {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">How can I help you today?</h2>
          <p className="text-sm text-slate-500 mb-8">Describe the lesson you want to build, and AI will generate it for you.</p>
          <div className="w-full"> {/* Container for the input form */}
            <form onSubmit={handleSend} className="flex items-center gap-2">
                <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="E.g., 'Create a lesson on the water cycle for 5th graders'"
                    className="flex-1 h-12 rounded-full bg-white border-slate-300 text-base px-5"
                    disabled={isGenerating}
                />
                <Button 
                    type="submit" 
                    className="rounded-full h-12 px-6 bg-sky-600 hover:bg-sky-700 text-base"
                    disabled={isGenerating}
                >
                    {isGenerating ? "Generating..." : "Generate"}
                </Button>
            </form>
            {isGenerating && (
                <div className="text-center text-sm text-slate-500 mt-4">
                    Preparing your lesson and transitioning to the editor...
                </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
      <div className="min-h-screen bg-slate-50 px-4 sm:px-8 pt-24 pb-4">
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

            {/* canvas + properties side-by-side */}
            <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-4 mt-4">
              {/* Chat panel (left) */}
              <div
                className={`w-full lg:w-[320px] xl:w-[360px] transition-all duration-300 opacity-100`}
              >
                <div className="h-full rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
                            <MessageCircle className="h-5 w-5 text-sky-700" />
                        </span>
                        <h3 className="font-semibold text-base text-slate-800">{t("scorm.ai.title")}</h3>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto text-sm space-y-3">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex ${
                            m.role === "user" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={
                                m.role === "user"
                                  ? "inline-block rounded-2xl rounded-br-sm bg-sky-600 text-white px-3 py-2"
                                  : "inline-block rounded-2xl rounded-bl-sm bg-white text-slate-800 px-3 py-2 border border-slate-100"
                              }
                            >
                              {m.agent && m.role !== "user" && (
                                <div className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">
                                  {m.agent === "mentor"
                                    ? "Mentor AI"
                                    : m.agent === "contentArchitect"
                                    ? "Content Architect"
                                    : m.agent === "assessmentDesigner"
                                    ? "Assessment Designer"
                                    : ""}
                                </div>
                              )}
                            <div>{m.content}</div>
                          </div>
                        </div>
                      ))}
                      {pendingLesson && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3 space-y-2 shadow-sm">
                          <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">
                            {t("scorm.ai.pendingChanges") || "Pending approval"}
                          </div>
                          <p className="text-xs text-emerald-900">
                            {`"${pendingLesson.result.project.title}" has ${pendingLesson.result.project.pages.length} page(s) with ${
                              pendingLesson.result.project.pages.reduce(
                                (total, page) => total + (page.blocks?.length || 0),
                                0,
                              )
                            } block(s). Difficulty: ${pendingLesson.result.metadata.predictedDifficulty}. Tags: ${pendingLesson.result.metadata.recommendedTags.join(", ") || "n/a"}.`}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {pendingLesson.result.project.pages.slice(0, 3).map((page) => (
                              <Badge key={page.id} variant="secondary" className="bg-white text-emerald-800 border-emerald-200">
                                {page.title}: {page.blocks.length} block(s)
                              </Badge>
                            ))}
                          </div>
                          {pendingLesson.result.warnings.length > 0 && (
                            <div className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">
                              {`Warnings: ${pendingLesson.result.warnings.join("; ")}`}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="h-8 px-3" onClick={acceptPendingLesson}>
                              {t("scorm.ai.acceptChanges") || "Apply changes"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-3"
                              onClick={rejectPendingLesson}
                            >
                              {t("scorm.ai.rejectChanges") || "Discard"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 border-t bg-slate-50 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          {t("scorm.ai.quickInsert") || "Quick insert"}
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full"
                          onClick={() => addBlock("text")}
                        >
                          <Type className="h-3.5 w-3.5 mr-1.5" />
                          {t("scorm.ai.addText") || "Text"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full"
                          onClick={() => addBlock("image")}
                        >
                          <Paperclip className="h-3.5 w-3.5 mr-1.5" />
                          {t("scorm.ai.addImage") || "Image"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full"
                          onClick={() => addBlock("video")}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1.5" />
                          {t("scorm.ai.addVideo") || "Video"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full"
                          onClick={() => addBlock("quiz")}
                        >
                          <FileQuestion className="h-3.5 w-3.5 mr-1.5" />
                          {t("scorm.ai.addQuiz") || "Quiz"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full"
                          onClick={() => addBlock("interactive")}
                        >
                          <MousePointerClick className="h-3.5 w-3.5 mr-1.5" />
                          {t("scorm.ai.addInteractive") || "Interactive"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full"
                          onClick={handleAddPage}
                        >
                          <LayoutDashboard className="h-3.5 w-3.5 mr-1.5" />
                          {t("scorm.ai.addPage") || "Page"}
                        </Button>
                      </div>
                      <form onSubmit={handleSend} className="flex items-center gap-2">
                          <Input
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              placeholder={t("scorm.ai.placeholder")}
                              className="flex-1 h-9 rounded-full bg-white border-slate-200"
                              disabled={isGenerating}
                          />
                          <Button type="submit" size="sm" className="rounded-full h-9 px-4 bg-sky-600 hover:bg-sky-700" disabled={isGenerating}>
                              {t("scorm.ai.send")}
                          </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Canvas (center) */}
              <div
                className={`relative flex-1 ${
                  isDragging ? "border-2 border-dashed border-sky-500 bg-sky-50/20" : ""
                }`}
                onClick={() => {
                  setSelectedBlockId(null)
                  setRightPanel("block")
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div
                  dir={project.theme.direction}
                  className="bg-white rounded-2xl px-6 py-6 min-h-[520px]"
                >
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
                              setActivePageId(page.id)
                              setSelectedBlockId(null)
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
                    {activePage && activePage.blocks.length > 0 ? (
                      <div className="space-y-4">
                        {activePage.blocks.map((block) => {
                          const isSelected = selectedBlock?.id === block.id
                          const isHighlighted = highlightedBlockIds.includes(block.id)
                          return (
                            <div key={block.id}>
                              <div
                                className={`rounded-2xl border px-4 py-3 bg-white transition-shadow cursor-pointer ${
                                  isSelected
                                    ? "ring-2 ring-sky-500 shadow-md"
                                    : "hover:shadow-sm border-slate-200"
                                } ${
                                  isHighlighted
                                    ? "bg-emerald-50 border-emerald-200 ring-2 ring-emerald-300/70"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleBlockClick(block)
                                }}
                              >
                                <BlockRenderer
                                  block={block}
                                  theme={project.theme}
                                />
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

              {/* Properties panel (right) */}
              <div
                className={`w-full lg:w-[320px] xl:w-[360px] transition-all duration-300 opacity-100`}
              >
                <div className="h-full rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <PropertiesPanel
                    project={project}
                    onProjectChange={handleProjectChange}
                    selectedBlock={selectedBlock}
                    onBlockChange={handleBlockChange}
                    panelType={rightPanel}
                    onAddPage={handleAddPage}
                    onExport={handleExport}
                  />
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
            onClick={() => addBlock("interactive")}
            icon={<MousePointerClick className="h-4 w-4" />}
            label="scorm.tools.interactive"
          />
          <IconToolButton
            onClick={() => addBlock("quiz")}
            icon={<FileQuestion className="h-4 w-4" />}
            label="scorm.tools.quiz"
          />
          <IconToolButton
            onClick={() => {
              setRightPanel("project")
              setSelectedBlockId(null)
            }}
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
  onClick={() => {
    setRightPanel("project")
    setSelectedBlockId(null)
  }}
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

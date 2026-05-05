"use client"

import { useState, useCallback, useEffect } from "react"
import { EditorProject } from "@/lib/scorm/types"
import { ChatMessage, ScormAIHookProps } from "@/lib/scorm/ai-types"

const OFFLINE_MESSAGE =
  "Browser is offline. Reconnect or disable DevTools Offline mode, then try again."

function getAiErrorMessage(err: unknown) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return OFFLINE_MESSAGE
  }

  if (err instanceof TypeError && /Failed to fetch/i.test(err.message)) {
    return "Could not reach the AI service. Check your connection or confirm the local dev server is still running."
  }

  if (err instanceof Error && err.message) {
    return err.message
  }

  return "AI failed"
}

// --------------------------------------------------------
// NORMALIZE PROJECT (prevents undefined.style.direction errors)
// --------------------------------------------------------
function normalizeProject(project: EditorProject): EditorProject {
  if (!project) return project

  const defaultTracking = {
    level: "standard" as const,
    pageViews: true,
    quizInteractions: true,
    media: true,
    hints: false,
    externalLinks: false,
    timePerPage: true,
    attempts: true,
  }

  const defaultXapi = {
    lrsEndpoint: "",
    authToken: "",
    activityIdFormat: "iri",
    statementExtensions: "{}",
  }

  return {
    id: project.id || `proj-${Date.now()}`,
    title: project.title || "Untitled Lesson",
    version: project.version || "1.2",

    // 🔥 FIX #1 — Always include theme
    theme: {
      direction: project.theme?.direction || "ltr",
      styles: project.theme?.styles || {},
    },

    // 🔥 FIX #2 — Always include tracking
    tracking: {
      ...defaultTracking,
      ...(project.tracking || {}),
    },

    // 🔥 FIX #3 — Always include xapi
    xapi: {
      ...defaultXapi,
      ...(project.xapi || {}),
    },

    // Pages + Blocks normalization
    pages: (project.pages || []).map((page) => ({
      id: page.id || `page-${Date.now()}`,
      title: page.title || "Untitled Page",

      // 🔥 FIX #4 — Always include blocks array
      blocks: (page.blocks || []).map((block) => ({
        ...block,

        // 🔥 FIX #5 — Always include style
        style: block.style || {},
      }))
    }))
  }
}



// --------------------------------------------------------
// APPLY PATCH
// --------------------------------------------------------
function applyPatch(project: EditorProject, patch: any): EditorProject {
  const { pageId, blockId } = patch?.target || {}

  if (!pageId || !blockId) {
    throw new Error("AI patch did not include a valid pageId and blockId.")
  }

  const targetPage = project.pages.find((page) => page.id === pageId)
  const targetBlock = targetPage?.blocks.find((block) => block.id === blockId)

  if (!targetPage || !targetBlock) {
    throw new Error("AI patch targeted a block that does not exist in this lesson.")
  }

  return normalizeProject({
    ...project,
    pages: project.pages.map((page) => {
      if (page.id !== pageId) return page

      return {
        ...page,
        blocks: page.blocks.map((block) =>
          block.id === blockId
            ? { ...block, ...patch.update }
            : block
        ),
      }
    }),
  })
}

// --------------------------------------------------------
// APPLY APPEND BLOCK
// --------------------------------------------------------
function applyAppendBlock(project: EditorProject, payload: any): EditorProject {
  const { pageId, block } = payload

  if (!pageId || !project.pages.some((page) => page.id === pageId)) {
    throw new Error("AI appendBlock targeted a page that does not exist in this lesson.")
  }

  if (!block?.id || !block?.type) {
    throw new Error("AI appendBlock did not include a valid block.")
  }

  return normalizeProject({
    ...project,
    pages: project.pages.map((page) =>
      page.id === pageId
        ? { ...page, blocks: [...page.blocks, block] }
        : page
    ),
  })
}

// --------------------------------------------------------
// APPLY APPEND PAGE
// --------------------------------------------------------
function applyAppendPage(project: EditorProject, payload: any): EditorProject {
  return normalizeProject({
    ...project,
    pages: [...project.pages, payload.page],
  })
}

function applyReplacePage(project: EditorProject, payload: any): EditorProject {
  const nextPage = payload.page || payload
  const pageExists = project.pages.some((page) => page.id === payload.pageId)

  if (!payload.pageId || !nextPage?.id) {
    throw new Error("AI replacePage did not include a valid page.")
  }

  return normalizeProject({
    ...project,
    pages: pageExists
      ? project.pages.map((page) =>
          page.id === payload.pageId ? nextPage : page
        )
      : [...project.pages, nextPage],
  })
}

function applyReplaceProject(payload: any): EditorProject {
  const nextProject = payload.project || payload
  return normalizeProject(nextProject)
}

// --------------------------------------------------------
// EXTRACT PROJECT FROM BUILD RESPONSE
// --------------------------------------------------------
function extractProject(result: any): EditorProject | null {
  if (result?.project?.pages) return normalizeProject(result.project)
  return null
}

// --------------------------------------------------------
// MAIN HOOK
// --------------------------------------------------------
export function useScormAI({
  project,
  setProject,
  setActivePageId,
  setSelectedBlockId,
  setEditorMode,
  setAiChatMode,
  initialMessages,
  selection,
  onLessonApplied,
}: ScormAIHookProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [chatInput, setChatInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progressMessage, setProgressMessage] = useState("Waiting for input...")

  // Initialize messages
  useEffect(() => {
    if (initialMessages.length && messages.length === 0) {
      setMessages(initialMessages)
    }
  }, [initialMessages, messages.length])

  const addMessage = (msg: ChatMessage) =>
    setMessages((prev) => [...prev, msg])

  // --------------------------------------------------------
  // SUBMIT PROMPT
  // --------------------------------------------------------
  const submitPrompt = useCallback(
    async (prompt: string, isInitial?: boolean) => {
      if (!prompt.trim()) return

      setIsGenerating(true)
      setProgressMessage("AI is thinking...")

      const userMsg: ChatMessage = {
        id: Date.now(),
        role: "user",
        content: prompt,
      }

      addMessage(userMsg)
      setChatInput("")

      try {
        if (typeof navigator !== "undefined" && navigator.onLine === false) {
          throw new Error(OFFLINE_MESSAGE)
        }

        // 1) Build payload for AI
        let rawMessages = [...messages, userMsg]

        // Keep the provider request valid by starting with the latest user context.
        while (rawMessages.length > 0 && rawMessages[0].role === "assistant") {
          rawMessages.shift()
        }

        const payloadMessages = rawMessages.map((m) => ({
          role: m.role,
          content: m.content,
        }))

        // 2) Call API
        const res = await fetch("/api/scorm/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: payloadMessages,
            project,
            selection,
          }),
        })

        const json = await res.json()

        if (!res.ok) throw new Error(json.error || "AI error")

        // Add assistant message to chat
        addMessage({
          id: Date.now() + 1,
          role: "assistant",
          content: JSON.stringify(json, null, 2),
          agent: "unified",
        })

        // ------------------------------------------
        // HANDLE AI RESULT
        // ------------------------------------------
        let updatedProject = project
        let highlight: string[] = []
        let nextActivePageId = project.pages[0]?.id || null
        let nextSelectedBlockId: string | null = null

        // BUILD MODE
        if (json.project) {
          updatedProject = normalizeProject(json.project)
          highlight = updatedProject.pages.flatMap((p) =>
            p.blocks.map((b) => b.id)
          )
          nextActivePageId = updatedProject.pages[0]?.id || null

          setEditorMode("ai")
          setAiChatMode("hidden")
        }

        // EDIT MODE - PATCH
        else if (json.patch) {
          updatedProject = applyPatch(project, json.patch)
          highlight = [json.patch.target.blockId]
          nextActivePageId = json.patch.target.pageId
          nextSelectedBlockId = json.patch.target.blockId
        }

        // EXTEND - BLOCK
        else if (json.appendBlock) {
          updatedProject = applyAppendBlock(project, json.appendBlock)
          highlight = [json.appendBlock.block.id]
          nextActivePageId = json.appendBlock.pageId
          nextSelectedBlockId = json.appendBlock.block.id
        }

        // EXTEND - PAGE
        else if (json.appendPage) {
          updatedProject = applyAppendPage(project, json.appendPage)
          highlight = json.appendPage.page.blocks.map((b: any) => b.id)
          nextActivePageId = json.appendPage.page.id
        }

        else if (json.replacePage) {
          updatedProject = applyReplacePage(project, json.replacePage)
          highlight = (json.replacePage.page?.blocks || []).map((b: any) => b.id)
          nextActivePageId = json.replacePage.pageId
        }

        else if (json.replaceProject) {
          updatedProject = applyReplaceProject(json.replaceProject)
          highlight = updatedProject.pages.flatMap((p) =>
            p.blocks.map((b) => b.id)
          )
          nextActivePageId = updatedProject.pages[0]?.id || null

          setEditorMode("ai")
          setAiChatMode("hidden")
        }

        else {
          throw new Error("Unrecognized AI output format")
        }

        // Update project state
        setProject(updatedProject)
        setSelectedBlockId(nextSelectedBlockId)

        // Set page
        if (nextActivePageId) setActivePageId(nextActivePageId)

        onLessonApplied(highlight)
        setProgressMessage("Done!")
      } catch (err: any) {
        console.error("❌ Unified AI error:", err)

        const message = getAiErrorMessage(err)

        addMessage({
          id: Date.now() + 99,
          role: "assistant",
          content: message,
        })

        setChatInput(prompt)
        setProgressMessage(message)
      } finally {
        setIsGenerating(false)
      }
    },
    [messages, project, selection]
  )

  // --------------------------------------------------------
  // RETURN HOOK
  // --------------------------------------------------------
  return {
    messages,
    chatInput,
    setChatInput,
    isGenerating,
    progressMessage,
    submitPrompt,
  }
}

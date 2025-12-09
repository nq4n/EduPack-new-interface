"use client"

import { useState, useCallback, useEffect } from "react"
import { EditorProject } from "@/lib/scorm/types"
import { ChatMessage, ScormAIHookProps } from "@/lib/scorm/ai-types"

// --------------------------------------------------------
// NORMALIZE PROJECT (prevents undefined.style.direction errors)
// --------------------------------------------------------
function normalizeProject(project: EditorProject): EditorProject {
  if (!project) return project

  return {
    id: project.id || `proj-${Date.now()}`,
    title: project.title || "Untitled Lesson",
    version: project.version || "1.0",

    // 🔥 FIX #1 — Always include theme
    theme: {
      direction: "ltr",
      styles: {},
      ...(project.theme || {})
    },

    // 🔥 FIX #2 — Always include tracking
    tracking: {
      level: "standard",
      pageViews: true,
      quizInteractions: true,
      media: true,
      hints: false,
      externalLinks: false,
      timePerPage: true,
      attempts: true,
      ...(project.tracking || {})
    },

    // 🔥 FIX #3 — Always include xapi
    xapi: {
      lrsEndpoint: "",
      authToken: "",
      activityIdFormat: "iri",
      statementExtensions: "{}",
      ...(project.xapi || {})
    },

    // Pages + Blocks normalization
    pages: (project.pages || []).map((page) => ({
      id: page.id,
      title: page.title || "Untitled Page",

      // 🔥 FIX #4 — Always include blocks array
      blocks: (page.blocks || []).map((block) => ({
        ...block,

        // 🔥 FIX #5 — Always include style
        style: {
          direction: "ltr",
          ...(block.style || {})
        }
      }))
    }))
  }
}



// --------------------------------------------------------
// APPLY PATCH
// --------------------------------------------------------
function applyPatch(project: EditorProject, patch: any): EditorProject {
  const { pageId, blockId } = patch.target

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
        // 1) Build payload for AI
        let rawMessages = [...messages, userMsg]

        // Remove assistant messages at the top (OpenRouter/Nova rule)
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

        // BUILD MODE
        if (json.project) {
          updatedProject = normalizeProject(json.project)
          highlight = updatedProject.pages.flatMap((p) =>
            p.blocks.map((b) => b.id)
          )

          setEditorMode("ai")
          setAiChatMode("hidden")
        }

        // EDIT MODE - PATCH
        else if (json.patch) {
          updatedProject = applyPatch(project, json.patch)
          highlight = [json.patch.target.blockId]
        }

        // EXTEND - BLOCK
        else if (json.appendBlock) {
          updatedProject = applyAppendBlock(project, json.appendBlock)
          highlight = [json.appendBlock.block.id]
        }

        // EXTEND - PAGE
        else if (json.appendPage) {
          updatedProject = applyAppendPage(project, json.appendPage)
          highlight = json.appendPage.page.blocks.map((b) => b.id)
        }

        else {
          throw new Error("Unrecognized AI output format")
        }

        // Update project state
        console.log("🔥 DEBUG PROJECT BEFORE SET:", JSON.stringify(updatedProject, null, 2))
        setProject(updatedProject)
        setSelectedBlockId(null)

        // Set page
        const firstPage = updatedProject.pages[0]?.id
        if (firstPage) setActivePageId(firstPage)

        onLessonApplied(highlight)
        setProgressMessage("Done!")
      } catch (err: any) {
        console.error("❌ Unified AI error:", err)

        addMessage({
          id: Date.now() + 99,
          role: "assistant",
          content: err.message || "AI failed",
        })

        setProgressMessage("Error")
      } finally {
        setIsGenerating(false)
      }
    },
    [messages, project]
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

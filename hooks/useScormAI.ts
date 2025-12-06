"use client"

import { useState, useCallback } from "react"
import { EditorProject } from "@/lib/scorm/types"
import { ChatMessage, ScormAIHookProps, AISuggestion } from "@/lib/scorm/ai-types"

export function useScormAI({
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
  const [pendingLesson, setPendingLesson] = useState<AISuggestion | null>(null)

  // Append user message + AI response
  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg])
  }

  // Accept AI lesson changes
  const acceptPendingLesson = () => {
    if (!pendingLesson) return

    const newProject = pendingLesson.result.project as EditorProject

    setProject(newProject)

    if (newProject.pages.length > 0) {
      setActivePageId(newProject.pages[0].id)
      setSelectedBlockId(null)
    }

    onLessonApplied(
      newProject.pages.flatMap((p) => p.blocks.map((b) => b.id))
    )

    setPendingLesson(null)
    setEditorMode("ai")
    setAiChatMode("hidden")
  }

  // Reject AI lesson
  const rejectPendingLesson = () => {
    setPendingLesson(null)
  }

  // AI prompt handler
  const submitPrompt = useCallback(
    async (prompt: string, isInitialGeneration: boolean) => {
      if (!prompt.trim()) return

      setIsGenerating(true)

      const userMessage: ChatMessage = {
        id: Date.now(),
        role: "user",
        content: prompt,
      }

      addMessage(userMessage)
      setChatInput("")

      try {
        const payloadMessages = [...messages, userMessage].map(
          ({ role, content }) => ({ role, content })
        )

        const response = await fetch("/api/scorm/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: payloadMessages }),
        })

        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json")
        const data = isJson ? await response.json() : null

        if (!response.ok) {
          const message = (data as { error?: string })?.error
          throw new Error(message || response.statusText || "AI generation failed")
        }

        const aiResponse = (data as AISuggestion | null) ?? null

        const aiMessage: ChatMessage = {
          id: Date.now() + 1,
          role: aiResponse?.role || "assistant",
          content: aiResponse?.content || aiResponse?.message || "Generated lesson.",
          agent: aiResponse?.agent || undefined,
        }

        addMessage(aiMessage)

        // If AI generated lesson structure:
        if (aiResponse?.result?.project) {
          setPendingLesson(aiResponse)

          if (isInitialGeneration) {
            setAiChatMode("animating")
            setTimeout(() => {
              setAiChatMode("hidden")
              setEditorMode("ai")
            }, 600)
          }
        }
      } catch (err) {
        console.error("AI error:", err)

        const errorMessage =
          err instanceof Error ? err.message : "AI response could not be parsed"
        addMessage({
          id: Date.now() + 2,
          role: "assistant",
          content: errorMessage,
        })
      } finally {
        setIsGenerating(false)
      }
    },

    [messages, setAiChatMode, setEditorMode]
  )

  return {
    messages,
    chatInput,
    setChatInput,
    isGenerating,
    submitPrompt,
    pendingLesson,
    acceptPendingLesson,
    rejectPendingLesson,
  }
}

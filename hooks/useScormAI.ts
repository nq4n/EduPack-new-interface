import { useState, useCallback } from "react"
import { EditorProject } from "@/lib/scorm/types"

type ChatMessage = {
  id: number
  role: "assistant" | "user" | "system"
  content: string
}

type UseScormAIProps = {
  setProject: (project: EditorProject) => void
  setActivePageId: (id: string | null) => void
  setSelectedBlockId: (id:string | null) => void
  setEditorMode: (mode: "choice" | "ai" | "blank") => void
  setAiChatMode: (mode: "hidden" | "visible" | "animating") => void
  initialMessages: ChatMessage[]
}

export function useScormAI({
  setProject,
  setActivePageId,
  setSelectedBlockId,
  setEditorMode,
  setAiChatMode,
  initialMessages,
}: UseScormAIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [chatInput, setChatInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleNewUserMessage = (prompt: string) => {
    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: prompt,
    }
    const thinkingMessage: ChatMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content: "Building your lesson, please wait...",
    }
    setMessages((prev) => [...prev, userMessage, thinkingMessage])
    setChatInput("")
  }

  const handleAIResponse = (result: any, isInitialGeneration: boolean) => {
    // Update project state with the result from the AI
    setProject(result.project)
    setActivePageId(result.project.pages[0]?.id || null)
    setSelectedBlockId(null)

    const summary = `I've created a new lesson titled "${result.project.title}".
      \n- **Difficulty**: ${result.metadata.predictedDifficulty}
      \n- **Tags**: ${result.metadata.recommendedTags.join(", ")}
      \n${result.warnings.length > 0 ? `\n**Warnings**:\n- ${result.warnings.join("\n- ")}` : ""}`

    const assistantMessage: ChatMessage = {
      id: Date.now() + 2,
      role: "assistant",
      content: summary,
    }

    setMessages((prev) => {
      const updated = [...prev]
      updated[updated.length - 1] = assistantMessage
      return updated
    })

    if (isInitialGeneration) {
      setAiChatMode("animating")
      setTimeout(() => {
        setAiChatMode("hidden")
        setEditorMode("ai")
      }, 1000)
    }
  }

  const handleAIError = (error: any) => {
    const errorMessage: ChatMessage = {
      id: Date.now() + 2,
      role: "assistant",
      content: `Sorry, I ran into an error: ${error.message}`,
    }
    setMessages((prev) => {
      const updated = [...prev]
      updated[updated.length - 1] = errorMessage
      return updated
    })
  }

  const submitPrompt = useCallback(async (prompt: string, isInitialGeneration: boolean) => {
    if (!prompt || isGenerating) return

    setIsGenerating(true)
    handleNewUserMessage(prompt)

    try {
      const response = await fetch("/api/ai/lesson/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, language: "en" }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "An unknown error occurred.")
      handleAIResponse(result, isInitialGeneration)
    } catch (error: any) {
      handleAIError(error)
    } finally {
      setIsGenerating(false)
    }
  }, [isGenerating]) // Dependencies will be managed by useCallback

  return { messages, chatInput, setChatInput, isGenerating, submitPrompt }
}
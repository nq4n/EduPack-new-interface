import { useState, useCallback, useEffect } from "react"
import { BuildLessonResult, EditorProject } from "@/lib/scorm/types"
import { buildLessonPackage } from "@/lib/ai/orchestrator"

export type AgentRole = "user" | "mentor" | "contentArchitect" | "assessmentDesigner"

export type ChatMessage = {
  id: number
  role: "assistant" | "user" | "system"
  content: string
  agent?: AgentRole
}

type UseScormAIProps = {
  setProject: (project: EditorProject) => void
  setActivePageId: (id: string | null) => void
  setSelectedBlockId: (id: string | null) => void
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

  useEffect(() => {
    if (initialMessages.length > 0 && messages.length === 0) {
      setMessages(initialMessages)
    }
  }, [initialMessages, messages.length])

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }

  const summarizeBlocks = (project: EditorProject) =>
    project.pages.reduce((total, page) => total + (page.blocks?.length || 0), 0)

  const handleAIResponse = (
    result: BuildLessonResult,
    isInitialGeneration: boolean,
  ) => {
    setProject(result.project)
    setActivePageId(result.project.pages[0]?.id || null)
    setSelectedBlockId(null)

    addMessage({
      id: Date.now(),
      role: "assistant",
      agent: "mentor",
      content: `Open router orchestration merged the outputs into "${result.project.title}" with ${result.project.pages.length} pages. Difficulty: ${result.metadata.predictedDifficulty}. Tags: ${result.metadata.recommendedTags.join(", ") || "n/a"}.`,
    })

    if (result.warnings.length > 0) {
      addMessage({
        id: Date.now() + 1,
        role: "assistant",
        agent: "mentor",
        content: `Warnings noted: ${result.warnings.join("; ")}`,
      })
    }

    if (isInitialGeneration) {
      setAiChatMode("animating")
      setTimeout(() => {
        setAiChatMode("hidden")
        setEditorMode("ai")
      }, 1000)
    }
  }

  const handleAIError = (error: any) => {
    addMessage({
      id: Date.now(),
      role: "assistant",
      agent: "mentor",
      content: `Sorry, I ran into an error: ${error.message}`,
    })
  }

  const submitPrompt = useCallback(
    async (prompt: string, isInitialGeneration: boolean) => {
      if (!prompt || isGenerating) return

      setIsGenerating(true)
      setChatInput("")

      const now = Date.now()
      addMessage({ id: now, role: "user", agent: "user", content: prompt })
      addMessage({ id: now + 1, role: "assistant", agent: "mentor", content: "Routing request to AI levels..." })

      try {
        const result = await buildLessonPackage(prompt)
        const blockCount = summarizeBlocks(result.project)

        addMessage({
          id: Date.now() + 2,
          role: "assistant",
          agent: "mentor",
          content: result.metadata.routerSummary,
        })

        addMessage({
          id: Date.now() + 3,
          role: "assistant",
          agent: "contentArchitect",
          content: `Level 2 generated ${result.project.pages.length} page(s) with ${blockCount} block(s).`,
        })

        addMessage({
          id: Date.now() + 4,
          role: "assistant",
          agent: "assessmentDesigner",
          content: `Level 1 ML suggests difficulty ${result.metadata.predictedDifficulty} with tags ${result.metadata.recommendedTags.join(", ") || "n/a"}.`,
        })

        if (result.warnings.length > 0) {
          addMessage({
            id: Date.now() + 5,
            role: "assistant",
            agent: "mentor",
            content: `Level 0 checks flagged: ${result.warnings.join("; ")}`,
          })
        }

        handleAIResponse(result, isInitialGeneration)
      } catch (error: any) {
        handleAIError(error)
      } finally {
        setIsGenerating(false)
      }
    },
    [isGenerating]
  ) // Dependencies will be managed by useCallback

  return { messages, chatInput, setChatInput, isGenerating, submitPrompt }
}

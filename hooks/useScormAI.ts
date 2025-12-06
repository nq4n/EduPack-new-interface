import { useState, useCallback, useEffect } from "react"
import {
  EditorBlock,
  EditorPage,
  EditorProject,
  QuizBlock,
  InteractiveBlock,
} from "@/lib/scorm/types"

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

  const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }

  const applyDefaults = (project: EditorProject): EditorProject => {
    return {
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
      ...project,
    }
  }

  const planLesson = async (prompt: string) => {
    const lessonSummary = `Lesson on ${prompt}`
    const learningObjectives = [
      `Understand the core ideas of ${prompt}`,
      `Apply ${prompt} concepts in realistic scenarios`,
      `Reflect on how ${prompt} connects to prior knowledge`,
    ]
    const contentTasks = [
      "Design introduction and contextual overview",
      "Outline main learning sequence with examples",
      "Highlight visuals or media to support comprehension",
    ]
    const assessmentTasks = [
      "Create formative quiz questions",
      "Design an interactive activity",
      "Summarize key takeaways for reflection",
    ]

    return { lessonSummary, learningObjectives, contentTasks, assessmentTasks }
  }

  const buildContent = async (prompt: string, plan: Awaited<ReturnType<typeof planLesson>>) => {
    const introPage: EditorPage = {
      id: generateId("page"),
      title: `Introduction to ${prompt}`,
      blocks: [
        {
          id: generateId("block"),
          type: "text",
          html: `<p>${plan.lessonSummary}</p>`,
        },
        {
          id: generateId("block"),
          type: "image",
          src: "https://placehold.co/600x360",
          alt: `${prompt} illustration`,
        },
      ],
    }

    const conceptPage: EditorPage = {
      id: generateId("page"),
      title: `${prompt} in Practice`,
      blocks: [
        {
          id: generateId("block"),
          type: "text",
          html: `<p>Walk through a practical scenario that demonstrates ${prompt}. Emphasize steps and reasoning so learners can follow along.</p>`,
        },
        {
          id: generateId("block"),
          type: "video",
          src: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
      ],
    }

    return {
      pages: [introPage, conceptPage],
    }
  }

  const buildAssessments = async (
    prompt: string,
    plan: Awaited<ReturnType<typeof planLesson>>,
    _content: Awaited<ReturnType<typeof buildContent>>
  ) => {
    const quiz: QuizBlock = {
      id: generateId("quiz"),
      type: "quiz",
      question: `What is a key idea about ${prompt}?`,
      options: [
        { id: generateId("opt"), label: `It helps us understand ${prompt} better`, correct: true },
        { id: generateId("opt"), label: `It replaces all other concepts`, correct: false },
        { id: generateId("opt"), label: `It is unrelated to learning objectives`, correct: false },
      ],
    }

    const interactive: InteractiveBlock = {
      id: generateId("interactive"),
      type: "interactive",
      variant: "callout",
      label: "Reflection",
      bodyHtml: `<p>List two ways ${prompt} could be applied in your classroom or workplace.</p>`,
      style: {
        padding: "12px",
        radius: "12px",
        background: "#ecfeff",
        shadow: true,
      },
    }

    return {
      quizzes: [quiz],
      interactive: [interactive],
    }
  }

  const adaptBlocks = (blocks: EditorBlock[]) => {
    return blocks.map((block) => {
      const id = block.id || generateId("block")
      if (block.type === "quiz") {
        const options = block.options?.map((opt) => ({
          ...opt,
          id: opt.id || generateId("opt"),
        }))
        return { ...block, id, options }
      }
      return { ...block, id }
    }) as EditorBlock[]
  }

  const mergeOutputs = (
    prompt: string,
    plan: Awaited<ReturnType<typeof planLesson>>,
    content: Awaited<ReturnType<typeof buildContent>>,
    assessments: Awaited<ReturnType<typeof buildAssessments>>
  ) => {
    const pages: EditorPage[] = content.pages.map((page) => ({
      ...page,
      id: page.id || generateId("page"),
      blocks: adaptBlocks(page.blocks || []),
    }))

    const assessmentPage: EditorPage = {
      id: generateId("page"),
      title: "Knowledge Check",
      blocks: [
        ...assessments.quizzes.map((quiz) => ({ ...quiz, type: "quiz" as const })),
        ...assessments.interactive.map((interaction) => ({ ...interaction, type: interaction.type })),
      ],
    }

    const project: EditorProject = applyDefaults({
      id: `proj-${Date.now()}`,
      title: plan.lessonSummary || `Lesson on ${prompt}`,
      version: "1.0",
      theme: { direction: "ltr", styles: {} },
      pages: [...pages, assessmentPage],
    })

    const warnings: string[] = pages.length === 0 ? ["No pages generated"] : []
    const recommendedTags = plan.learningObjectives.map((objective) => objective.split(" ")[0].replace(/[^a-zA-Z]/g, "").toLowerCase())
    const metadata = {
      predictedDifficulty: plan.learningObjectives.length > 3 ? "medium" : "easy",
      recommendedTags: Array.from(new Set(recommendedTags.filter(Boolean))),
    } as const

    return { project, warnings, metadata }
  }

  const handleAIResponse = (
    result: ReturnType<typeof mergeOutputs>,
    isInitialGeneration: boolean,
  ) => {
    setProject(result.project)
    setActivePageId(result.project.pages[0]?.id || null)
    setSelectedBlockId(null)

    addMessage({
      id: Date.now(),
      role: "assistant",
      agent: "mentor",
      content: `I've merged the content and assessments into "${result.project.title}" with ${result.project.pages.length} pages. Difficulty: ${result.metadata.predictedDifficulty}. Tags: ${result.metadata.recommendedTags.join(", ") || "n/a"}.`,
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

  const submitPrompt = useCallback(async (prompt: string, isInitialGeneration: boolean) => {
    if (!prompt || isGenerating) return

    setIsGenerating(true)
    setChatInput("")

    addMessage({ id: Date.now(), role: "user", agent: "user", content: prompt })
    addMessage({ id: Date.now() + 1, role: "assistant", agent: "mentor", content: "Planning lesson blueprint..." })

    try {
      const plan = await planLesson(prompt)
      addMessage({
        id: Date.now() + 2,
        role: "assistant",
        agent: "mentor",
        content: `Plan ready. Summary: ${plan.lessonSummary}. Objectives: ${plan.learningObjectives.join("; ")}.`,
      })

      const content = await buildContent(prompt, plan)
      addMessage({
        id: Date.now() + 3,
        role: "assistant",
        agent: "contentArchitect",
        content: `Content structure prepared with ${content.pages.length} pages covering ${plan.contentTasks.join(", ")}.`,
      })

      const assessments = await buildAssessments(prompt, plan, content)
      addMessage({
        id: Date.now() + 4,
        role: "assistant",
        agent: "assessmentDesigner",
        content: `Assessment draft includes ${assessments.quizzes.length} quiz and ${assessments.interactive.length} interactive block(s) focusing on ${plan.assessmentTasks.join(", ")}.`,
      })

      const merged = mergeOutputs(prompt, plan, content, assessments)
      handleAIResponse(merged, isInitialGeneration)
    } catch (error: any) {
      handleAIError(error)
    } finally {
      setIsGenerating(false)
    }
  }, [isGenerating]) // Dependencies will be managed by useCallback

  return { messages, chatInput, setChatInput, isGenerating, submitPrompt }
}

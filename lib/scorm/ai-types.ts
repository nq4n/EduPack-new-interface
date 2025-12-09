import { EditorProject } from "./types"

export interface ChatMessage {
  id: number | string
  role: "system" | "user" | "assistant"
  content: string
  agent?: string
}

export interface AISuggestion {
  id?: number | string
  role?: "assistant"
  content?: string
  message?: string
  agent?: string
  result?: {
    project?: EditorProject
  }
}

export interface ScormAIHookProps {
  project: EditorProject
  setProject: (project: EditorProject) => void
  setActivePageId: (id: string) => void
  setSelectedBlockId: (id: string | null) => void
  setEditorMode: (mode: "choice" | "ai" | "blank") => void
  setAiChatMode: (mode: "hidden" | "visible" | "animating") => void
  initialMessages: ChatMessage[]
  onLessonApplied: (blockIds: string[]) => void
}

import { EditorBlock, EditorProject } from "./types"

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

export type AiSelectionScope = "selection" | "page" | "lesson"

export interface AiSelectionContext {
  scope: AiSelectionScope
  pageId?: string | null
  pageTitle?: string | null
  blockId?: string | null
  blockType?: EditorBlock["type"] | null
}

export interface ScormAIHookProps {
  project: EditorProject
  setProject: (project: EditorProject) => void
  setActivePageId: (id: string) => void
  setSelectedBlockId: (id: string | null) => void
  setEditorMode: (mode: "choice" | "ai" | "blank") => void
  setAiChatMode: (mode: "hidden" | "visible" | "animating") => void
  initialMessages: ChatMessage[]
  selection: AiSelectionContext
  onLessonApplied: (blockIds: string[]) => void
}

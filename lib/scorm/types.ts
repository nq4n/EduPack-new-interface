// lib/scorm/types.ts

export type SCORMVersion = "1.2" | "2004"

export interface SCORMManifestItem {
  id: string
  title: string
  href: string
}

export interface SCORMManifestResource {
  id: string
  href: string
  files: string[]
}

export interface SCORMManifest {
  identifier: string
  title: string
  organization: string
  items: SCORMManifestItem[]
  resources: SCORMManifestResource[]
}

/**
 * Your internal project shape coming from the editor.
 * You can extend this later with more fields.
 */
export interface EditorProject {
  id: string
  title: string
  version?: SCORMVersion
  language?: string
  pages: EditorPage[]
}

export interface EditorPage {
  id: string
  title: string
  blocks: EditorBlock[]
}

export type EditorBlock = TextBlock | ImageBlock | VideoBlock | QuizBlock | InteractiveBlock

export interface TextBlock {
  type: "text"
  id: string
  html: string // already sanitized HTML from your editor or AI
}

export interface ImageBlock {
  type: "image"
  id: string
  src: string
  alt?: string
}

export interface VideoBlock {
  type: "video"
  id: string
  src: string
}

export interface QuizBlock {
  type: "quiz"
  id: string
  question: string
  options: {
    id: string
    label: string
    correct: boolean
  }[]
}

export interface InteractiveBlock {
  type: "interactive"
  id: string
  description?: string
  // keep it generic for now – you can refine later
  config: Record<string, unknown>
}

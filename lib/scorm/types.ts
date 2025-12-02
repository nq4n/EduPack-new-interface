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
  theme: {
    direction: "ltr" | "rtl"
    styles: any // For global styles
  }
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
  style?: any
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

export type QuizBlock = {
  id: string
  type: "quiz"
  question: string
  questionHtml?: string
  questionStyle?: any
  options: {
    id: string
    label: string
    correct?: boolean
  }[]
  style?: any          // container
  optionStyle?: any    // 🔹 shared style for options
}


//

export type InteractiveVariant = "button" | "callout" | "reveal" | "custom"

export type InteractiveBlock = {
  id: string
  type: "interactive"
  variant: InteractiveVariant
  label: string
  url?: string
  bodyHtml?: string
  initiallyOpen?: boolean
  tone?: "info" | "success" | "warning" | "danger"

  // 🔹 NEW:
  style?: any
}

export interface BuildLessonResult {
    project: EditorProject;
    warnings: string[];
    metadata: {
        predictedDifficulty: "easy" | "medium" | "hard";
        recommendedTags: string[];
    };
}


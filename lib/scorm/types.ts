// lib/scorm/types.ts

export type SCORMVersion = "1.2" | "2004"
export type ExportFormat =
  | "scorm12"
  | "scorm2004"
  | "xapi"
  | "html5"
  | "publicLink"
  | "embedCode"
  | "teacherPdf"
  | "studentPdf"
  | "json"
  | "qti"

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
  tracking: EditorProjectTracking // New: Tracking settings
  xapi: EditorProjectXapi // New: xAPI specific settings
}

// New: Interface for project tracking settings
export interface EditorProjectTracking {
  level: "minimal" | "standard" | "advanced"
  pageViews: boolean
  quizInteractions: boolean
  media: boolean
  hints: boolean
  externalLinks: boolean
  timePerPage: boolean
  attempts: boolean
}

// New: Interface for xAPI specific settings
export interface EditorProjectXapi {
  lrsEndpoint: string
  authToken: string
  activityIdFormat: string
  statementExtensions: string // JSON string
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
  style?: any
}

export interface VideoBlock {
  type: "video"
  id: string
  src: string
  style?: any
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
  action?: "link" | "page" | "none"
  targetPageId?: string
  bodyHtml?: string
  initiallyOpen?: boolean
  tone?: "info" | "success" | "warning" | "danger"

  // 🔹 NEW:
  style?: any
}

export interface RouterAnalysis {
    language: "en" | "ar";
    intent: string;
    audience: string;
    route: ("level2" | "level1" | "level0")[];
    notes?: string;
}

export interface BuildLessonResult {
    project: EditorProject;
    warnings: string[];
    metadata: {
        predictedDifficulty: "easy" | "medium" | "hard";
        recommendedTags: string[];
        routerSummary: string;
        routing: RouterAnalysis;
    };
}


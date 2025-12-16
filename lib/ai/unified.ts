import { extractJSON } from "./utils-json"
import { nanoid } from "./nanoid"
import { openrouter } from "./openrouter"

/* -----------------------------------------------------
   TYPES
----------------------------------------------------- */

export interface UnifiedInput {
  project: any | null
  messages: { role: "user" | "assistant" | "system", content: string }[]
}

type Mode = "build" | "extend" | "edit"

/* -----------------------------------------------------
   MAIN ENTRY
----------------------------------------------------- */

export async function unifiedAI({ project, messages }: UnifiedInput) {
  const cleanMessages = sanitizeMessages([...messages])

  // 1️⃣ FAST AI ROUTER
  const mode = await detectModeAI(project, cleanMessages)

  // 2️⃣ HARD-CODED SYSTEM PROMPT
  const systemPrompt = buildSystemPrompt(mode, project)

  const llmMessages = [
    { role: "system", content: systemPrompt },
    ...cleanMessages
  ]

  // 3️⃣ MAIN MODEL CALL
  const raw = await openrouter.chat(llmMessages, { model: "MAIN" })
  const json = extractJSON(raw)

  // 4️⃣ NORMALIZE OUTPUT
  return normalizeOutput(mode, json)
}

/* -----------------------------------------------------
   MESSAGE SANITIZER
----------------------------------------------------- */

function sanitizeMessages(messages: any[]) {
  while (messages.length > 0 && messages[0].role === "assistant") {
    messages.shift()
  }
  return messages
}

/* -----------------------------------------------------
   AI MODE ROUTER (ULTRA FAST)
----------------------------------------------------- */

async function detectModeAI(project: any | null, messages: any[]): Promise<Mode> {
  const userText = messages[messages.length - 1]?.content || ""

  const routerPrompt = `
You are a mode router for EduPack.

Decide the correct mode based on the user message and project state.

Modes:
- build → create a full lesson from scratch
- extend → add new pages or sections
- edit → modify existing content

Rules:
- Respond with ONLY ONE WORD
- Lowercase only
- No punctuation
- No explanation
- Output must be one of: build, extend, edit

Project state:
${project ? "Project exists" : "No project"}

User message:
${userText}
`

  const raw = await openrouter.chat(
    [{ role: "system", content: routerPrompt }],
    { model: "ROUTER" }
  )

  const mode = raw.trim().toLowerCase()

  if (mode === "build" || mode === "extend" || mode === "edit") {
    return mode
  }

  // Safe fallback
  return "edit"
}

/* -----------------------------------------------------
   SYSTEM PROMPTS
----------------------------------------------------- */

function buildSystemPrompt(mode: Mode, project: any) {

  if (mode === "build") {
    return `
You are EduPack Unified Builder AI.
Your job: generate a complete SCORM-ready lesson.

Return ONLY JSON:

{
  "project": {
    "id": "proj-...",
    "title": "...",
    "pages": [
      {
        "id": "page-1",
        "title": "...",
        "blocks": [
          { "id": "b1", "type": "text", "html": "..." }
        ]
      }
    ]
  }
}

SCORM block schema:
- Text → { "id": "...", "type": "text", "html": "...", "style?": any }
- Image → { "id": "...", "type": "image", "src": "https://...", "alt?": "..." }
- Video → { "id": "...", "type": "video", "src": "https://..." }
- Quiz → { "id": "...", "type": "quiz", "question": "...", "options": [{ "id": "...", "label": "...", "correct?": bool }], "questionHtml?": "...", "style?": any, "optionStyle?": any }
- Interactive → { "id": "...", "type": "interactive", "variant": "button"|"callout"|"reveal"|"custom", "label": "...", "url?": "...", "bodyHtml?": "...", "initiallyOpen?": bool, "tone?": "info"|"success"|"warning"|"danger", "style?": any }

Rules:
- Always include ids for project/pages/blocks.
- Use multiple pages.
- Add quizzes, examples, images if helpful.
- Never leave html/src/question empty.
- Use open resource links for images/videos.
- Do not include explanations outside JSON.
`
  }

  if (mode === "extend") {
    return `
You are EduPack Lesson EXTENDER AI.
User wants to add NEW pages or sections to the existing project.

Return ONLY JSON like:

{
  "appendPage": {
    "page": {
      "id": "page-new",
      "title": "...",
      "blocks": [...]
    }
  }
}

Rules:
- Do NOT overwrite or modify existing pages.
- No full project output.
- IDs must be unique.
- All blocks must follow the SCORM block schema.
`
  }

  // EDIT MODE
  return `
You are EduPack Lesson Editor AI.
Modify ONLY what the user requested.

Allowed outputs ONLY:

1) Patch block:
{
  "patch": {
    "target": { "pageId": "...", "blockId": "..." },
    "update": { ...fields }
  }
}

2) Append new block:
{
  "appendBlock": {
    "pageId": "...",
    "block": { ... }
  }
}

Rules:
- NEVER send entire project unless explicitly asked.
- NEVER delete content unless explicitly asked.
- ONLY modify or add.
- Output must be pure JSON.
- All blocks must follow the SCORM block schema.
- Use open resource links for images/videos.
`
}

/* -----------------------------------------------------
   OUTPUT NORMALIZER
----------------------------------------------------- */

function normalizeOutput(mode: Mode, json: any) {

  if (mode === "build") {
    if (!json.project) {
      throw new Error("AI did not return project in build mode.")
    }
    return json
  }

  if (mode === "extend") {
    if (!json.appendPage) {
      throw new Error("AI did not return appendPage.")
    }

    json.appendPage.page.id ||= `page-${nanoid()}`
    json.appendPage.page.blocks ||= []

    json.appendPage.page.blocks.forEach((b: any) => {
      b.id ||= `block-${nanoid()}`
    })

    return json
  }

  // edit
  if (json.patch) return json

  if (json.appendBlock) {
    json.appendBlock.block.id ||= `block-${nanoid()}`
    return json
  }

  throw new Error("AI did not return patch or appendBlock in edit mode.")
}

/* -----------------------------------------------------
   EXPORT
----------------------------------------------------- */

export default {
  unifiedAI
}
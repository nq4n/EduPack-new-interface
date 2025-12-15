// lib/ai/unified.ts
import { extractJSON } from "./utils-json"
import { nanoid } from "./nanoid"
import { openrouter } from "./openrouter"

export interface UnifiedInput {
  project: any | null
  messages: { role: "user" | "assistant" | "system", content: string }[]
}

export async function unifiedAI({ project, messages }: UnifiedInput) {
  const mode = detectMode(project, messages)

  const systemPrompt = buildSystemPrompt(mode, project)
  function sanitizeMessages(messages) {
  // Remove assistant messages at the start
  while (messages.length > 0 && messages[0].role === "assistant") {
    messages.shift()
  }
  return messages
}

    const cleanMessages = sanitizeMessages([...messages])

    const llmMessages = [
      { role: "system", content: systemPrompt },
      ...cleanMessages
    ]

  const raw = await openrouter.chat(llmMessages)
  const json = extractJSON(raw)

  return normalizeOutput(mode, json)
}

/* -----------------------------------------------------
   MODE DETECTION
----------------------------------------------------- */

function detectMode(project: any | null, messages: any[]) {
  const userText = messages[messages.length - 1]?.content?.toLowerCase() || ""

  if (!project || !project.pages || project.pages.length === 0) return "build"
  if (project.pages.length === 1 && project.pages[0].blocks.length === 0) return "build"

  // Explicit keywords for BUILD again
  const buildKeywords = ["build", "create lesson", "full lesson", "generate", "start over"]
  if (buildKeywords.some(k => userText.includes(k))) return "build"

  // Extend keywords → New section/page
  const extendKeywords = ["add page", "new page", "new section", "extend", "more topics"]
  if (extendKeywords.some(k => userText.includes(k))) return "extend"

  // Otherwise → Edit Mode
  return "edit"
}

/* -----------------------------------------------------
   SYSTEM PROMPTS
----------------------------------------------------- */

function buildSystemPrompt(mode: string, project: any) {

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

SCORM block schema (all inserted blocks must follow one of these):
- Text → { "id": "...", "type": "text", "html": "...", "style?": any }
- Image → { "id": "...", "type": "image", "src": "https://...", "alt?": "..." }
- Video → { "id": "...", "type": "video", "src": "https://..." }
- Quiz → { "id": "...", "type": "quiz", "question": "...", "options": [{ "id": "...", "label": "...", "correct?": bool }], "questionHtml?": "...", "style?": any, "optionStyle?": any }
- Interactive → { "id": "...", "type": "interactive", "variant": "button"|"callout"|"reveal"|"custom", "label": "...", "url?": "...", "bodyHtml?": "...", "initiallyOpen?": bool, "tone?": "info"|"success"|"warning"|"danger", "style?": any }

Rules:
- Always include ids for project/pages/blocks.
- Use multiple pages.
- Add quizzes, examples, images if helpful.
- Never leave html/src/question empty; fill every block field with meaningful content.
- Do not include explanations outside JSON.
- When you insert images use open resource links; don't make them empty.
`
  }

  if (mode === "extend") {
    return `
You are EduPack Lesson EXTENDER AI.
User wants to add NEW pages/sections to the existing project.
Do NOT modify existing content.

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
- Do NOT overwrite old pages.
- No full project output.
- IDs must be unique.
- Every block inside appendPage must follow the SCORM block schema listed above.
`
  }

  // EDIT MODE
  return `
You are EduPack Lesson Editor AI.
Modify ONLY what user requested.

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
- NEVER send entire project  if the user dose not mention that.
- NEVER delete content if the user dose not mention that.
- ONLY modify or add.
- Output must be pure JSON.
- Do not include explanations outside JSON
- When you appendBlock, the block must follow the SCORM block schema listed above and include a non-empty id and content.
- when you insert images use open resource links don't make it empty

`
}

/* -----------------------------------------------------
   OUTPUT NORMALIZER
----------------------------------------------------- */

function normalizeOutput(mode: string, json: any) {

  // BUILD MODE
  if (mode === "build") {
    if (!json.project) throw new Error("AI did not return project in build mode.")
    return json
  }

  // EXTEND MODE
  if (mode === "extend") {
    if (!json.appendPage) throw new Error("AI did not return appendPage.")
    // Ensure IDs
    json.appendPage.page.id = json.appendPage.page.id || `page-${nanoid()}`
    json.appendPage.page.blocks = json.appendPage.page.blocks || []
    json.appendPage.page.blocks.forEach((b: any) => {
      b.id = b.id || `block-${nanoid()}`
    })
    return json
  }

  // EDIT MODE
  if (mode === "edit") {
    if (json.patch) {
      return json
    }
    if (json.appendBlock) {
      json.appendBlock.block.id ||= `block-${nanoid()}`
      return json
    }
    throw new Error("AI did not return patch or appendBlock in edit mode.")
  }
}

/* -----------------------------------------------------
   EXPORT
----------------------------------------------------- */

export default {
  unifiedAI
}

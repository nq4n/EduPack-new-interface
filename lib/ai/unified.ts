import { extractJSON } from "./utils-json"
import { nanoid } from "./nanoid"
import { openai } from "./openai"
import { AiSelectionContext } from "../scorm/ai-types"

export interface UnifiedInput {
  project: any | null
  messages: { role: "user" | "assistant" | "system"; content: string }[]
  selection?: AiSelectionContext | null
}

type Mode = "build" | "extend" | "edit"

type SelectionSnapshot = {
  scope: "selection" | "page" | "lesson"
  page: any | null
  block: any | null
}

export async function unifiedAI({ project, messages, selection }: UnifiedInput) {
  const cleanMessages = sanitizeMessages([...messages])
  const selectionSnapshot = resolveSelection(project, selection)
  const mode = await detectModeAI(project, cleanMessages, selectionSnapshot)
  const systemPrompt = buildSystemPrompt(mode, project, selectionSnapshot)

  const llmMessages = [
    { role: "system", content: systemPrompt },
    ...cleanMessages,
  ]

  const raw = await openai.chat(llmMessages, { maxTokens: 4096 })
  const json = extractJSON(raw)

  return normalizeOutput(json, selectionSnapshot, project)
}

function sanitizeMessages(messages: any[]) {
  while (messages.length > 0 && messages[0].role === "assistant") {
    messages.shift()
  }
  return messages
}

function resolveSelection(
  project: any | null,
  selection?: AiSelectionContext | null
): SelectionSnapshot {
  const pages = Array.isArray(project?.pages) ? project.pages : []
  const page =
    pages.find((candidate: any) => candidate.id === selection?.pageId) ||
    pages[0] ||
    null
  const block =
    page?.blocks?.find((candidate: any) => candidate.id === selection?.blockId) ||
    null

  const scope =
    selection?.scope === "selection" && block
      ? "selection"
      : selection?.scope === "lesson" || !page
        ? "lesson"
        : "page"

  return { scope, page, block }
}

function buildSelectionSummary(selection: SelectionSnapshot) {
  return JSON.stringify(
    {
      scope: selection.scope,
      pageId: selection.page?.id || null,
      pageTitle: selection.page?.title || null,
      blockId: selection.block?.id || null,
      blockType: selection.block?.type || null,
    },
    null,
    2
  )
}

function buildEditingContext(project: any | null, selection: SelectionSnapshot) {
  if (!project) {
    return "No existing project."
  }

  if (selection.scope === "selection" && selection.page && selection.block) {
    return JSON.stringify(
      {
        page: {
          id: selection.page.id,
          title: selection.page.title,
        },
        block: selection.block,
      },
      null,
      2
    )
  }

  if (selection.scope === "page" && selection.page) {
    return JSON.stringify(selection.page, null, 2)
  }

  return JSON.stringify(project, null, 2)
}

async function detectModeAI(
  project: any | null,
  messages: any[],
  selection: SelectionSnapshot
): Promise<Mode> {
  const userText = messages[messages.length - 1]?.content || ""

  const routerPrompt = `
You are a mode router for EduPack.

Choose the best mode for the user's request.

Modes:
- build: create a lesson from scratch
- extend: add new content such as a block, section, or page
- edit: modify, restyle, rewrite, reorganize, or regenerate existing content

Rules:
- Respond with exactly one word.
- Output must be one of: build, extend, edit
- Use edit for redesigns, rewrites, page-level refreshes, and targeted changes.
- Use extend only when the main intent is adding new material.

Project state:
${project ? "Project exists" : "No project"}

Current selection:
${buildSelectionSummary(selection)}

User message:
${userText}
`

  const raw = await openai.chat(
    [{ role: "system", content: routerPrompt }],
    { maxTokens: 32 },
  )

  const mode = raw.trim().toLowerCase()

  if (mode === "build" || mode === "extend" || mode === "edit") {
    return mode
  }

  return project ? "edit" : "build"
}

function buildSystemPrompt(
  mode: Mode,
  project: any | null,
  selection: SelectionSnapshot
) {
  const selectionSummary = buildSelectionSummary(selection)
  const editingContext = buildEditingContext(project, selection)

  const sharedSchema = `
SCORM block schema:
- Text -> { "id": "...", "type": "text", "html": "...", "style?": any }
- Image -> { "id": "...", "type": "image", "src": "https://...", "alt?": "..." }
- Video -> { "id": "...", "type": "video", "src": "https://..." }
- SVG -> { "id": "...", "type": "svg", "svg": "<svg viewBox='...'>...</svg>", "caption?": "...", "style?": any }
- Quiz -> { "id": "...", "type": "quiz", "question": "...", "options": [{ "id": "...", "label": "...", "correct?": bool }], "questionHtml?": "...", "style?": any, "optionStyle?": any }
- Interactive -> { "id": "...", "type": "interactive", "variant": "button"|"callout"|"reveal"|"custom", "label": "...", "url?": "...", "action?": "link"|"page"|"none", "targetPageId?": "...", "bodyHtml?": "...", "initiallyOpen?": bool, "tone?": "info"|"success"|"warning"|"danger", "style?": any, "customHtml?": "..." }

Always keep IDs stable when updating existing content unless you are creating a new block or page.
Never leave html/src/question empty.
Use open resource links for images/videos.
Return pure JSON only.
`

  if (mode === "build") {
    return `
You are EduPack Unified Builder AI.
Create a complete SCORM-ready lesson.

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

${sharedSchema}

Rules:
- Use multiple pages when the topic benefits from it.
- Add quizzes, examples, images, and interactions when useful.
- Do not include explanations outside JSON.
`
  }

  if (mode === "extend") {
    return `
You are EduPack Lesson Extender AI.
Add new content to the lesson without removing or rewriting existing content.

Current target:
${selectionSummary}

Relevant lesson context:
${editingContext}

Allowed outputs:

1) Append block to an existing page:
{
  "appendBlock": {
    "pageId": "...",
    "block": { ... }
  }
}

2) Append page:
{
  "appendPage": {
    "page": {
      "id": "page-new",
      "title": "...",
      "blocks": [...]
    }
  }
}

${sharedSchema}

Rules:
- Prefer appendBlock when the user is adding to the current page.
- Use appendPage only when the user explicitly wants a new page or the content clearly needs a new page.
- Do not overwrite existing blocks or pages in extend mode.
`
  }

  return `
You are EduPack Lesson Editor AI.
Edit the lesson precisely against the current target and current lesson context.

Current target:
${selectionSummary}

Relevant lesson context:
${editingContext}

Allowed outputs:

1) Patch an existing block:
{
  "patch": {
    "target": { "pageId": "...", "blockId": "..." },
    "update": { ...fields }
  }
}

2) Append a new block:
{
  "appendBlock": {
    "pageId": "...",
    "block": { ... }
  }
}

3) Replace an entire page:
{
  "replacePage": {
    "pageId": "...",
    "page": {
      "id": "...",
      "title": "...",
      "blocks": [...]
    }
  }
}

4) Replace the full lesson:
{
  "replaceProject": {
    "project": {
      "id": "...",
      "title": "...",
      "pages": [...]
    }
  }
}

${sharedSchema}

Rules:
- If the target scope is selection, prefer patch or appendBlock unless the user explicitly asks to redesign the whole page or lesson.
- If the target scope is selection, patch.target.pageId MUST equal the selected pageId and patch.target.blockId MUST equal the selected blockId.
- If the target scope is page, appendBlock.pageId and replacePage.pageId MUST equal the selected pageId.
- If the target scope is lesson, use replaceProject only for whole-lesson changes spanning multiple pages or the overall structure/theme.
- Never delete content unless the user explicitly asks for deletion or replacement.
`
}

function ensureBlock(block: any) {
  return {
    ...block,
    id: block?.id || `block-${nanoid()}`,
  }
}

function ensurePage(page: any, fallbackId?: string) {
  return {
    ...page,
    id: page?.id || fallbackId || `page-${nanoid()}`,
    blocks: Array.isArray(page?.blocks) ? page.blocks.map(ensureBlock) : [],
  }
}

function ensureProject(project: any) {
  return {
    ...project,
    id: project?.id || `proj-${nanoid()}`,
    pages: Array.isArray(project?.pages) ? project.pages.map((page: any) => ensurePage(page)) : [],
  }
}

function pageExists(project: any | null, pageId: string | undefined | null) {
  return Array.isArray(project?.pages) && project.pages.some((page: any) => page.id === pageId)
}

function blockExists(project: any | null, pageId: string | undefined | null, blockId: string | undefined | null) {
  const page = Array.isArray(project?.pages)
    ? project.pages.find((candidate: any) => candidate.id === pageId)
    : null

  return Array.isArray(page?.blocks) && page.blocks.some((block: any) => block.id === blockId)
}

function normalizeOutput(json: any, selection: SelectionSnapshot, project: any | null) {
  if (json.project) {
    json.project = ensureProject(json.project)
    return json
  }

  if (json.replaceProject?.project) {
    json.replaceProject.project = ensureProject(json.replaceProject.project)
    return json
  }

  if (json.replacePage?.page) {
    const pageId =
      selection.scope !== "lesson" && selection.page?.id
        ? selection.page.id
        : json.replacePage.pageId || json.replacePage.page.id || `page-${nanoid()}`

    json.replacePage.pageId = pageId
    json.replacePage.page = ensurePage(
      { ...json.replacePage.page, id: pageId },
      pageId
    )
    return json
  }

  if (json.appendPage?.page) {
    json.appendPage.page = ensurePage(json.appendPage.page)
    return json
  }

  if (json.appendBlock?.block) {
    if (selection.page?.id) {
      json.appendBlock.pageId = selection.page.id
    }

    if (!pageExists(project, json.appendBlock.pageId)) {
      throw new Error("AI returned appendBlock for a page outside the selected lesson context.")
    }

    json.appendBlock.block = ensureBlock(json.appendBlock.block)
    return json
  }

  if (json.patch) {
    if (selection.scope === "selection") {
      if (!selection.page?.id || !selection.block?.id) {
        throw new Error("AI returned a selection patch without an active selected block.")
      }

      json.patch.target = {
        ...(json.patch.target || {}),
        pageId: selection.page.id,
        blockId: selection.block.id,
      }
    }

    if (!blockExists(project, json.patch.target?.pageId, json.patch.target?.blockId)) {
      throw new Error("AI returned a patch for a block outside the selected lesson context.")
    }

    return json
  }

  throw new Error(
    "AI did not return a supported action. Expected project, patch, appendBlock, appendPage, replacePage, or replaceProject."
  )
}

export default {
  unifiedAI,
}

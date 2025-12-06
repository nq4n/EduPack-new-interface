
import { EditorProject, EditorBlock, TextBlock, QuizBlock } from "@/lib/scorm/types"

// Level 1: lightweight heuristics that mimic ML scoring for UX purposes.

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

function wordCount(text: string): number {
  const cleaned = stripHtml(text)
  if (!cleaned) return 0
  return cleaned.split(/\s+/).length
}

function countQuizBlocks(blocks: EditorBlock[]): number {
  return blocks.filter((block): block is QuizBlock => block.type === "quiz").length
}

function averageWordsPerPage(pages: EditorProject["pages"]): number {
  if (pages.length === 0) return 0
  const totalWords = pages.reduce((sum, page) => {
    const pageText = page.blocks
      .filter((block): block is TextBlock => block.type === "text")
      .map((block) => wordCount(block.html))
      .reduce((acc, count) => acc + count, 0)
    return sum + pageText
  }, 0)

  return Math.round(totalWords / pages.length)
}

/**
 * Predicts the difficulty of a lesson package using interpretable heuristics that mirror
 * a light ML model. This provides consistent messaging for the UI without requiring
 * heavyweight inference dependencies.
 */
export async function predictDifficulty(project: EditorProject): Promise<"easy" | "medium" | "hard"> {
  const numPages = project.pages.length
  const totalBlocks = project.pages.reduce((acc, page) => acc + page.blocks.length, 0)
  const quizCount = project.pages.reduce((acc, page) => acc + countQuizBlocks(page.blocks), 0)
  const avgWords = averageWordsPerPage(project.pages)

  // Progressive thresholds inspired by readability scoring.
  if (numPages <= 1 && avgWords < 120 && quizCount === 0) {
    return "easy"
  }

  const contentDensityScore = avgWords + quizCount * 40 + totalBlocks * 5
  const structuralScore = numPages * 25
  const combinedScore = contentDensityScore + structuralScore

  if (combinedScore < 400) {
    return "medium"
  }

  return "hard"
}

/**
 * Recommends tags for a lesson based on transparent keyword-style features that map well
 * to the UI chip set. This remains deterministic so the page can reliably surface them.
 */
export async function recommendTags(project: EditorProject): Promise<string[]> {
  const body = project.pages
    .map((p) => p.blocks.map((b) => ("html" in b ? (b as TextBlock).html : "")).join(" "))
    .join(" ")
    .toLowerCase()

  const tags = new Set<string>()

  const add = (tag: string) => tags.add(tag)

  if (body.includes("math") || body.includes("fraction") || body.includes("algebra")) add("Math")
  if (body.includes("reading") || body.includes("story") || body.includes("essay")) add("Literacy")
  if (body.includes("ecosystem") || body.includes("habitat") || body.includes("climate")) add("Science")
  if (body.includes("history") || body.includes("civilization") || body.includes("ancient")) add("Social Studies")

  const hasMedia = project.pages.some((p) => p.blocks.some((b) => b.type === "image" || b.type === "video"))
  const hasInteractive = project.pages.some((p) => p.blocks.some((b) => b.type === "interactive"))
  const hasQuizzes = project.pages.some((p) => p.blocks.some((b) => b.type === "quiz"))

  if (hasMedia) add("Multimedia")
  if (hasInteractive) add("Interactive")
  if (hasQuizzes) add("Assessment")

  if (tags.size === 0) add("General")

  return Array.from(tags)
}

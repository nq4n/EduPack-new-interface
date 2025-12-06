
import { EditorProject, QuizBlock, TextBlock, ImageBlock } from "@/lib/scorm/types"

// Level 0: deterministic rules for quick feedback on generated lessons.

function hasCorrectAnswer(quiz: QuizBlock): boolean {
  return quiz.options.some((option) => option.correct === true)
}

function hasSubstantiveText(block: TextBlock): boolean {
  const stripped = block.html.replace(/<[^>]*>/g, "").trim()
  return stripped.length >= 40
}

function hasAccessibleAlt(image: ImageBlock): boolean {
  return Boolean(image.alt && image.alt.trim().length >= 8)
}

/**
 * Validates a lesson project based on a set of predefined rules and returns
 * reader-friendly warnings that align with the SCORM AI panel.
 */
export function validateProject(project: EditorProject): string[] {
  const warnings: string[] = []

  if (!project.title || project.title.trim().length < 3) {
    warnings.push("Add a clear project title so learners understand the lesson focus.")
  }

  if (project.pages.length === 0) {
    warnings.push("Insert at least one page before exporting to SCORM.")
  }

  project.pages.forEach((page, index) => {
    const pageLabel = page.title?.trim().length ? page.title : `Page ${index + 1}`

    if (!page.title || page.title.trim().length < 3) {
      warnings.push(`${pageLabel}: use a descriptive title (3+ characters).`)
    }

    if (page.blocks.length > 20) {
      warnings.push(`${pageLabel}: consider splitting into smaller pages (over 20 blocks).`)
    }

    const textBlocks = page.blocks.filter((b): b is TextBlock => b.type === "text")
    const quizBlocks = page.blocks.filter((b): b is QuizBlock => b.type === "quiz")
    const imageBlocks = page.blocks.filter((b): b is ImageBlock => b.type === "image")

    if (textBlocks.some((block) => !hasSubstantiveText(block))) {
      warnings.push(`${pageLabel}: expand short text blocks to give learners context.`)
    }

    quizBlocks.forEach((quiz, quizIndex) => {
      if (!quiz.question?.trim()) {
        warnings.push(`${pageLabel}: quiz ${quizIndex + 1} is missing a question prompt.`)
      }
      if (!hasCorrectAnswer(quiz)) {
        warnings.push(`${pageLabel}: mark at least one correct option in quiz ${quizIndex + 1}.`)
      }
    })

    imageBlocks.forEach((image, imageIndex) => {
      if (!hasAccessibleAlt(image)) {
        warnings.push(`${pageLabel}: provide a meaningful alt text for image ${imageIndex + 1}.`)
      }
    })
  })

  return warnings
}

/**
 * Classifies a student's score into a descriptive label.
 * @param score The student's score, typically from 0 to 100.
 * @returns A label: "weak", "average", "good", or "excellent".
 */
export function classifyScore(score: number): "weak" | "average" | "good" | "excellent" {
  if (score < 50) return "weak"
  if (score < 75) return "average"
  if (score < 90) return "good"
  return "excellent"
}

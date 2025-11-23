// lib/scorm/validator.ts

import type { EditorProject } from "./types"

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validateProject(project: EditorProject): ValidationResult {
  const errors: string[] = []

  if (!project.id) errors.push("Project is missing an id.")
  if (!project.title) errors.push("Project is missing a title.")
  if (!project.pages || project.pages.length === 0) {
    errors.push("Project must contain at least one page.")
  }

  project.pages.forEach((page, pageIndex) => {
    if (!page.id) errors.push(`Page ${pageIndex + 1} is missing an id.`)
    if (!page.title) errors.push(`Page ${pageIndex + 1} is missing a title.`)
    if (!page.blocks || page.blocks.length === 0) {
      errors.push(`Page ${pageIndex + 1} has no blocks.`)
    }
  })

  return { valid: errors.length === 0, errors }
}

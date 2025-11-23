// lib/scorm/block-engine.ts

import type { EditorBlock, TextBlock, ImageBlock, VideoBlock, QuizBlock, InteractiveBlock } from "./types"

export function renderBlock(block: EditorBlock): string {
  switch (block.type) {
    case "text":
      return renderTextBlock(block)
    case "image":
      return renderImageBlock(block)
    case "video":
      return renderVideoBlock(block)
    case "quiz":
      return renderQuizBlock(block)
    case "interactive":
      return renderInteractiveBlock(block)
    default:
      return ""
  }
}

function renderTextBlock(block: TextBlock): string {
  return `
<section class="block block-text">
  ${block.html}
</section>
`
}

function renderImageBlock(block: ImageBlock): string {
  const alt = block.alt ?? ""
  return `
<section class="block block-image">
  <img src="${block.src}" alt="${escapeHtml(alt)}" />
</section>
`
}

function renderVideoBlock(block: VideoBlock): string {
  return `
<section class="block block-video">
  <video controls>
    <source src="${block.src}" />
    Your browser does not support the video tag.
  </video>
</section>
`
}

function renderQuizBlock(block: QuizBlock): string {
  const optionsHtml = block.options
    .map(
      (opt) => `
<li class="quiz-option">
  <label>
    <input type="radio" name="quiz-${block.id}" value="${escapeHtml(opt.id)}" />
    <span>${escapeHtml(opt.label)}</span>
  </label>
</li>`,
    )
    .join("\n")

  return `
<section class="block block-quiz" data-quiz-id="${block.id}">
  <h3 class="quiz-question">${escapeHtml(block.question)}</h3>
  <ul class="quiz-options">
    ${optionsHtml}
  </ul>
</section>
`
}

function renderInteractiveBlock(block: InteractiveBlock): string {
  // for now, we just dump some placeholder content
  return `
<section class="block block-interactive" data-interactive-id="${block.id}">
  <div class="interactive-placeholder">
    Interactive block: ${escapeHtml(block.description ?? "Custom interaction")}
  </div>
</section>
`
}

// basic HTML escaping for text fields
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

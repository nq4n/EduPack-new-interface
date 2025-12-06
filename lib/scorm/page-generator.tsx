// lib/scorm/page-generator.ts

import type { EditorBlock, EditorPage, SCORMVersion } from "./types"

export function generatePageHTML(page: EditorPage, version: SCORMVersion = "1.2"): string {
  const blocksHtml = page.blocks.map((b) => renderBlockHtml(b)).join("\n")

  const apiScript = version === "1.2" ? "../runtime/scorm12.js" : "../runtime/scorm2004.js"

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(page.title)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="../styles/base.css" />
  <script src="${apiScript}"></script>
  <script>
    // you can add SCORM init logic here later
    window.addEventListener("load", function () {
      try {
        if (window.API && window.API.LMSInitialize) {
          window.API.LMSInitialize("");
        }
      } catch (e) {}
    });
  </script>
</head>
<body>
  <main class="page" data-page-id="${page.id}">
    ${blocksHtml}
  </main>
</body>
</html>
`
}

function renderBlockHtml(block: EditorBlock): string {
  switch (block.type) {
    case "text":
      return `<section class="block block-text" data-block-id="${block.id}">${block.html || ""}</section>`

    case "image": {
      const alt = block.alt || ""
      return `
        <figure class="block block-image" data-block-id="${block.id}">
          <img src="${block.src}" alt="${alt}">
          ${alt ? `<figcaption>${alt}</figcaption>` : ""}
        </figure>
      `.trim()
    }

    case "video":
      return `
        <div class="block block-video" data-block-id="${block.id}">
          <video src="${block.src}" controls></video>
        </div>
      `.trim()

    case "quiz": {
      const options = (block.options || [])
        .map(
          (o) => `
            <label class="quiz-option">
              <input type="radio" name="${block.id}" value="${o.id}">
              <span>${o.label}</span>
            </label>
          `.trim()
        )
        .join("\n")

      return `
        <div class="block block-quiz" data-block-id="${block.id}">
          <p class="quiz-question">${block.question}</p>
          <div class="quiz-options">${options}</div>
        </div>
      `.trim()
    }

    case "interactive": {
      const label = block.label || ""
      const body = block.bodyHtml || ""

      if (block.variant === "button") {
        return `<button class="block block-interactive" data-block-id="${block.id}">${label || "Interactive"}</button>`
      }

      if (block.variant === "callout") {
        return `
          <div class="block block-interactive" data-block-id="${block.id}">
            ${label ? `<p class="font-semibold">${label}</p>` : ""}
            <div>${body || ""}</div>
          </div>
        `.trim()
      }

      if (block.variant === "reveal") {
        return `
          <details class="block block-interactive" data-block-id="${block.id}" ${
            block.initiallyOpen ? "open" : ""
          }>
            <summary>${label || "Show"}</summary>
            <div>${body || ""}</div>
          </details>
        `.trim()
      }

      return `
        <div class="block block-interactive" data-block-id="${block.id}">
          ${block.customHtml || ""}
        </div>
      `.trim()
    }

    default:
      return `<div class="block" data-block-id="${block.id}"></div>`
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

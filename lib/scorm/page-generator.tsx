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
  <script>
    document.addEventListener('click', function (event) {
      const target = event.target.closest('[data-action]');
      if (!target) return;
      const action = target.getAttribute('data-action');
      if (action === 'page') {
        const pageId = target.getAttribute('data-target-page');
        if (pageId) window.location.href = pageId + '.html';
      }
      if (action === 'link') {
        const url = target.getAttribute('data-target-url');
        if (url) window.open(url, '_blank');
      }
    });
  </script>
</body>
</html>
`
}

function styleToCss(style?: any): string {
  if (!style) return ""
  const parts: string[] = []
  if (style.width) parts.push(`width:${style.width}`)
  if (style.maxWidth) parts.push(`max-width:${style.maxWidth}`)
  if (style.padding) parts.push(`padding:${style.padding}`)
  if (style.radius) parts.push(`border-radius:${style.radius}`)
  if (style.background) parts.push(`background:${style.background}`)
  if (style.align)
    parts.push(
      `text-align:${
        style.align === "center"
          ? "center"
          : style.align === "right"
            ? "right"
            : "left"
      }`,
    )
  if (style.size) parts.push(`font-size:${style.size}`)
  if (style.bold) parts.push("font-weight:bold")
  if (style.italic) parts.push("font-style:italic")
  if (style.underline) parts.push("text-decoration:underline")
  if (style.color) parts.push(`color:${style.color}`)
  if (style.lineHeight) parts.push(`line-height:${style.lineHeight}`)
  if (style.direction) parts.push(`direction:${style.direction}`)
  if (style.shadow) parts.push("box-shadow:0 12px 30px rgba(0,0,0,0.12)")
  return parts.join(";")
}

function renderBlockHtml(block: EditorBlock): string {
  switch (block.type) {
    case "text":
      return `<section class="block block-text" data-block-id="${block.id}" style="${styleToCss((block as any).style)}">${block.html || ""}</section>`

    case "image": {
      const alt = block.alt || ""
      const style = styleToCss((block as any).style)
      return `
        <figure class="block block-image" data-block-id="${block.id}" style="${style}">
          <img src="${block.src}" alt="${alt}" style="max-width:100%;${style}">
          ${alt ? `<figcaption>${alt}</figcaption>` : ""}
        </figure>
      `.trim()
    }

    case "video": {
      const style = styleToCss((block as any).style)
      return `
        <div class="block block-video" data-block-id="${block.id}" style="${style}">
          <video src="${block.src}" controls style="width:100%;${style}"></video>
        </div>
      `.trim()
    }

    case "quiz": {
      const options = (block.options || [])
        .map(
          (o) => `
            <label class="quiz-option" style="${styleToCss((block as any).optionStyle)}">
              <input type="radio" name="${block.id}" value="${o.id}">
              <span>${o.label}</span>
            </label>
          `.trim()
        )
        .join("\n")

      return `
        <div class="block block-quiz" data-block-id="${block.id}" style="${styleToCss((block as any).style)}">
          <p class="quiz-question">${block.question}</p>
          <div class="quiz-options">${options}</div>
        </div>
      `.trim()
    }

    case "interactive": {
      const label = block.label || ""
      const body = block.bodyHtml || ""

      const action =
        block.action || (block.targetPageId ? "page" : block.url ? "link" : "none")
      const actionAttrs =
        action === "page" && block.targetPageId
          ? `data-action="page" data-target-page="${block.targetPageId}" aria-label="Go to ${block.targetPageId}"`
          : action === "link" && block.url
            ? `data-action="link" data-target-url="${block.url}" aria-label="Open link"`
            : ""

      if (block.variant === "button") {
        return `<button class="block block-interactive" data-block-id="${block.id}" style="${styleToCss((block as any).style)}" ${actionAttrs}>${label || "Interactive"}</button>`
      }

      if (block.variant === "callout") {
        return `
          <div class="block block-interactive" data-block-id="${block.id}" style="${styleToCss((block as any).style)}">
            ${label ? `<p class="font-semibold">${label}</p>` : ""}
            <div>${body || ""}</div>
          </div>
        `.trim()
      }

      if (block.variant === "reveal") {
        return `
          <details class="block block-interactive" data-block-id="${block.id}" ${
            block.initiallyOpen ? "open" : ""
          } style="${styleToCss((block as any).style)}">
            <summary>${label || "Show"}</summary>
            <div>${body || ""}</div>
          </details>
        `.trim()
      }

      return `
        <div class="block block-interactive" data-block-id="${block.id}" style="${styleToCss((block as any).style)}">
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

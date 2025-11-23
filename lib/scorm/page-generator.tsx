// lib/scorm/page-generator.ts

import type { EditorPage, SCORMVersion } from "./types"
import { renderBlock } from "./block-engine"

export function generatePageHTML(page: EditorPage, version: SCORMVersion = "1.2"): string {
  const blocksHtml = page.blocks.map((b) => renderBlock(b)).join("\n")

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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

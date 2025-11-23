// lib/scorm/exporter.ts

import JSZip from "jszip"
import type { EditorProject, SCORMManifestItem, SCORMManifestResource, SCORMVersion } from "./types"
import { generatePageHTML } from "./page-generator"
import { createManifestXml } from "./manifest-builder"
import { validateProject } from "./validator"
import { SCORM12_RUNTIME, SCORM2004_RUNTIME } from "./runtime-scripts"

const BASE_CSS = `
body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #f5f6f7;
}

.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px 40px;
  background: #ffffff;
}

.block {
  margin-bottom: 1.5rem;
}

.block-text {
  font-size: 16px;
  line-height: 1.6;
}

.block-image img {
  max-width: 100%;
  border-radius: 12px;
  display: block;
  margin: 0 auto;
}

.block-video video {
  max-width: 100%;
  border-radius: 12px;
}

.block-quiz .quiz-question {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.block-quiz .quiz-options {
  list-style: none;
  padding: 0;
  margin: 0;
}

.block-quiz .quiz-option {
  margin-bottom: 0.5rem;
}

.block-interactive .interactive-placeholder {
  padding: 12px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  font-size: 14px;
}
`.trim()

export async function buildScormZip(project: EditorProject, version: SCORMVersion = "1.2"): Promise<Blob> {
  const validation = validateProject(project)
  if (!validation.valid) {
    throw new Error("Invalid project: " + validation.errors.join("; "))
  }

  const zip = new JSZip()

  // runtime JS
  const runtimeFolder = zip.folder("runtime")
  if (!runtimeFolder) throw new Error("Failed to create runtime folder in zip")

  if (version === "1.2") {
    runtimeFolder.file("scorm12.js", SCORM12_RUNTIME)
  } else {
    runtimeFolder.file("scorm2004.js", SCORM2004_RUNTIME)
  }

  // styles
  const stylesFolder = zip.folder("styles")
  if (!stylesFolder) throw new Error("Failed to create styles folder in zip")
  stylesFolder.file("base.css", BASE_CSS)

  // pages
  const pagesFolder = zip.folder("pages")
  if (!pagesFolder) throw new Error("Failed to create pages folder in zip")

  const items: SCORMManifestItem[] = []
  const resources: SCORMManifestResource[] = []

  for (const page of project.pages) {
    const filename = `${page.id}.html`
    const html = generatePageHTML(page, version)
    pagesFolder.file(filename, html)

    items.push({
      id: page.id,
      title: page.title,
      href: `pages/${filename}`,
    })

    resources.push({
      id: page.id,
      href: `pages/${filename}`,
      files: [`pages/${filename}`],
    })
  }

  // manifest
  const manifestXml = createManifestXml({
    identifier: project.id,
    title: project.title,
    organization: "org1",
    items,
    resources,
  })

  zip.file("imsmanifest.xml", manifestXml)

  // generate zip blob
  const blob = await zip.generateAsync({ type: "blob" })
  return blob
}

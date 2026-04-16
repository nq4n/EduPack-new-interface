import type { SvgBlock } from "./types"

export type SvgTextNode = {
  id: string
  index: number
  text: string
  x?: string | null
  y?: string | null
}

export type OpenSourceSvgSource = {
  id: string
  name: string
  url: string
  description: string
}

const JSX_ATTRIBUTE_MAP: Record<string, string> = {
  className: "class",
  strokeWidth: "stroke-width",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
  strokeMiterlimit: "stroke-miterlimit",
  fillRule: "fill-rule",
  clipRule: "clip-rule",
  fillOpacity: "fill-opacity",
  strokeOpacity: "stroke-opacity",
  stopColor: "stop-color",
  stopOpacity: "stop-opacity",
  colorInterpolationFilters: "color-interpolation-filters",
  xmlnsXlink: "xmlns:xlink",
  xlinkHref: "xlink:href",
  xmlSpace: "xml:space",
  dominantBaseline: "dominant-baseline",
  textAnchor: "text-anchor",
}

const SVG_SHAPE_SNIPPET_PATTERN =
  /<(?:g|path|circle|rect|line|polyline|polygon|ellipse|text|defs|linearGradient|radialGradient|stop|use|clipPath|mask|filter)\b[\s\S]*?>/i

export const OPEN_SOURCE_SVG_SOURCES: OpenSourceSvgSource[] = [
  {
    id: "flowbite",
    name: "Flowbite Icons",
    url: "https://flowbite.com/icons/",
    description: "Copy SVG or JSX icon markup from the catalog.",
  },
  {
    id: "heroicons",
    name: "Heroicons",
    url: "https://heroicons.com/",
    description: "Outline and solid icons with clean 24px SVG markup.",
  },
  {
    id: "lucide",
    name: "Lucide",
    url: "https://lucide.dev/icons/",
    description: "Large open-source icon set with simple stroke-based SVG.",
  },
  {
    id: "tabler",
    name: "Tabler Icons",
    url: "https://tabler.io/icons",
    description: "Wide icon catalog with direct SVG downloads and copy.",
  },
  {
    id: "bootstrap",
    name: "Bootstrap Icons",
    url: "https://icons.getbootstrap.com/",
    description: "Filled and outline-friendly icons in plain SVG markup.",
  },
  {
    id: "iconoir",
    name: "Iconoir",
    url: "https://iconoir.com/",
    description: "Modern line icons that paste cleanly into SVG blocks.",
  },
  {
    id: "remix",
    name: "Remix Icon",
    url: "https://remixicon.com/",
    description: "Large icon set with many UI and content categories.",
  },
  {
    id: "feather",
    name: "Feather Icons",
    url: "https://feathericons.com/",
    description: "Minimal stroke icons with very small SVG payloads.",
  },
]

function decodeHtmlEntities(source: string) {
  return source
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, "&")
}

function normalizeJsxSvgSource(source: string) {
  let next = decodeHtmlEntities(source).trim()

  Object.entries(JSX_ATTRIBUTE_MAP).forEach(([jsxAttr, svgAttr]) => {
    next = next.replace(new RegExp(`\\b${jsxAttr}=`, "g"), `${svgAttr}=`)
  })

  next = next
    .replace(/=\{([0-9.]+)\}/g, '="$1"')
    .replace(/=\{"([^"]*)"\}/g, '="$1"')
    .replace(/=\{'([^']*)'\}/g, '="$1"')
    .replace(/=\{true\}/g, '="true"')
    .replace(/\s+\w+=\{false\}/g, "")
    .replace(/\{\s*"([^"]*)"\s*\}/g, "$1")
    .replace(/\{\s*'([^']*)'\s*\}/g, "$1")

  return next
}

export function extractSvgMarkup(source?: string) {
  if (!source) return ""

  const normalizedSource = normalizeJsxSvgSource(source)
  const svgMatch = normalizedSource.match(/<svg\b[\s\S]*?<\/svg>/i)
  if (svgMatch?.[0]) {
    return svgMatch[0].trim()
  }

  const symbolMatch = normalizedSource.match(/<symbol\b([\s\S]*?)>([\s\S]*?)<\/symbol>/i)
  if (symbolMatch) {
    const attrs = symbolMatch[1] || ""
    const body = symbolMatch[2] || ""
    const viewBoxMatch = attrs.match(/\bviewBox=(["'])(.*?)\1/i)
    const viewBox = viewBoxMatch?.[2] || "0 0 24 24"
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`
  }

  if (SVG_SHAPE_SNIPPET_PATTERN.test(normalizedSource)) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">${normalizedSource}</svg>`
  }

  return ""
}

export function coerceSvgMarkup(source?: string) {
  const extracted = extractSvgMarkup(source)
  if (!extracted) return ""

  return sanitizeSvgMarkup(extracted)
}

export const SVG_TEMPLATES = [
  {
    id: "mindmap",
    label: "Mind map",
    svg: `<svg viewBox="0 0 860 480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mind-center" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#dbeafe" />
      <stop offset="100%" stop-color="#bfdbfe" />
    </linearGradient>
    <linearGradient id="mind-node" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
  </defs>
  <rect width="860" height="480" rx="28" fill="#f8fafc" />
  <path d="M430 230C330 230 290 140 200 140" stroke="#60a5fa" stroke-width="6" stroke-linecap="round" />
  <path d="M430 230C330 230 290 340 200 340" stroke="#34d399" stroke-width="6" stroke-linecap="round" />
  <path d="M430 230C530 230 570 140 660 140" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" />
  <path d="M430 230C530 230 570 340 660 340" stroke="#f472b6" stroke-width="6" stroke-linecap="round" />
  <rect x="320" y="170" width="220" height="120" rx="28" fill="url(#mind-center)" stroke="#2563eb" stroke-width="3" />
  <text x="430" y="214" text-anchor="middle" fill="#0f172a" font-size="28" font-family="Arial, sans-serif" font-weight="700">Core Concept</text>
  <text x="430" y="248" text-anchor="middle" fill="#334155" font-size="17" font-family="Arial, sans-serif">Big idea or lesson theme</text>
  <rect x="88" y="94" width="188" height="92" rx="24" fill="url(#mind-node)" stroke="#60a5fa" stroke-width="3" />
  <text x="182" y="132" text-anchor="middle" fill="#0f172a" font-size="22" font-family="Arial, sans-serif" font-weight="700">Definition</text>
  <text x="182" y="160" text-anchor="middle" fill="#475569" font-size="14" font-family="Arial, sans-serif">What it is</text>
  <rect x="88" y="294" width="188" height="92" rx="24" fill="url(#mind-node)" stroke="#34d399" stroke-width="3" />
  <text x="182" y="332" text-anchor="middle" fill="#0f172a" font-size="22" font-family="Arial, sans-serif" font-weight="700">Examples</text>
  <text x="182" y="360" text-anchor="middle" fill="#475569" font-size="14" font-family="Arial, sans-serif">Cases and evidence</text>
  <rect x="584" y="94" width="188" height="92" rx="24" fill="url(#mind-node)" stroke="#f59e0b" stroke-width="3" />
  <text x="678" y="132" text-anchor="middle" fill="#0f172a" font-size="22" font-family="Arial, sans-serif" font-weight="700">Process</text>
  <text x="678" y="160" text-anchor="middle" fill="#475569" font-size="14" font-family="Arial, sans-serif">How it works</text>
  <rect x="584" y="294" width="188" height="92" rx="24" fill="url(#mind-node)" stroke="#f472b6" stroke-width="3" />
  <text x="678" y="332" text-anchor="middle" fill="#0f172a" font-size="22" font-family="Arial, sans-serif" font-weight="700">Impact</text>
  <text x="678" y="360" text-anchor="middle" fill="#475569" font-size="14" font-family="Arial, sans-serif">Why it matters</text>
</svg>`,
  },
  {
    id: "flow",
    label: "Flow chart",
    svg: `<svg viewBox="0 0 980 260" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="980" height="260" rx="28" fill="#f8fafc" />
  <rect x="40" y="76" width="180" height="108" rx="24" fill="#dbeafe" stroke="#2563eb" stroke-width="3" />
  <text x="130" y="118" text-anchor="middle" fill="#0f172a" font-size="22" font-family="Arial, sans-serif" font-weight="700">Step 1</text>
  <text x="130" y="148" text-anchor="middle" fill="#334155" font-size="15" font-family="Arial, sans-serif">Start with the idea</text>
  <path d="M220 130H300" stroke="#2563eb" stroke-width="6" stroke-linecap="round" />
  <path d="M288 112L318 130L288 148" stroke="#2563eb" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
  <rect x="320" y="76" width="180" height="108" rx="24" fill="#dcfce7" stroke="#16a34a" stroke-width="3" />
  <text x="410" y="118" text-anchor="middle" fill="#0f172a" font-size="22" font-family="Arial, sans-serif" font-weight="700">Step 2</text>
  <text x="410" y="148" text-anchor="middle" fill="#334155" font-size="15" font-family="Arial, sans-serif">Explain the process</text>
  <path d="M500 130H580" stroke="#16a34a" stroke-width="6" stroke-linecap="round" />
  <path d="M568 112L598 130L568 148" stroke="#16a34a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
  <rect x="600" y="76" width="180" height="108" rx="24" fill="#fef3c7" stroke="#d97706" stroke-width="3" />
  <text x="690" y="118" text-anchor="middle" fill="#0f172a" font-size="22" font-family="Arial, sans-serif" font-weight="700">Step 3</text>
  <text x="690" y="148" text-anchor="middle" fill="#334155" font-size="15" font-family="Arial, sans-serif">Apply or analyze</text>
  <path d="M780 130H860" stroke="#d97706" stroke-width="6" stroke-linecap="round" />
  <path d="M848 112L878 130L848 148" stroke="#d97706" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
  <rect x="880" y="76" width="60" height="108" rx="24" fill="#fce7f3" stroke="#db2777" stroke-width="3" />
  <text x="910" y="118" text-anchor="middle" fill="#0f172a" font-size="20" font-family="Arial, sans-serif" font-weight="700">End</text>
  <text x="910" y="148" text-anchor="middle" fill="#334155" font-size="13" font-family="Arial, sans-serif">Outcome</text>
</svg>`,
  },
  {
    id: "compare",
    label: "Compare",
    svg: `<svg viewBox="0 0 920 420" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="920" height="420" rx="28" fill="#f8fafc" />
  <rect x="72" y="86" width="320" height="248" rx="28" fill="#dbeafe" stroke="#2563eb" stroke-width="3" />
  <rect x="528" y="86" width="320" height="248" rx="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3" />
  <rect x="364" y="46" width="192" height="328" rx="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" />
  <text x="232" y="134" text-anchor="middle" fill="#0f172a" font-size="26" font-family="Arial, sans-serif" font-weight="700">Concept A</text>
  <text x="232" y="174" text-anchor="middle" fill="#334155" font-size="16" font-family="Arial, sans-serif">Key trait</text>
  <text x="232" y="210" text-anchor="middle" fill="#334155" font-size="16" font-family="Arial, sans-serif">Another detail</text>
  <text x="232" y="246" text-anchor="middle" fill="#334155" font-size="16" font-family="Arial, sans-serif">Best use case</text>
  <text x="688" y="134" text-anchor="middle" fill="#0f172a" font-size="26" font-family="Arial, sans-serif" font-weight="700">Concept B</text>
  <text x="688" y="174" text-anchor="middle" fill="#334155" font-size="16" font-family="Arial, sans-serif">Key trait</text>
  <text x="688" y="210" text-anchor="middle" fill="#334155" font-size="16" font-family="Arial, sans-serif">Another detail</text>
  <text x="688" y="246" text-anchor="middle" fill="#334155" font-size="16" font-family="Arial, sans-serif">Best use case</text>
  <text x="460" y="126" text-anchor="middle" fill="#0f172a" font-size="24" font-family="Arial, sans-serif" font-weight="700">Shared</text>
  <text x="460" y="174" text-anchor="middle" fill="#334155" font-size="16" font-family="Arial, sans-serif">Common idea</text>
  <text x="460" y="210" text-anchor="middle" fill="#334155" font-size="16" font-family="Arial, sans-serif">Overlap</text>
  <text x="460" y="246" text-anchor="middle" fill="#334155" font-size="16" font-family="Arial, sans-serif">Summary</text>
</svg>`,
  },
] as const

export type SvgTemplateId = (typeof SVG_TEMPLATES)[number]["id"]

export function getDefaultSvgMarkup(templateId: SvgTemplateId = "mindmap") {
  return SVG_TEMPLATES.find((template) => template.id === templateId)?.svg ?? SVG_TEMPLATES[0].svg
}

export function sanitizeSvgMarkup(markup?: string) {
  if (!markup) return ""

  return markup
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(["']).*?\1/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
    .replace(/\s(?:href|xlink:href)\s*=\s*(["'])\s*javascript:[\s\S]*?\1/gi, "")
    .trim()
}

export function getSvgCaption(block: SvgBlock) {
  return block.caption?.trim() ?? ""
}

function parseSvgRoot(markup?: string) {
  if (!markup || typeof DOMParser === "undefined") return null

  const parser = new DOMParser()
  const doc = parser.parseFromString(sanitizeSvgMarkup(markup), "image/svg+xml")
  const parserError = doc.querySelector("parsererror")
  if (parserError) return null

  return doc.documentElement.tagName.toLowerCase() === "svg"
    ? doc.documentElement
    : doc.querySelector("svg")
}

export function extractSvgTextNodes(markup?: string): SvgTextNode[] {
  const svg = parseSvgRoot(markup)
  if (!svg) return []

  return Array.from(svg.querySelectorAll("text")).map((node, index) => ({
    id: `text-${index}`,
    index,
    text: node.textContent?.trim() ?? "",
    x: node.getAttribute("x"),
    y: node.getAttribute("y"),
  }))
}

export function updateSvgTextNode(
  markup: string,
  nodeId: string,
  nextText: string,
) {
  const svg = parseSvgRoot(markup)
  if (!svg || typeof XMLSerializer === "undefined") {
    return sanitizeSvgMarkup(markup)
  }

  const index = Number(nodeId.replace("text-", ""))
  const textNode = Array.from(svg.querySelectorAll("text"))[index]

  if (!textNode) {
    return sanitizeSvgMarkup(markup)
  }

  textNode.textContent = nextText
  return new XMLSerializer().serializeToString(svg)
}

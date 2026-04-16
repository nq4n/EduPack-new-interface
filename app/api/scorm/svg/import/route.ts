import { NextRequest, NextResponse } from "next/server"
import { coerceSvgMarkup } from "@/lib/scorm/svg"

const MAX_SVG_IMPORT_BYTES = 500_000

function isDisallowedHost(hostname: string) {
  const normalized = hostname.toLowerCase()

  if (
    normalized === "localhost" ||
    normalized.endsWith(".local") ||
    normalized === "0.0.0.0" ||
    normalized === "::1"
  ) {
    return true
  }

  if (/^127\./.test(normalized)) return true
  if (/^10\./.test(normalized)) return true
  if (/^192\.168\./.test(normalized)) return true
  if (/^169\.254\./.test(normalized)) return true
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(normalized)) return true

  return false
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "url is required" }, { status: 400 })
    }

    let parsed: URL
    try {
      parsed = new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 })
    }

    if (parsed.protocol !== "https:") {
      return NextResponse.json(
        { error: "Only https:// SVG sources are allowed." },
        { status: 400 },
      )
    }

    if (isDisallowedHost(parsed.hostname)) {
      return NextResponse.json(
        { error: "This host is not allowed for SVG import." },
        { status: 400 },
      )
    }

    const response = await fetch(parsed.toString(), {
      headers: {
        Accept: "image/svg+xml,text/plain,text/html;q=0.8,*/*;q=0.5",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch SVG source (${response.status}).` },
        { status: response.status },
      )
    }

    const contentLength = response.headers.get("content-length")
    if (contentLength && Number(contentLength) > MAX_SVG_IMPORT_BYTES) {
      return NextResponse.json(
        { error: "SVG source is too large to import." },
        { status: 413 },
      )
    }

    const text = await response.text()
    if (text.length > MAX_SVG_IMPORT_BYTES) {
      return NextResponse.json(
        { error: "SVG source is too large to import." },
        { status: 413 },
      )
    }

    const svg = coerceSvgMarkup(text)
    if (!svg) {
      return NextResponse.json(
        {
          error:
            "No inline <svg> markup was found at that URL. Use a direct .svg file or paste the icon markup into the editor.",
        },
        { status: 422 },
      )
    }

    return NextResponse.json({ svg }, { status: 200 })
  } catch (error) {
    console.error("/api/scorm/svg/import error:", error)
    return NextResponse.json(
      { error: "Failed to import SVG source." },
      { status: 500 },
    )
  }
}

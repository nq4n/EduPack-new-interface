import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model =
      process.env.OPENROUTER_MODEL || "allenai/olmo-3-32b-think:free";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "EduPack SCORM AI",
        },
        body: JSON.stringify({
          model,
          messages,
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("OpenRouter error:", response.status, text);
      return NextResponse.json(
        {
          error: `OpenRouter error ${response.status}`,
          details: text,
        },
        { status: 500 }
      );
    }

    const completion = await response.json();

    // مهم: رجّع الـ completion كامل
    return NextResponse.json(completion);
  } catch (err) {
    console.error("SCORM chat route error:", err);
    return NextResponse.json(
      { error: "Server error in /api/scorm/chat" },
      { status: 500 }
    );
  }
}

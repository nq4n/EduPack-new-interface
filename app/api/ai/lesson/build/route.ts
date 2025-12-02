
import { NextResponse } from "next/server";
import { buildLessonPackage } from "@/lib/ai/orchestrator";

/**
 * API route handler for building a lesson package.
 * Expects a POST request with a JSON body containing 'prompt' and 'language'.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { prompt, language } = body;

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }
        if (language && !['en', 'ar'].includes(language)) {
            return NextResponse.json({ error: "Invalid language. Must be 'en' or 'ar'." }, { status: 400 });
        }
        
        // Call the AI orchestrator to build the lesson
        const result = await buildLessonPackage(prompt, language || 'en');

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("[API /ai/lesson/build] Error:", error);
        // Return a generic error message to the client to avoid exposing implementation details.
        return NextResponse.json({ error: "An unexpected error occurred while building the lesson." }, { status: 500 });
    }
}

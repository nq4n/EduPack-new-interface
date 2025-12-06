import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getOpenRouterConfig } from '@/lib/env';

export async function POST(req: NextRequest) {
  try {
    const { apiKey, model } = getOpenRouterConfig();
    const openrouter = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey,
    });

    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const completion = await openrouter.chat.completions.create({
      model,
      messages,
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error calling OpenRouter:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error'
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

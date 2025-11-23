import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const completion = await openrouter.chat.completions.create({
      model: process.env.OPENROUTER_FREE_MODEL || 'qwen/qwen2.5-7b-instruct',
      messages,
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error calling OpenRouter:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

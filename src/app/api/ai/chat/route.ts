import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    if (!message?.trim()) return NextResponse.json({ error: 'No message provided' }, { status: 400 });

    const systemPrompt = `You are an expert event planning assistant for EventEase, Zimbabwe's leading event planning platform.
Help users plan events in Zimbabwe — weddings, corporate events, birthdays, graduations, and more.
You know local vendors, venues, pricing in USD, and Zimbabwean event customs.
Be friendly, concise, and practical. Give specific advice relevant to Zimbabwe.
If the user has events, they'll be provided as context. Use that context to personalise your answers.`;

    const userContext = context
      ? `\n\nUser's current events: ${JSON.stringify(context, null, 2)}`
      : '';

    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: 'user', content: `${message}${userContext}` }],
    });

    const text = msg.content[0].type === 'text' ? msg.content[0].text : '';
    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'AI unavailable — check ANTHROPIC_API_KEY in .env.local' }, { status: 500 });
  }
}

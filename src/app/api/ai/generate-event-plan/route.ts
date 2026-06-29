import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  try {
    const { eventType, date, guestCount, budget, venuePreference, theme, requirements } = await req.json();

    const prompt = `You are an expert event planner in Zimbabwe. Generate a comprehensive event plan for:
- Event type: ${eventType}
- Date: ${date}
- Guest count: ${guestCount}
- Budget: ${budget ? `$${budget} USD` : 'Not specified'}
- Venue preference: ${venuePreference}
- Theme: ${theme || 'Not specified'}
- Special requirements: ${requirements || 'None'}

Return a JSON object with exactly this structure (no markdown, pure JSON):
{
  "checklist": [
    { "category": "Category Name", "tasks": ["task 1", "task 2", "task 3"] }
  ],
  "timeline": [
    { "phase": "3 Months Out", "tasks": ["task 1", "task 2"] },
    { "phase": "1 Month Out", "tasks": ["task 1", "task 2"] },
    { "phase": "1 Week Out", "tasks": ["task 1", "task 2"] },
    { "phase": "Day Of", "tasks": ["task 1", "task 2"] }
  ],
  "budget": {
    "venue": 30,
    "catering": 35,
    "photography": 15,
    "decoration": 12,
    "entertainment": 8
  },
  "vendors": [
    { "name": "Vendor Name", "category": "Category", "reason": "Why this vendor suits this event" }
  ]
}

Make the checklist relevant to ${eventType} events in Zimbabwe. Budget values are percentages (sum to 100). Include 5-7 checklist categories with 3-4 tasks each. Suggest 3-4 local Zimbabwean vendor types.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const json = JSON.parse(text.trim());
    return NextResponse.json(json);
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}

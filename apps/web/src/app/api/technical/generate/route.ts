// Location: apps/web/src/app/api/technical/generate/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const runtime = 'edge';

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Generate a medium-difficulty LeetCode-style coding problem suitable for a software engineer interview.
      The problem should involve common data structures or algorithms (like arrays, strings, hash maps, or trees).
      Return the response as a single, clean JSON object with NO other text or markdown formatting.
      The JSON object must have these exact keys: "title", "description", "exampleInput", and "exampleOutput".
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonString = responseText.trim().replace(/^```json\n?/, '').replace(/```$/, '');
    const problem = JSON.parse(jsonString);

    return NextResponse.json({ problem });
  } catch (error) {
    console.error("Error generating technical problem:", error);
    return NextResponse.json({ error: "Failed to generate problem" }, { status: 500 });
  }
}
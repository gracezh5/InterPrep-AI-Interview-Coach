import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = 'Generate exactly 5 common behavioral interview questions for a software engineering role. Return them as a JSON array of strings. Do not include any other text or formatting.';

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean the response to ensure it's valid JSON
    const jsonString = responseText.trim().replace(/^```json\n?/, '').replace(/```$/, '');
    const questions = JSON.parse(jsonString);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
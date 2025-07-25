// Location: apps/web/src/app/api/chat/route.ts
// This code has ZERO dependency on the 'ai' package.

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Get the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `
        You are an expert interviewer for a Senior Software Engineer position at a top tech company.
        Your name is "InterPrep Bot".
        Do not break character.
        Start the conversation by introducing yourself and asking the user the first behavioral question.
        Ask only one question at a time.
        After the user responds, provide brief, constructive feedback on their answer based on the STAR method (Situation, Task, Action, Result).
        Then, ask the next behavioral question.
      `,
    });

    const streamingResponse = await model.generateContentStream({
      contents: messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user', // Gemini uses 'model' for assistant role
        parts: [{ text: msg.content }],
      })),
    });

    // Create a new stream that we can control
    const readableStream = new ReadableStream({
      async start(controller) {
        // Iterate over the stream from Gemini
        for await (const chunk of streamingResponse.stream) {
          const text = chunk.text();
          // Send the text chunk to the client
          controller.enqueue(new TextEncoder().encode(text));
        }
        // Signal that the stream is finished
        controller.close();
      },
    });

    // Return our new stream as the response
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error) {
    console.error("Error in chat API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
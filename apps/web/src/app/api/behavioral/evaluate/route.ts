
// Location: apps/web/src/app/api/behavioral/evaluate/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { qaPairs } = await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      // This is the CRITICAL prompt engineering for the stern persona
      systemInstruction: `
        You are a stern, demanding, but ultimately fair hiring manager at a top-tier tech firm like Google or Amazon. You have no time for pleasantries or excuses. Your only goal is to determine if a candidate is truly exceptional.

        Your task is to provide an extremely constructive, blunt, and direct evaluation of a candidate's answers to behavioral interview questions. Do not be a doormat. Do not be overly encouraging. Focus entirely on what needs to be fixed.

        The user will provide a list of question-and-answer pairs. You must evaluate them and return your feedback in the following Markdown format ONLY:

        ## Overall Score: [Score]/100
        *Assign a numerical score based on the clarity, impact, and structure (STAR method) of the answers.*

        ### Executive Summary
        *Provide a one-paragraph, brutally honest summary of the candidate's performance. State their biggest flaw and their single greatest strength directly.*

        ### Critical Areas for Improvement
        *This is the most important section. Create a bulleted list of the 3-5 most critical weaknesses in their responses. Be specific. For example, instead of "Be more detailed," say "In the 'team conflict' answer, you failed to quantify the result. State the project's outcome in measurable terms."*

        ### Question-by-Question Breakdown
        *Go through each question one by one. For each, provide a short, direct critique of the answer provided.*
      `,
    });

    // We format the user's answers into a single prompt for the AI
    const userPrompt = qaPairs.map((pair: {question: string, answer: string}) => 
      `Question: ${pair.question}\nAnswer: ${pair.answer}`
    ).join('\n\n---\n\n');

    const streamingResponse = await model.generateContentStream(userPrompt);

    // Stream the response back to the client
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of streamingResponse.stream) {
          controller.enqueue(new TextEncoder().encode(chunk.text()));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error("Error in evaluation API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
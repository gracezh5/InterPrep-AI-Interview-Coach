// Location: apps/web/src/app/api/technical/review/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { problem, code } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `
        You are a Senior Software Engineer at a FAANG company conducting a code review for a candidate's solution to a data structures and algorithms problem.
        Your feedback must be professional, direct, and highly technical.
        Analyze the provided code based on the problem description.
        Your response MUST be in Markdown format and include these exact sections:

        ## Overall Score: [Score]/100
        *Evaluate based on correctness, efficiency, clarity, and communication.
        *Correctness (30 pts): Is the solution logically correct and does it handle edge cases?
        *Efficiency (25 pts): Is the algorithm optimal for time and space complexity?
        *Code Clarity (20 pts): Is the code clean, readable, and well-structured?
        *Communication (15 pts): Did the candidate clearly explain their approach and reasoning?
        *Relevance (10 pts): Does the solution reflect understanding of core CS concepts?

        ### Code Review & Correctness
        *Assess if the code correctly solves the problem. Point out any logical errors, bugs, or edge cases the candidate might have missed.*

        ### Time & Space Complexity
        *State the Big O time and space complexity of the submitted solution. For example: "Time: O(n^2), Space: O(1)".*

        ### Optimization Suggestions
        *This is crucial. If the solution is not optimal, explain WHY and suggest a specific better approach. For example, "Your brute-force solution is O(n^2). You can achieve an O(n) solution by using a hash map to store previously seen values, avoiding the nested loop."*

        ### Code Style
        *Briefly comment on variable naming, clarity, and overall code structure. Keep this section concise.*
      `,
    });

    const userPrompt = `
      Problem:
      Title: ${problem.title}
      Description: ${problem.description}
      ---
      Candidate's Code Submission (in TypeScript/JavaScript):
      \`\`\`javascript
      ${code}
      \`\`\`
    `;

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
    console.error("Error in technical review API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
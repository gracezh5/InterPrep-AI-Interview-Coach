import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText) {
      return new Response(JSON.stringify({ error: "Resume text is required" }), { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `
        You are a senior technical recruiter at a FAANG company. You are reviewing a candidate's resume for a Software Engineer role. You are busy and need to be direct, professional, and stern. Your feedback should be brutally honest but actionable.

        Do not use fluff or overly encouraging language. Your goal is to provide a clear, critical assessment.

        Your response MUST be in Markdown format and include these exact sections:

        ## Overall Score: [Score]/100
        *Assign a numerical score based on impact, clarity, formatting, and relevance to a software engineering role. Be critical.*

        ### First Impression (5-Second Test)
        *In one or two sentences, state your immediate impression. Is it clean and easy to scan, or cluttered and confusing?*

        ### Critical Action Items
        *Create a bulleted list of the top 3 most important changes the candidate MUST make. Start each bullet with a verb. For example: "Quantify your impact..." or "Remove the 'Skills' section..."*

        ### Section-by-Section Breakdown
        *Provide short, direct feedback on each key section of the resume (e.g., Experience, Projects, Education). For example: "Experience: Your bullet points describe duties, not accomplishments. Instead of 'Worked on the backend API,' write 'Increased API response time by 30% by implementing a caching layer.'"*
      `,
    });

    const streamingResponse = await model.generateContentStream(resumeText);

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
    console.error("Error in resume review API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
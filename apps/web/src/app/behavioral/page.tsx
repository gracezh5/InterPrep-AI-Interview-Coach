// Location: apps/web/src/app/behavioral/page.tsx
"use client";

import { useState } from 'react';
import { Loader2, Wand2, Send } from 'lucide-react';
import MarkdownRenderer from '@/components/common/MarkdownRenderer';

// Define the structure for a question/answer pair
type QAPair = {
  question: string;
  answer: string;
};

export default function BehavioralPage() {
  const [qaPairs, setQaPairs] = useState<QAPair[]>([]);
  const [evaluation, setEvaluation] = useState('');
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Fetches a new set of questions from your API
  const handleGenerateQuestions = async () => {
    setIsLoadingQuestions(true);
    setQaPairs([]); // Clear old questions
    setEvaluation(''); // Clear old evaluation
    try {
      const response = await fetch('/api/behavioral/generate');
      const data = await response.json();
      if (data.questions) {
        setQaPairs(data.questions.map((q: string) => ({ question: q, answer: '' })));
      }
    } catch (error) {
      console.error("Failed to fetch questions", error);
      // Optionally, add user-facing error handling here
    }
    setIsLoadingQuestions(false);
  };

  // Updates the answer for a specific question as the user types
  const handleAnswerChange = (index: number, answer: string) => {
    const newQaPairs = [...qaPairs];
    newQaPairs[index].answer = answer;
    setQaPairs(newQaPairs);
  };

  // Submits all answers to the evaluation API and streams the result
  const handleSubmitEvaluation = async () => {
    setIsEvaluating(true);
    setEvaluation('');
    try {
      const response = await fetch('/api/behavioral/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qaPairs }),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        // Append each chunk of the stream to the evaluation state
        setEvaluation((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Failed to get evaluation", error);
       // Optionally, add user-facing error handling here
    }
    setIsEvaluating(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Behavioral Interview Gauntlet</h1>
          <p className="text-lg text-gray-600 mt-2">Generate questions, provide your answers, and receive a brutally honest evaluation.</p>
        </header>
        
        <div className="flex justify-center mb-8">
          <button
            onClick={handleGenerateQuestions}
            disabled={isLoadingQuestions || isEvaluating}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-900 font-semibold rounded-lg shadow-md border-2 border-yellow-200 hover:bg-yellow-200 hover:border-yellow-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 transition-all"
          >
            {isLoadingQuestions ? <Loader2 className="animate-spin" /> : <Wand2 />}
            {isLoadingQuestions ? 'Generating...' : 'Generate New Questions'}
          </button>
        </div>

        {qaPairs.length > 0 && (
          <div className="space-y-6 bg-yellow-50 p-6 rounded-lg shadow-md border-2 border-yellow-100">
            {qaPairs.map((pair, index) => (
              <div key={index}>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  {index + 1}. {pair.question}
                </label>
                <textarea
                  value={pair.answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Type your structured answer here using the STAR method..."
                  className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-yellow-500 transition bg-white"
                  disabled={isEvaluating}
                />
              </div>
            ))}
            <button
              onClick={handleSubmitEvaluation}
              disabled={isEvaluating || qaPairs.some(p => p.answer.trim() === '')}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-200 text-yellow-900 font-semibold rounded-lg shadow-md border-2 border-yellow-300 hover:bg-yellow-300 hover:border-yellow-400 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 transition-all"
            >
              {isEvaluating ? <Loader2 className="animate-spin" /> : <Send />}
              {isEvaluating ? 'Evaluating...' : 'Submit for Evaluation'}
            </button>
          </div>
        )}

        {evaluation && (
          <div className="mt-10 bg-yellow-50 p-6 rounded-lg shadow-inner border-2 border-yellow-100">
            <h2 className="text-2xl font-bold mb-4">Evaluation Result</h2>
            <MarkdownRenderer>{evaluation}</MarkdownRenderer>
          </div>
        )}

        {isEvaluating && !evaluation && (
          <div className="flex justify-center items-center mt-10">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <p className="ml-4 text-gray-600">The hiring manager is reviewing your answers...</p>
          </div>
        )}
      </div>
    </div>
  );
}
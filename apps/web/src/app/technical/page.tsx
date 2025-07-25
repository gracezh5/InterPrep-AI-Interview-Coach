"use client";

import { useState } from 'react';
import { Loader2, Wand2, Send } from 'lucide-react';
import MarkdownRenderer from '@/components/common/MarkdownRenderer';

type Problem = {
  title: string;
  description: string;
  exampleInput: string | object; 
  exampleOutput: string | object;
};

export default function TechnicalPage() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [isLoadingProblem, setIsLoadingProblem] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleGenerateProblem = async () => {
    setIsLoadingProblem(true);
    setProblem(null);
    setCode('');
    setReview('');
    try {
      const response = await fetch('/api/technical/generate');
      const data = await response.json();
      if (data.problem) {
        setProblem(data.problem);
        setCode(`function ${data.problem.title.replace(/\s/g, '')}(/* input */) {\n  // Write your code here\n};`);
      }
    } catch (error) {
      console.error("Failed to fetch problem", error);
    }
    setIsLoadingProblem(false);
  };

  const handleSubmitReview = async () => {
    if (!problem) return;
    setIsEvaluating(true);
    setReview('');
    try {
      const response = await fetch('/api/technical/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem, code }),
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setReview((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Failed to get review", error);
    }
    setIsEvaluating(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="text-center mb-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">Technical Coding Challenge</h1>
        <p className="text-lg text-gray-600 mt-2">Generate a new problem and submit your code for a professional AI-powered review.</p>
      </header>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleGenerateProblem}
          disabled={isLoadingProblem || isEvaluating}
          className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-900 font-semibold rounded-lg shadow-md border-2 border-blue-200 hover:bg-blue-200 hover:border-blue-300 disabled:bg-gray-200 transition-all"
        >
          {isLoadingProblem ? <Loader2 className="animate-spin" /> : <Wand2 />}
          {isLoadingProblem ? 'Generating...' : 'Generate New Problem'}
        </button>
      </div>

      {problem && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Panel: Problem Description */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border-2 border-blue-100 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{problem.title}</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
              <div className="mt-4 bg-gray-100 p-3 rounded-md">
                <p className="font-semibold">Example Input:</p>
                <pre className="font-mono text-sm text-gray-600">{typeof problem.exampleInput === 'string'
                    ? problem.exampleInput
                    : JSON.stringify(problem.exampleInput, null, 2)}</pre>
                <p className="font-semibold mt-2">Example Output:</p>
                <pre className="font-mono text-sm text-gray-600">{typeof problem.exampleOutput === 'string'
                    ? problem.exampleOutput
                    : JSON.stringify(problem.exampleOutput, null, 2)}</pre>
              </div>
            </div>

            {/* Right Panel: Code Editor */}
            <div className="flex flex-col">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Your code solution goes here..."
                className="w-full flex-1 p-4 border rounded-md focus:ring-2 focus:ring-blue-500 transition font-mono bg-gray-800 text-gray-200 h-96 resize-none"
                disabled={isEvaluating}
              />
              <button
                onClick={handleSubmitReview}
                disabled={isEvaluating || code.trim() === ''}
                className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-200 text-blue-900 font-semibold rounded-lg shadow-md border-2 border-blue-300 hover:bg-blue-300 disabled:bg-gray-400 transition-all"
              >
                {isEvaluating ? <Loader2 className="animate-spin" /> : <Send />}
                {isEvaluating ? 'Reviewing...' : 'Submit for Review'}
              </button>
            </div>
          </div>
          {review && (
            <div className="mt-10 bg-blue-50 p-6 rounded-lg shadow-inner border-2 border-blue-100">
              <h2 className="text-2xl font-bold mb-4">Code Review Result</h2>
              <div className="prose max-w-none">
                <MarkdownRenderer>{review}</MarkdownRenderer>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
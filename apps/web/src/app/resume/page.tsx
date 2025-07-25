// Location: apps/web/src/app/resume/page.tsx
"use client";

import { useState } from 'react';
import { Loader2, Send, FileText } from 'lucide-react';
import MarkdownRenderer from '@/components/common/MarkdownRenderer';

export default function ResumePage() {
  const [resumeText, setResumeText] = useState('');
  const [review, setReview] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleSubmitReview = async () => {
    setIsEvaluating(true);
    setReview('');
    try {
      const response = await fetch('/api/resume/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
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
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">AI Resume Review</h1>
          <p className="text-lg text-gray-600 mt-2">Paste your resume below for a direct and honest evaluation from a senior tech recruiter.</p>
        </header>

        {/* Main container with the green sticky-note theme */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center text-lg font-semibold text-gray-800 mb-2">
            <FileText className="mr-2 h-6 w-6" />
            Paste Your Resume Text Here
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Copy and paste the full text of your resume here..."
            className="w-full h-80 p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition bg-white"
            disabled={isEvaluating}
          />
          <button
            onClick={handleSubmitReview}
            disabled={isEvaluating || resumeText.trim() === ''}
            className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-200 text-green-900 font-semibold rounded-lg shadow-md border-2 border-green-300 hover:bg-green-300 hover:border-green-400 disabled:bg-gray-200 transition-all"
          >
            {isEvaluating ? <Loader2 className="animate-spin" /> : <Send />}
            {isEvaluating ? 'Evaluating...' : 'Review My Resume'}
          </button>
        </div>

        {/* Display the evaluation result */}
        {review && (
          <div className="mt-10 bg-green-50 p-6 rounded-lg shadow-inner border-2 border-green-100">
            <h2 className="text-2xl font-bold mb-4">Recruiter's Feedback</h2>
            <MarkdownRenderer>{review}</MarkdownRenderer>
          </div>
        )}
        
        {/* A nice loading indicator for when the AI is working */}
        {isEvaluating && !review && (
          <div className="flex justify-center items-center mt-10">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <p className="ml-4 text-gray-600">The recruiter is reviewing your file...</p>
          </div>
        )}
      </div>
    </div>
  );
}
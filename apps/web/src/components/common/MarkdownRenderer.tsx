// Location: apps/web/src/components/common/MarkdownRenderer.tsx
"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownRenderer({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      // This 'components' prop is where the magic happens.
      // We are telling the renderer how to style each HTML tag.
      components={{
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mt-6 mb-3 border-b pb-2" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="text-base leading-relaxed mb-4" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="text-base" {...props} />
        ),
        pre: ({ node, ...props }) => (
          <pre className="bg-gray-800 text-white p-3 rounded-md my-4 overflow-x-auto" {...props} />
        ),
        code: ({ node, ...props }) => (
            <code className="font-mono text-sm" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
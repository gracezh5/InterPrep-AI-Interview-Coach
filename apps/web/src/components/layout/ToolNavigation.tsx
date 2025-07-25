"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrainCircuit, FileText, BotMessageSquare } from 'lucide-react';

export default function ToolNavigation() {
  const pathname = usePathname();
  const navItems = [
    { name: 'Behavioral Prep', href: '/behavioral', icon: BotMessageSquare },
    { name: 'Technical Challenge', href: '/technical', icon: BrainCircuit },
    { name: 'Resume Review', href: '/resume', icon: FileText },
  ];

  return (
    <nav className="border-b bg-white/60 backdrop-blur-md sticky top-16 z-40">
      <div className="container mx-auto flex justify-center -mb-px">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium transition-colors
              ${
                pathname === item.href
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
              }
            `}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
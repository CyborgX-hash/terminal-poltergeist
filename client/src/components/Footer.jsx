import React from 'react';
import { Ghost, Heart, Github, Terminal, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#1e2638] bg-[#05070a] py-8 text-xs text-slate-500 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center space-x-2">
          <Ghost className="w-4 h-4 text-purple-400 animate-spectral-float" />
          <span className="text-slate-400">
            Terminal Poltergeist © 2026 • Hacktoberfest Week 5 (Ghost in the Machine)
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-slate-500">
            Open-Weight <span className="text-emerald-400">GPT-OSS 20B</span> on Groq
          </span>
          <span className="text-slate-700">|</span>
          <a
            href="https://github.com/CyborgX-hash/terminal-poltergeist"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center space-x-1"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

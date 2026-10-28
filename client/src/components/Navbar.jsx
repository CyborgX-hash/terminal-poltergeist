import React from 'react';
import { Ghost, Terminal, Shield, Sparkles, Github, Info, Activity } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab, backendOnline }) {
  return (
    <header className="border-b border-[#232d42] bg-[#07090e]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => setActiveTab('terminal')}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-900/60 to-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Ghost className="w-6 h-6 animate-spectral-float text-emerald-400 group-hover:text-purple-300 transition-colors" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${backendOnline ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${backendOnline ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-slate-100 group-hover:text-emerald-400 transition-colors font-mono">
                Terminal<span className="text-purple-400">Poltergeist</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-purple-950/80 text-purple-300 border border-purple-800/60 rounded">
                v1.0 • Hacktoberfest
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Ghost in the Machine • Open-Weight Command Guardian
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 ${
              activeTab === 'terminal'
                ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 ${
              activeTab === 'history'
                ? 'bg-purple-950/50 text-purple-300 border border-purple-500/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>History</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 ${
              activeTab === 'about'
                ? 'bg-amber-950/50 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Open Innovation</span>
          </button>

          <a
            href="https://github.com/CyborgX-hash/terminal-poltergeist"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="p-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-md hover:bg-slate-900/60 ml-2"
          >
            <Github className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}

import React from 'react';
import { Ghost, Terminal, Shield, Sparkles, Github, Info, Activity } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab, backendOnline }) {
  return (
    <header className="border-b border-[#15223c] bg-[#03050a]/85 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => setActiveTab('terminal')}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-950/90 to-[#060a14] border border-blue-500/40 flex items-center justify-center text-lime-400 group-hover:border-lime-400 transition-all duration-300 shadow-[0_0_18px_rgba(37,99,235,0.35)]">
              <Ghost className="w-6 h-6 animate-spectral-float text-lime-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${backendOnline ? 'bg-lime-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${backendOnline ? 'bg-lime-500' : 'bg-amber-500'}`}></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-lime-400 transition-colors font-mono">
                Terminal<span className="text-blue-500">Poltergeist</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-blue-950/80 text-blue-300 border border-blue-700/60 rounded">
                v1.0 • Security Guardian
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              AI Command Security Assistant & Static Risk Analyzer
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 ${
              activeTab === 'terminal'
                ? 'bg-blue-950/60 text-lime-400 border border-lime-400/50 shadow-[0_0_15px_rgba(163,230,53,0.25)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-[#0d162a]'
            }`}
          >
            <Terminal className="w-4 h-4 text-lime-400" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 ${
              activeTab === 'history'
                ? 'bg-blue-950/60 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-[#0d162a]'
            }`}
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span>History</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 ${
              activeTab === 'about'
                ? 'bg-blue-950/60 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-[#0d162a]'
            }`}
          >
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Open Innovation</span>
          </button>

          <a
            href="https://github.com/CyborgX-hash/terminal-poltergeist"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="p-2 text-slate-400 hover:text-lime-400 transition-colors rounded-md hover:bg-[#0d162a] ml-2"
          >
            <Github className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}

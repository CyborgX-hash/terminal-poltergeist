import React from 'react';
import { Ghost, Sparkles, Terminal, ShieldAlert, Cpu, Lock, Flame } from 'lucide-react';

export function GhostHero({ onSummonClick, onExploreDemo }) {
  return (
    <div className="relative pt-8 pb-12 overflow-hidden">
      {/* Background Midnight Aura & Spectral Fog */}
      <div className="spectral-fog" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Animated Ghost Illustration */}
        <div className="flex justify-center mb-6">
          <div className="relative group cursor-pointer" onClick={onSummonClick}>
            <div className="absolute inset-0 bg-blue-500/25 rounded-full blur-2xl group-hover:bg-lime-400/30 transition-all duration-700" />
            
            {/* Custom SVG Haunted Ghost */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center animate-spectral-float">
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full drop-shadow-[0_0_25px_rgba(37,99,235,0.45)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Spectral Body */}
                <path
                  d="M60 15 C35 15, 20 35, 20 65 C20 85, 18 98, 26 98 C34 98, 38 88, 46 88 C54 88, 56 98, 64 98 C72 98, 76 88, 84 88 C92 88, 94 98, 100 98 C106 98, 102 85, 102 65 C102 35, 85 15, 60 15 Z"
                  fill="url(#ghostGradient)"
                  className="transition-all duration-500"
                />
                {/* Ghost Face / Glowing Eyes */}
                <ellipse cx="45" cy="50" rx="6" ry="8" fill="#03050a" />
                <ellipse cx="75" cy="50" rx="6" ry="8" fill="#03050a" />
                <circle cx="47" cy="48" r="2.5" fill="#bef264" className="animate-pulse" />
                <circle cx="77" cy="48" r="2.5" fill="#bef264" className="animate-pulse" />
                {/* Ominous Smile */}
                <path
                  d="M48 68 Q60 78 72 68"
                  stroke="#03050a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="transparent"
                />
                {/* Floating Spirits / Particles */}
                <circle cx="15" cy="40" r="2" fill="#3b82f6" opacity="0.8" className="animate-ping" />
                <circle cx="105" cy="35" r="2.5" fill="#a3e635" opacity="0.8" />
                <circle cx="95" cy="80" r="1.5" fill="#60a5fa" opacity="0.6" />

                <defs>
                  <linearGradient id="ghostGradient" x1="20" y1="15" x2="102" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f0fdf4" stopOpacity="0.95" />
                    <stop offset="35%" stopColor="#d9f99d" stopOpacity="0.85" />
                    <stop offset="70%" stopColor="#93c5fd" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Security Platform Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#060a14] border border-blue-500/40 text-blue-300 text-xs font-mono mb-4 backdrop-blur-sm">
          <Flame className="w-3.5 h-3.5 text-lime-400" />
          <span>AI Shell Command Safety Guardian</span>
          <span className="text-slate-600">•</span>
          <span className="text-lime-400">Open-Weight GPT-OSS 20B</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-mono mb-4">
          Terminal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-lime-400">Poltergeist</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-slate-300 font-medium italic mb-4 max-w-2xl mx-auto">
          "Every command has consequences. <span className="text-lime-400 font-semibold not-italic">Let the ghost reveal them.</span>"
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Paste any mysterious, obfuscated, or suspicious shell command into the midnight terminal. 
          Our deterministic security engine and open-weight AI deconstruct every flag, expose hidden destructive side-effects, 
          and whisper safe alternatives <span className="text-blue-400 font-mono">before</span> you press enter in production.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onSummonClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold font-mono text-sm tracking-wide transition-all duration-200 shadow-[0_0_25px_rgba(163,230,53,0.45)] hover:shadow-[0_0_35px_rgba(163,230,53,0.65)] flex items-center justify-center space-x-2 group"
          >
            <Ghost className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>Summon the Ghost</span>
          </button>

          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#060a14] hover:bg-[#0d162a] text-blue-300 font-mono text-sm border border-blue-500/40 hover:border-lime-400/60 transition-all duration-200 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
          >
            <Terminal className="w-4 h-4 text-lime-400" />
            <span>Explore Demo Commands</span>
          </button>
        </div>

        {/* Feature Grid / Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-xl bg-[#060a14] border border-[#15223c] hover:border-lime-400/40 transition-colors backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-lime-400 mb-3">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-100 text-sm font-mono mb-1">Deterministic Rule Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-hallucination static analyzer detecting root wipes, fork bombs, raw disk dd, chmod 777, and dangerous remote curl pipes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#060a14] border border-[#15223c] hover:border-blue-500/50 transition-colors backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-100 text-sm font-mono mb-1">Open-Weight GPT-OSS 20B</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent, open-weight reasoning model hosted via high-throughput Groq LPU inference for deep shell comprehension.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#060a14] border border-[#15223c] hover:border-cyan-400/40 transition-colors backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-cyan-300 mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-100 text-sm font-mono mb-1">Zero-Execution Sandbox</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Advisory analysis only. Commands are parsed and evaluated strictly in isolation and never executed on the host or server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

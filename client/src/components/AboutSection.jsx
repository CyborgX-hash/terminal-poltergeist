import React from 'react';
import { Cpu, ShieldCheck, RefreshCw, Lock, Sparkles, Terminal, Flame, Info, CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title & Introduction */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>Hacktoberfest 2026 • Week 5: Ghost in the Machine</span>
        </div>
        <h2 className="text-3xl font-extrabold font-mono text-white">
          Open Innovation & Architecture
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Terminal Poltergeist blends open-weight artificial intelligence with transparent, inspectable security engineering to eliminate developer blind spots.
        </p>
      </div>

      {/* Grid of Key Architecture Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Open-Weight AI Foundation */}
        <div className="p-6 rounded-2xl bg-[#0e121b] border border-[#232d42] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-mono">1. Open-Weight Model Foundation</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            We use <span className="text-purple-300 font-mono font-semibold">openai/gpt-oss-20b</span> via Groq's high-speed LPU inference engine. 
            Open-weight models provide inspectable weight architectures, community-verifiable reasoning, and independence from proprietary model vendor lock-in.
          </p>
          <div className="pt-2 border-t border-[#1e2638] space-y-1.5 text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Model: <code className="text-slate-200">openai/gpt-oss-20b</code></span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Provider: Groq Cloud API (Hosted LPU)</span>
            </div>
          </div>
        </div>

        {/* Deterministic Rule Complement */}
        <div className="p-6 rounded-2xl bg-[#0e121b] border border-[#232d42] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-mono">2. Dual Defense: Rules + AI</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            AI models can occasionally hallucinate or miss subtle syntax tricks. 
            Terminal Poltergeist pairs the AI with a <span className="text-emerald-300 font-mono font-semibold">deterministic security engine</span> that parses flags, subshells, fork bombs, and dangerous piping with 100% mathematical consistency.
          </p>
          <div className="pt-2 border-t border-[#1e2638] space-y-1.5 text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-hallucination detection of root wipes & fork bombs</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Independent offline fallback when AI provider is down</span>
            </div>
          </div>
        </div>

        {/* Replaceable Model Architecture */}
        <div className="p-6 rounded-2xl bg-[#0e121b] border border-[#232d42] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-mono">3. Modular Provider Swap</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The backend AI service conforms to standard OpenAI-compatible completions format. 
            By changing environment variables (<code className="text-amber-300">GROQ_API_KEY</code>, <code className="text-amber-300">AI_BASE_URL</code>), 
            the application can effortlessly switch to self-hosted Ollama, vLLM, or other open-weight models without refactoring a single line of application code.
          </p>
        </div>

        {/* Data Privacy & Security Guardrails */}
        <div className="p-6 rounded-2xl bg-[#0e121b] border border-[#232d42] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-mono">4. Zero-Execution & Privacy</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Commands are <span className="text-white font-semibold">never executed</span> anywhere. 
            They are parsed as static text strings. In the hosted configuration, commands travel securely over TLS to Groq for analysis. 
            Anonymous session tokens isolate each user's history so no developer sees another's command queries.
          </p>
        </div>
      </div>

      {/* Honest Technical Disclosures */}
      <div className="p-6 rounded-2xl bg-[#121724] border border-[#232d42] space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <Info className="w-4 h-4 text-purple-400" />
          <span>Honest Technical Disclosures</span>
        </h4>
        <ul className="space-y-2 text-xs text-slate-400 leading-relaxed font-mono">
          <li>
            • <strong className="text-slate-200">Open-weight vs Fully Open Source:</strong> Open-weight models offer public parameter weights, but training datasets and proprietary hosting infrastructure vary. We clearly distinguish open weights from fully open source pipelines.
          </li>
          <li>
            • <strong className="text-slate-200">Network Dependency:</strong> Hosted inference via Groq requires outbound HTTPS access. If offline or if the API key quota is exhausted, the application falls back seamlessly to deterministic rules without crashing.
          </li>
          <li>
            • <strong className="text-slate-200">Advisory Guarantee:</strong> No static tool can solve the Halting Problem or guarantee 100% detection of all obfuscated shell payloads. Terminal Poltergeist serves as an advisory copilot.
          </li>
        </ul>
      </div>
    </div>
  );
}

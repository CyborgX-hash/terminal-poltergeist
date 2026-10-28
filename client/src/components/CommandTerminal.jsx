import React, { useState, useEffect } from 'react';
import { Terminal, Send, Trash2, Copy, Check, Sparkles, Ghost, AlertCircle, Play } from 'lucide-react';
import { DEMO_COMMANDS } from '../data/demoCommands';

const SPOOKY_LOADING_MESSAGES = [
  "Summoning the ghost in the machine...",
  "Consulting open-weight GPT-OSS 20B...",
  "Parsing shell tokens and subshells...",
  "Auditing against deterministic security rules...",
  "Detecting destructive file & permission changes...",
  "Extracting spectral wisdom and safer alternatives..."
];

export function CommandTerminal({ command, setCommand, onAnalyze, loading, terminalRef }) {
  const [copied, setCopied] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % SPOOKY_LOADING_MESSAGES.length);
      }, 1800);
    } else {
      setLoadingMsgIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleCopy = () => {
    if (!command.trim()) return;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (command.trim() && !loading) {
        onAnalyze();
      }
    }
  };

  const handleSelectDemo = (demo) => {
    setCommand(demo.command);
    if (terminalRef && terminalRef.current) {
      terminalRef.current.focus();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="terminal-section">
      {/* Demo Command Chips */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Curated Demo Incantations</span>
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline font-mono">
            Click to test real-world scenarios
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {DEMO_COMMANDS.map((demo) => {
            let badgeBg = 'bg-[#060a14] border-[#15223c] text-slate-300 hover:border-blue-500/60';
            if (demo.riskLevel === 'Critical') {
              badgeBg = 'bg-rose-950/40 border-rose-900/60 text-rose-300 hover:border-rose-500/80 hover:bg-rose-950/60';
            } else if (demo.riskLevel === 'High') {
              badgeBg = 'bg-amber-950/40 border-amber-900/60 text-amber-300 hover:border-amber-500/80 hover:bg-amber-950/60';
            } else if (demo.riskLevel === 'Low') {
              badgeBg = 'bg-lime-950/40 border-lime-900/60 text-lime-300 hover:border-lime-500/80 hover:bg-lime-950/60';
            }

            return (
              <button
                key={demo.id}
                onClick={() => handleSelectDemo(demo)}
                title={demo.hint}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all duration-150 flex items-center space-x-1.5 ${badgeBg}`}
              >
                <span className="font-semibold">{demo.label}</span>
                <span className="text-[10px] opacity-75">[{demo.riskLevel}]</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Haunted Terminal Window */}
      <div className="relative rounded-2xl overflow-hidden border border-[#15223c] bg-[#03050a] shadow-[0_10px_40px_rgba(0,0,0,0.85)] terminal-screen">
        {/* Scanlines Overlay */}
        <div className="scanlines absolute inset-0 z-10 pointer-events-none opacity-40" />

        {/* Terminal Header Bar */}
        <div className="bg-[#060a14] px-4 py-3 border-b border-[#15223c] flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-lime-400/80 inline-block"></span>
            </div>
            <div className="h-4 w-[1px] bg-slate-700/60 mx-1"></div>
            <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-mono">
              <Terminal className="w-3.5 h-3.5 text-lime-400" />
              <span>poltergeist@spectral-box:~$</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {command && (
              <>
                <button
                  onClick={handleCopy}
                  title="Copy command"
                  className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-[#0d162a] rounded transition-colors text-xs flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[11px] font-mono hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => setCommand('')}
                  title="Clear command"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-[#0d162a] rounded transition-colors text-xs flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono hidden sm:inline">Clear</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Command Input Area */}
        <div className="p-4 sm:p-6 relative z-20">
          <div className="flex items-start space-x-3">
            <div className="flex items-center space-x-1 text-lime-400 font-mono text-sm sm:text-base select-none pt-2.5">
              <Ghost className="w-4 h-4 text-lime-400 animate-pulse" />
              <span className="font-bold text-lime-300">&gt;</span>
            </div>

            <div className="flex-1">
              <textarea
                ref={terminalRef}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste command here (e.g., sudo rm -rf / or curl http://example.com/setup.sh | sh)..."
                rows={3}
                spellCheck="false"
                autoComplete="off"
                className="w-full bg-transparent text-lime-300 font-mono text-sm sm:text-base resize-y focus:outline-none placeholder:text-slate-600 leading-relaxed tracking-wide selection:bg-blue-600 selection:text-lime-300"
              />
            </div>
          </div>

          {/* Terminal Footer with Action Buttons */}
          <div className="mt-4 pt-4 border-t border-[#15223c] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-2">
              <kbd className="px-1.5 py-0.5 rounded bg-[#0d162a] border border-[#1e3256] text-blue-300 text-[10px]">
                Cmd / Ctrl + Enter
              </kbd>
              <span>to summon inspection</span>
            </div>

            <button
              onClick={onAnalyze}
              disabled={loading || !command.trim()}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center space-x-2 transition-all duration-300 ${
                loading
                  ? 'bg-blue-950/70 text-lime-400 border border-blue-500/50 cursor-wait'
                  : command.trim()
                  ? 'bg-gradient-to-r from-lime-400 via-lime-300 to-cyan-400 hover:from-lime-300 hover:to-cyan-300 text-slate-950 font-bold shadow-[0_0_20px_rgba(163,230,53,0.35)] hover:shadow-[0_0_30px_rgba(163,230,53,0.55)]'
                  : 'bg-[#0a1020] text-slate-600 border border-[#15223c] cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Ghost className="w-4 h-4 animate-spin text-lime-400" />
                  <span>Consulting the Spectral Realm...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Inspect Command</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Overlay Animation */}
        {loading && (
          <div className="p-8 border-t border-[#15223c] bg-[#03050a]/95 flex flex-col items-center justify-center text-center relative z-20">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-blue-500/30 border-t-lime-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Ghost className="w-7 h-7 text-lime-400 animate-spectral-float" />
              </div>
            </div>

            <p className="font-mono text-lime-300 text-sm font-medium tracking-wide animate-pulse">
              {SPOOKY_LOADING_MESSAGES[loadingMsgIndex]}
            </p>
            <p className="text-xs text-blue-300/80 font-mono mt-1">
              Evaluating risk via deterministic rules and Groq GPT-OSS 20B
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

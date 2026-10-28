import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Skull, 
  Copy, Check, FileCode, Cpu, Terminal, Zap, Shield, Sparkles, Ghost, Info, HelpCircle
} from 'lucide-react';

export function AnalysisResults({ result }) {
  const [copiedAlternative, setCopiedAlternative] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  if (!result) return null;

  const {
    riskLevel = 'Low',
    summary = 'No summary available.',
    components = [],
    consequences = [],
    affectedResources = [],
    reasons = [],
    saferAlternative = null,
    ghostCommentary = 'The ghost watches in eerie silence...',
    matchedRules = [],
    modelMetadata = { provider: 'Groq', model: 'openai/gpt-oss-20b' },
    isDeterministicOnly = false,
    isUnrecognized = false,
    unrecognizedBinaries = []
  } = result;

  const isPhantom = Boolean(isUnrecognized && riskLevel !== 'Critical' && riskLevel !== 'High');

  // Accessibility & Visual styles based on risk severity
  const riskConfig = {
    Critical: {
      badgeBg: 'bg-rose-950/80 border-rose-500/70 text-rose-100',
      glow: 'shadow-[0_0_25px_rgba(244,63,94,0.35)]',
      icon: Skull,
      label: 'CRITICAL HAZARD',
      ariaDesc: 'Critical risk: This command may cause permanent catastrophic data loss or compromise.'
    },
    High: {
      badgeBg: 'bg-orange-950/80 border-orange-500/70 text-orange-100',
      glow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]',
      icon: AlertTriangle,
      label: 'HIGH RISK',
      ariaDesc: 'High risk: Potentially dangerous permission change or unverified remote execution.'
    },
    Medium: {
      badgeBg: 'bg-amber-950/80 border-amber-500/70 text-amber-100',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]',
      icon: AlertTriangle,
      label: 'MEDIUM CAUTION',
      ariaDesc: 'Medium risk: Command modifies state or introduces potential credential/env leaks.'
    },
    Low: {
      badgeBg: 'bg-[#041a09]/90 border-lime-400/60 text-lime-200',
      glow: 'shadow-[0_0_25px_rgba(163,230,53,0.3)]',
      icon: ShieldCheck,
      label: 'LOW RISK / NORMAL',
      ariaDesc: 'Low risk: Standard shell execution without evident destructive flags.'
    },
    Phantom: {
      badgeBg: 'bg-purple-950/80 border-purple-500/70 text-purple-100',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.3)]',
      icon: HelpCircle,
      label: 'COMMAND NOT FOUND',
      ariaDesc: 'Invalid command: Binary does not exist in standard Unix/Linux/macOS environments (exit code 127).'
    }
  };

  const currentRisk = isPhantom ? riskConfig.Phantom : (riskConfig[riskLevel] || riskConfig.Low);
  const RiskIcon = currentRisk.icon;

  const handleCopyAlternative = () => {
    if (!saferAlternative) return;
    navigator.clipboard.writeText(saferAlternative);
    setCopiedAlternative(true);
    setTimeout(() => setCopiedAlternative(false), 2000);
  };

  const handleCopyReport = () => {
    const reportText = `[Terminal Poltergeist Analysis]
Command: ${result.command || 'N/A'}
Risk Level: ${isPhantom ? 'Command Not Found (Exit Code 127)' : riskLevel}
Summary: ${summary}
Ghost Commentary: "${ghostCommentary}"
Matched Rules: ${matchedRules.map(r => r.name || r.id).join(', ') || 'None'}
Safer Alternative: ${saferAlternative || 'None necessary'}`;
    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      {/* Header Banner: Risk Badge & Summary */}
      <div className={`p-6 rounded-2xl border bg-[#060a14] ${currentRisk.badgeBg} ${currentRisk.glow} transition-all`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-black/50 border border-white/20">
              <RiskIcon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-widest font-mono font-bold">
                  {currentRisk.label}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/50 font-mono text-slate-200">
                  {isPhantom ? 'Exit Code 127' : `${riskLevel} Severity`}
                </span>
                {isDeterministicOnly && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-400/50 font-mono text-blue-300">
                    Offline Rule Engine
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5" aria-label={currentRisk.ariaDesc}>
                {currentRisk.ariaDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyReport}
              className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/70 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5"
            >
              {copiedReport ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedReport ? 'Copied Report' : 'Copy Report'}</span>
            </button>
          </div>
        </div>

        {/* Short Summary */}
        <div className="mt-4">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Command Summary</h4>
          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
            {summary}
          </p>

          {isPhantom && unrecognizedBinaries.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-purple-500/20">
              <span className="text-xs font-mono text-purple-300">Unrecognized binary:</span>
              {unrecognizedBinaries.map((bin, idx) => (
                <code
                  key={idx}
                  className="px-2 py-0.5 text-xs font-mono rounded bg-black/60 text-purple-200 border border-purple-400/40"
                >
                  {bin}
                </code>
              ))}
              <span className="text-xs font-mono text-slate-400">
                (Execution will fail with <span className="text-rose-300">command not found</span>, exit code 127)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* If command is unrecognized BUT also triggered Critical/High hazards, display dedicated warning */}
      {!isPhantom && isUnrecognized && unrecognizedBinaries.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#060a14] to-rose-950/40 border border-purple-500/60 relative overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.25)]">
          <div className="flex items-start space-x-3.5">
            <div className="w-9 h-9 rounded-xl bg-purple-900/60 border border-purple-400/50 flex items-center justify-center text-purple-300 shrink-0">
              <HelpCircle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center space-x-1.5 mb-1">
                <span>⚠ Phantom Command Detected in Pipeline</span>
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                The following {unrecognizedBinaries.length === 1 ? 'binary does' : 'binaries do'} not exist in standard Unix/Linux/macOS environments:
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {unrecognizedBinaries.map((bin, idx) => (
                  <code
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-purple-950/80 text-purple-200 border border-purple-500/50"
                  >
                    {bin}
                  </code>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-mono mt-2">
                Execution will fail with <code className="text-rose-300">command not found</code> (exit code 127).
                {saferAlternative && ' See the recommended alternative below.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Spooky Ghost Commentary Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/50 via-[#060a14] to-lime-950/40 border border-blue-500/40 relative overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.2)]">
        <div className="flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-blue-900/60 border border-blue-400/50 flex items-center justify-center text-lime-400 shrink-0">
            <Ghost className="w-5 h-5 animate-spectral-float" />
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-lime-400 font-semibold flex items-center space-x-1.5 mb-1">
              <span>Whisper from the Poltergeist</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            </h4>
            <p className="text-sm text-slate-200 italic font-mono leading-relaxed">
              "{ghostCommentary}"
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Breakdown & Consequences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Component Breakdown */}
        <div className="p-5 rounded-2xl bg-[#060a14] border border-[#15223c] flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-lime-400 flex items-center space-x-1.5 mb-3">
              <Terminal className="w-4 h-4" />
              <span>Component Breakdown</span>
            </h4>

            {components.length > 0 ? (
              <div className="space-y-2.5">
                {components.map((comp, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#090f1e] border border-[#15223c]">
                    <div className="flex items-center justify-between mb-1">
                      <code className="text-xs font-mono text-lime-300 bg-[#03050a] px-2 py-0.5 rounded border border-[#1e3256]">
                        {comp.part || comp.token || comp}
                      </code>
                      {comp.type && (
                        <span className="text-[10px] font-mono text-blue-400 uppercase">
                          {comp.type}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-normal mt-1">
                      {comp.explanation || comp.desc || 'Interpreted as subshell token or parameter.'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic font-mono">
                Single atomic command token with standard positional parameters.
              </p>
            )}
          </div>
        </div>

        {/* Potential Consequences & Hazards */}
        <div className="p-5 rounded-2xl bg-[#060a14] border border-[#15223c] flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center space-x-1.5 mb-3">
              <Zap className="w-4 h-4" />
              <span>Consequences & Side Effects</span>
            </h4>

            {consequences.length > 0 ? (
              <ul className="space-y-2">
                {consequences.map((cons, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                    <span className="text-blue-400 font-bold font-mono mt-0.5">⚠</span>
                    <span className="leading-relaxed">{cons}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic font-mono">
                No immediate destructive filesystem, network, or privilege escalation consequences detected.
              </p>
            )}

            {/* Affected Resources */}
            {affectedResources.length > 0 && (
              <div className="mt-5 pt-4 border-t border-[#15223c]">
                <h5 className="text-[11px] font-mono uppercase text-slate-400 mb-2">
                  Targeted / Affected Resources
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {affectedResources.map((res, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs font-mono rounded bg-[#0d162a] text-blue-300 border border-[#1e3256]"
                    >
                      {res}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deterministic Rules Matched & AI Reasoning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matched Security Rules */}
        <div className="p-5 rounded-2xl bg-[#060a14] border border-[#15223c]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center space-x-1.5 mb-3">
            <Shield className="w-4 h-4" />
            <span>Deterministic Security Rules</span>
          </h4>

          {matchedRules.length > 0 ? (
            <div className="space-y-2.5">
              {matchedRules.map((rule, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-300">
                      {rule.id || rule.name}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      rule.severity === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      rule.severity === 'High' ? 'bg-orange-950 text-orange-300 border border-orange-800' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {rule.severity || 'Caution'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-normal">
                    {rule.description || rule.explanation}
                  </p>
                  {rule.mitigation && (
                    <p className="text-[11px] text-lime-400 font-mono mt-1">
                      → Recommendation: {rule.mitigation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#090f1e] border border-[#15223c] text-center">
              <ShieldCheck className="w-6 h-6 text-lime-400 mx-auto mb-1 opacity-80" />
              <p className="text-xs text-slate-400 font-mono">
                No deterministic signatures matched. Standard shell patterns observed.
              </p>
            </div>
          )}
        </div>

        {/* AI Model Assessment & Engine Metadata */}
        <div className="p-5 rounded-2xl bg-[#060a14] border border-[#15223c]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center space-x-1.5 mb-3">
            <Cpu className="w-4 h-4 text-lime-400" />
            <span>AI Reasoning & Architecture</span>
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono bg-[#090f1e] p-2.5 rounded-lg border border-[#15223c]">
              <span className="text-slate-400">Inference Provider:</span>
              <span className="text-lime-300 font-semibold">{modelMetadata.provider || 'Groq LPU'}</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono bg-[#090f1e] p-2.5 rounded-lg border border-[#15223c]">
              <span className="text-slate-400">Open-Weight Model:</span>
              <span className="text-blue-300 font-semibold">{modelMetadata.model || 'openai/gpt-oss-20b'}</span>
            </div>

            {reasons.length > 0 && (
              <div className="mt-2">
                <h5 className="text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                  Assessment Rationale
                </h5>
                <ul className="space-y-1.5">
                  {reasons.map((r, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                      <span className="text-lime-400 font-mono">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Safer Alternatives Box (If available) */}
      {saferAlternative && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#060a14] to-lime-950/30 border border-lime-400/50 shadow-[0_0_20px_rgba(163,230,53,0.15)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-lime-300 font-bold flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>Recommended Safer Alternative</span>
            </h4>
            <button
              onClick={handleCopyAlternative}
              className="px-3 py-1.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-slate-950 text-xs font-mono font-bold transition-colors flex items-center space-x-1.5 self-start sm:self-auto shadow-[0_0_15px_rgba(163,230,53,0.3)]"
            >
              {copiedAlternative ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAlternative ? 'Copied Alternative!' : 'Copy Alternative'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[#03050a] border border-lime-500/40 font-mono text-lime-300 text-sm overflow-x-auto">
            <code>{saferAlternative}</code>
          </div>
        </div>
      )}

      {/* Mandatory Advisory Disclaimer */}
      <div className="p-3 rounded-xl bg-[#060a14] border border-[#15223c] text-center flex items-center justify-center space-x-2 text-xs text-slate-400 font-mono">
        <Info className="w-4 h-4 text-blue-400 shrink-0" />
        <span>
          Advisory notice: This automated evaluation is for developer guidance only. Always verify commands within your environment and backups before execution.
        </span>
      </div>
    </div>
  );
}

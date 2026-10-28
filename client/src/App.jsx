import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { GhostHero } from './components/GhostHero';
import { CommandTerminal } from './components/CommandTerminal';
import { AnalysisResults } from './components/AnalysisResults';
import { HistoryDashboard } from './components/HistoryDashboard';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { api } from './services/api';
import { AlertCircle, X, Sparkles } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('terminal');
  const [command, setCommand] = useState('sudo rm -rf --no-preserve-root /');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [backendOnline, setBackendOnline] = useState(false);

  const terminalRef = useRef(null);
  const resultsRef = useRef(null);

  // Initial health check & history load
  useEffect(() => {
    const initApp = async () => {
      const isHealthy = await api.checkHealth();
      setBackendOnline(isHealthy);

      try {
        const historyData = await api.getHistory();
        if (historyData && historyData.history) {
          setHistory(historyData.history);
        }
      } catch (err) {
        console.warn('History load warning:', err.message);
      }
    };

    initApp();
    const interval = setInterval(async () => {
      const isHealthy = await api.checkHealth();
      setBackendOnline(isHealthy);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = async () => {
    if (!command.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      let analysisData;
      if (backendOnline) {
        analysisData = await api.analyzeCommand(command);
      } else {
        // High quality offline fallback using client-side deterministic evaluation
        analysisData = runOfflineFallbackAnalysis(command);
      }

      setResult(analysisData);
      
      // Update history state
      setHistory((prev) => [
        {
          id: analysisData.id || 'local_' + Date.now(),
          command: analysisData.command || command,
          riskLevel: analysisData.riskLevel,
          summary: analysisData.summary,
          createdAt: new Date().toISOString(),
          ...analysisData
        },
        ...prev.filter(h => h.id !== analysisData.id)
      ]);

      // Smooth scroll to results
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('Analysis error:', err);
      // Even if API fails unexpectedly, provide graceful fallback
      const fallback = runOfflineFallbackAnalysis(command);
      setResult(fallback);
      setError(`Notice: Operating in offline rule mode (${err.message})`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistoryItem = async (id) => {
    try {
      if (backendOnline && !id.startsWith('local_')) {
        await api.deleteHistoryItem(id);
      }
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Delete history item error:', err);
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleClearHistory = async () => {
    try {
      if (backendOnline) {
        await api.clearHistory();
      }
      setHistory([]);
    } catch (err) {
      console.error('Clear history error:', err);
      setHistory([]);
    }
  };

  const handleSelectAnalysis = (item) => {
    setCommand(item.command);
    setResult(item);
    setActiveTab('terminal');
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSummonClick = () => {
    setActiveTab('terminal');
    const el = document.getElementById('terminal-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-purple-900 selection:text-white">
      <div>
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          backendOnline={backendOnline} 
        />

        {error && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{error}</span>
              </div>
              <button onClick={() => setError(null)} className="text-amber-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <main>
          {activeTab === 'terminal' && (
            <>
              <GhostHero 
                onSummonClick={handleSummonClick} 
                onExploreDemo={handleSummonClick} 
              />
              
              <CommandTerminal
                command={command}
                setCommand={setCommand}
                onAnalyze={handleAnalyze}
                loading={loading}
                terminalRef={terminalRef}
              />

              <div ref={resultsRef}>
                {result && <AnalysisResults result={result} />}
              </div>
            </>
          )}

          {activeTab === 'history' && (
            <HistoryDashboard
              history={history}
              onDeleteItem={handleDeleteHistoryItem}
              onClearHistory={handleClearHistory}
              onSelectAnalysis={handleSelectAnalysis}
              onRefresh={async () => {
                const data = await api.getHistory();
                if (data && data.history) setHistory(data.history);
              }}
            />
          )}

          {activeTab === 'about' && (
            <AboutSection />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

// Client-side fallback rule engine when server is booting or offline
function runOfflineFallbackAnalysis(cmd) {
  const trimmed = cmd.trim();
  const lower = trimmed.toLowerCase();

  let riskLevel = 'Low';
  let summary = 'Standard utility execution with no immediate critical security patterns found.';
  const components = [];
  const consequences = [];
  const affectedResources = ['Standard User Shell'];
  const reasons = [];
  const matchedRules = [];
  let saferAlternative = null;
  let ghostCommentary = 'The machine remains tranquil... for now.';

  // Fork bomb check
  if (trimmed.includes(':(){ :|:& };:') || trimmed.includes(':(){:|:&};:')) {
    riskLevel = 'Critical';
    summary = 'Classic Bash recursive fork bomb causing instant resource exhaustion and system freeze.';
    consequences.push('Forks child processes recursively until the OS PID limit is reached');
    consequences.push('Requires physical reboot or root killall to recover control');
    affectedResources.push('OS Process Table', 'CPU Cores', 'Kernel Memory');
    reasons.push('Unbounded recursive process creation triggers kernel OOM');
    matchedRules.push({
      id: 'RULE-FORK-BOMB',
      name: 'Bash Fork Bomb Pattern',
      severity: 'Critical',
      description: 'Defines a self-invoking recursive function that starves CPU scheduling.',
      mitigation: 'Set strict ulimit -u process limits in /etc/security/limits.conf'
    });
    ghostCommentary = 'Thousands of ghost processes multiply in the shadows until your kernel gasps its final breath!';
    saferAlternative = '# Restrict max processes per user before running untrusted scripts:\nulimit -u 1000';
  } 
  // Root deletion check
  else if (lower.includes('rm ') && (lower.includes('-rf') || lower.includes('-fr') || lower.includes('-r')) && (lower.includes('/') || lower.includes('/*'))) {
    riskLevel = 'Critical';
    summary = 'Recursive forced deletion targeting root or system filesystem paths.';
    consequences.push('Permanently unlinks critical system binaries, libraries, and boot files');
    consequences.push('Destroys user homes, service configs, and application databases');
    affectedResources.push('Root Filesystem (/)', 'System Binaries', 'Persistent Storage');
    reasons.push('rm -rf unlinks all directories without interactive confirmation');
    matchedRules.push({
      id: 'RULE-ROOT-RM-RF',
      name: 'Destructive Recursive Deletion',
      severity: 'Critical',
      description: 'Forced recursive removal targeting root or system directories.',
      mitigation: 'Never run rm -rf on root. Use trash-cli or target specific isolated subdirectories with -i.'
    });
    ghostCommentary = 'The scythe swings across the root directory! Not even the spirits will remember what lived here.';
    saferAlternative = 'trash-put /path/to/specific/target # Or test first with: ls -la /path/to/specific/target';
  }
  // Remote pipe check
  else if ((lower.includes('curl ') || lower.includes('wget ')) && (lower.includes('| sh') || lower.includes('| bash') || lower.includes('| sudo'))) {
    riskLevel = 'High';
    summary = 'Piping untrusted remote network script directly into a shell interpreter.';
    consequences.push('Executes unverified remote code with your current user privileges');
    consequences.push('Vulnerable to MITM attacks, DNS spoofing, or compromised upstream CDNs');
    affectedResources.push('User Shell', 'Network Socket', 'Filesystem Permissions');
    reasons.push('Remote script execution without local inspection or checksum verification');
    matchedRules.push({
      id: 'RULE-REMOTE-PIPE-SHELL',
      name: 'Remote Pipe to Shell Execution',
      severity: 'High',
      description: 'Fetches code over HTTP/HTTPS and immediately pipes stdout to bash/sh.',
      mitigation: 'Download the script first, inspect its contents with less/cat, and verify sha256 checksum.'
    });
    ghostCommentary = 'Drinking unknown potions from strange URLs... whatever enters will haunt your terminal!';
    saferAlternative = 'curl -fsSL https://example.com/install.sh -o install.sh && sha256sum install.sh && less install.sh';
  }
  // Chmod 777 check
  else if (lower.includes('chmod') && (lower.includes('777') || lower.includes('a+rwx'))) {
    riskLevel = 'High';
    summary = 'Granting unrestricted read, write, and execute permissions to all users.';
    consequences.push('Allows any local process, daemon, or unauthenticated web user to modify or execute files');
    consequences.push('Common vector for privilege escalation and web shell persistence');
    affectedResources.push('POSIX Permissions', 'Filesystem Access Control');
    reasons.push('World-writable mode flag 777 eliminates basic access boundaries');
    matchedRules.push({
      id: 'RULE-INSECURE-PERMISSIONS',
      name: 'World-Writable Permissions (777)',
      severity: 'High',
      description: 'Grants universal write and execute privileges across directory trees.',
      mitigation: 'Use principle of least privilege: 755 for directories, 644 for files, with appropriate ownership.'
    });
    ghostCommentary = 'Throwing the castle gates wide open for every ghoul and goblin to wander in!';
    saferAlternative = 'chmod 755 /path/to/directory && chmod 644 /path/to/directory/*.txt';
  }
  // dd disk destruction
  else if (lower.includes('dd ') && (lower.includes('of=/dev/') || lower.includes('if=/dev/zero'))) {
    riskLevel = 'Critical';
    summary = 'Direct block-level write to a storage device node without filesystem protection.';
    consequences.push('Overwrites partition tables, MBR/GPT headers, and raw filesystem blocks');
    consequences.push('Permanent unrecoverable loss of disk partitions');
    affectedResources.push('Block Device Node', 'Disk Partitions', 'Storage Array');
    reasons.push('Direct raw block writing circumvents standard OS file safety checks');
    matchedRules.push({
      id: 'RULE-RAW-DISK-WRITE',
      name: 'Raw Block Device Overwrite',
      severity: 'Critical',
      description: 'Writes directly to /dev block device nodes.',
      mitigation: 'Verify output target of= explicitly and use partition-aware formatting tools.'
    });
    ghostCommentary = 'Raw block destruction! A total eclipse of your storage medium!';
    saferAlternative = 'lsblk # Inspect attached block devices and mount points safely before dd';
  }
  // Credential exposure
  else if (lower.includes('aws_secret') || lower.includes('api_key') || lower.includes('password=')) {
    riskLevel = 'Medium';
    summary = 'Potential hardcoded secret or sensitive token in shell environment command.';
    consequences.push('Stored in plaintext in ~/.bash_history or ~/.zsh_history');
    consequences.push('Exposed to all child processes and environment inspection tools (ps auxe)');
    affectedResources.push('Shell History', 'Process Environment', 'Cloud API Credentials');
    reasons.push('Plaintext secrets entered directly into shell prompts are recorded on disk');
    matchedRules.push({
      id: 'RULE-CREDENTIAL-EXPOSURE',
      name: 'Plaintext Secret in Shell',
      severity: 'Medium',
      description: 'Hardcoded API keys, tokens, or passwords passed directly in shell command.',
      mitigation: 'Store secrets in an ignored .env file or use a secret manager vault (e.g., aws-vault).'
    });
    ghostCommentary = 'Whispering your secrets into the wind... the spirits will write them down in history!';
    saferAlternative = 'read -s -p "Enter Secret: " MY_SECRET # Reads secret without echoing or shell history recording';
  }

  // Tokenize basic components
  const parts = trimmed.split(/(\||\&\&|;)/g);
  parts.forEach((p) => {
    const clean = p.trim();
    if (clean && clean !== '|' && clean !== '&&' && clean !== ';') {
      components.push({
        part: clean,
        type: 'Shell Segment',
        explanation: `Executes '${clean.split(' ')[0]}' utility with provided arguments.`
      });
    }
  });

  return {
    id: 'local_' + Date.now(),
    command: trimmed,
    riskLevel,
    summary,
    components,
    consequences,
    affectedResources,
    reasons,
    matchedRules,
    saferAlternative,
    ghostCommentary,
    modelMetadata: {
      provider: 'Deterministic Rule Engine',
      model: 'Static Analyzer (Offline Safe)'
    },
    isDeterministicOnly: true
  };
}

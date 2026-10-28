import React, { useState } from 'react';
import { 
  Shield, Trash2, Search, Filter, Skull, AlertTriangle, ShieldCheck, 
  ExternalLink, Calendar, Terminal, RefreshCw, X
} from 'lucide-react';

export function HistoryDashboard({ history, onDeleteItem, onClearHistory, onSelectAnalysis, onRefresh }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Compute risk distributions
  const stats = {
    total: history.length,
    critical: history.filter(h => h.riskLevel === 'Critical').length,
    high: history.filter(h => h.riskLevel === 'High').length,
    medium: history.filter(h => h.riskLevel === 'Medium').length,
    low: history.filter(h => h.riskLevel === 'Low').length,
  };

  // Filter items
  const filteredHistory = history.filter(item => {
    const matchesRisk = filterRisk === 'ALL' || item.riskLevel === filterRisk;
    const matchesQuery = !searchQuery || 
      item.command?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesQuery;
  });

  const getRiskBadge = (level) => {
    switch (level) {
      case 'Critical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-800">CRITICAL</span>;
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-950/80 text-orange-300 border border-orange-800">HIGH</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800">MEDIUM</span>;
      case 'Low':
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-lime-950/80 text-lime-300 border border-lime-800">LOW</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#15223c]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-400" />
            <span>Analysis Archive & Risk Metrics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Anonymous session-isolated history. Records are stored securely and never broadcasted to other developers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg bg-[#060a14] border border-[#15223c] text-blue-300 hover:text-white hover:border-blue-500/60 transition-colors"
            title="Refresh history"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {history.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-3 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/60 text-rose-300 text-xs font-mono transition-colors flex items-center space-x-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Archive</span>
            </button>
          )}
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#060a14] border border-rose-500/40 rounded-2xl p-6 space-y-4 shadow-[0_0_35px_rgba(244,63,94,0.3)]">
            <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
              <Skull className="w-5 h-5 text-rose-400" />
              <span>Banish All Historical Records?</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This action will permanently purge all recorded command analyses associated with your current session. This cannot be undone.
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-lg bg-[#0d162a] text-slate-300 text-xs font-mono hover:bg-[#15223c] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearHistory();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-semibold transition-colors"
              >
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-[#060a14] border border-[#15223c]">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Total Analyses</span>
          <p className="text-2xl font-bold font-mono text-white mt-1">{stats.total}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#060a14] border border-rose-950/60">
          <span className="text-[10px] font-mono text-rose-400 uppercase flex items-center space-x-1">
            <Skull className="w-3 h-3" />
            <span>Critical</span>
          </span>
          <p className="text-2xl font-bold font-mono text-rose-400 mt-1">{stats.critical}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#060a14] border border-orange-950/60">
          <span className="text-[10px] font-mono text-orange-400 uppercase flex items-center space-x-1">
            <AlertTriangle className="w-3 h-3" />
            <span>High Risk</span>
          </span>
          <p className="text-2xl font-bold font-mono text-orange-400 mt-1">{stats.high}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#060a14] border border-amber-950/60">
          <span className="text-[10px] font-mono text-amber-400 uppercase">Medium</span>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{stats.medium}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#060a14] border border-lime-950/60">
          <span className="text-[10px] font-mono text-lime-400 uppercase flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Safe / Low</span>
          </span>
          <p className="text-2xl font-bold font-mono text-lime-400 mt-1">{stats.low}</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search command text or summary..."
            className="w-full bg-[#060a14] border border-[#15223c] rounded-xl pl-9 pr-4 py-2.5 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="bg-[#060a14] border border-[#15223c] rounded-xl px-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Severities</option>
            <option value="Critical">Critical Only</option>
            <option value="High">High Only</option>
            <option value="Medium">Medium Only</option>
            <option value="Low">Low / Safe Only</option>
          </select>
        </div>
      </div>

      {/* History Items List */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#060a14] border border-[#15223c] hover:border-blue-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1.5">
                  {getRiskBadge(item.riskLevel)}
                  <span className="text-[11px] text-slate-400 font-mono flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.createdAt || Date.now()).toLocaleString()}</span>
                  </span>
                </div>

                <div className="font-mono text-xs sm:text-sm text-lime-300 bg-[#03050a] px-3 py-1.5 rounded-lg border border-[#15223c] truncate mb-1">
                  <code>{item.command}</code>
                </div>

                <p className="text-xs text-slate-400 line-clamp-1">
                  {item.summary || 'Shell command inspected by Poltergeist'}
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => onSelectAnalysis(item)}
                  className="px-3 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/70 border border-blue-500/40 text-blue-300 hover:text-lime-300 text-xs font-mono transition-colors flex items-center space-x-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Inspect</span>
                </button>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-[#0d162a] rounded-lg transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl bg-[#060a14]/60 border border-[#15223c] border-dashed">
          <Terminal className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-300 font-mono">No analyses found</h3>
          <p className="text-xs text-slate-500 font-mono mt-1">
            {searchQuery || filterRisk !== 'ALL' 
              ? 'Try adjusting your search criteria or risk filter.' 
              : 'Analyze your first command in the Terminal to record history.'}
          </p>
        </div>
      )}
    </div>
  );
}

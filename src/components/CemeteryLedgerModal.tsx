import React from 'react';
import { BuriedTab, CemeteryStats } from '../types';
import { formatBurialDate, formatTimeAgo, getDomain, getFaviconUrl } from '../utils/helpers';
import { X, Skull, Clock, BookOpen, TrendingUp } from 'lucide-react';

interface CemeteryLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: CemeteryStats;
  recentTabs: BuriedTab[];
  onSelectTab: (tab: BuriedTab) => void;
}

export const CemeteryLedgerModal: React.FC<CemeteryLedgerModalProps> = ({
  isOpen,
  onClose,
  stats,
  recentTabs,
  onSelectTab
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#10151f] border border-[#344256] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ledger Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-[#161f2c] via-[#1d2737] to-[#161f2c] border-b border-[#2d3a4d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0d1117] border border-[#3d4d63] flex items-center justify-center text-amber-200 shadow-inner">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-gothic text-lg font-bold text-slate-100 tracking-wide">
                The Cemetery Ledger
              </h2>
              <p className="text-xs text-slate-300 font-sans">
                Official necrological records of your unread internet tabs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close ledger"
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-[#253245] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-[#0a0e14] rounded-xl border border-[#2d3a4c] text-center shadow-sm">
              <span className="block text-xs font-sans uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Tabs Laid to Rest
              </span>
              <span className="font-gothic text-3xl font-black text-amber-300">
                {stats.totalBuried}
              </span>
              <span className="block text-xs text-slate-300 mt-1 font-medium">Saved from tab chaos</span>
            </div>

            <div className="p-4 bg-[#0a0e14] rounded-xl border border-[#2d3a4c] text-center shadow-sm">
              <span className="block text-xs font-sans uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Days Entombed
              </span>
              <span className="font-gothic text-3xl font-black text-slate-100">
                {stats.totalDaysEntombed}
              </span>
              <span className="block text-xs text-slate-300 mt-1 font-medium">Total neglected days</span>
            </div>

            <div className="p-4 bg-[#0a0e14] rounded-xl border border-[#2d3a4c] text-center shadow-sm">
              <span className="block text-xs font-sans uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Vigil Candles
              </span>
              <span className="font-gothic text-3xl font-black text-amber-400">
                {stats.totalCandlesLit}
              </span>
              <span className="block text-xs text-slate-300 mt-1 font-medium">Grieving in the dark</span>
            </div>

            <div className="p-4 bg-[#0a0e14] rounded-xl border border-[#2d3a4c] text-center shadow-sm">
              <span className="block text-xs font-sans uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Wilted Roses
              </span>
              <span className="font-gothic text-3xl font-black text-rose-300">
                {stats.totalFlowers}
              </span>
              <span className="block text-xs text-slate-300 mt-1 font-medium">Tributes offered</span>
            </div>
          </div>

          {/* Oldest Resident Section */}
          {stats.oldestResident && (
            <div className="p-5 bg-gradient-to-r from-[#17212f] to-[#101620] rounded-xl border border-[#35455c] relative overflow-hidden shadow-md">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-gothic uppercase tracking-wider text-amber-300 font-bold">
                  <Skull className="w-4 h-4 text-amber-400" />
                  Oldest Resident of the Grounds
                </span>
                <span className="text-xs font-sans text-slate-200 bg-[#0c1017] px-3 py-1 rounded-full border border-[#2d3b4e] font-medium">
                  {formatTimeAgo(stats.oldestResident.burialDate)}
                </span>
              </div>
              <p 
                onClick={() => {
                  onClose();
                  onSelectTab(stats.oldestResident!);
                }}
                className="font-gothic text-base font-bold text-slate-100 hover:text-amber-200 cursor-pointer transition-colors leading-snug truncate"
              >
                {stats.oldestResident.title}
              </p>
              <p className="text-xs sm:text-sm text-slate-200 font-epitaph italic mt-1.5 truncate">
                &ldquo;{stats.oldestResident.causeOfDeath}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-300 pt-2.5 border-t border-[#293649]">
                <span className="font-mono text-slate-300">Domain: {getDomain(stats.oldestResident.url)}</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectTab(stats.oldestResident!);
                  }}
                  className="text-amber-300 hover:text-amber-100 font-sans text-xs font-semibold underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
                >
                  Visit plot &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Top Cause of Demise */}
          <div className="p-4 bg-[#0a0e14] rounded-xl border border-[#2d3a4c] flex items-start gap-3 shadow-sm">
            <div className="p-2 rounded-lg bg-[#141b25] text-amber-400 border border-[#334255] flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-sans uppercase tracking-wider text-slate-300 font-semibold">
                Leading Cause of Tab Demise
              </span>
              <p className="text-sm font-epitaph italic text-slate-100 mt-1">
                &ldquo;{stats.mostCommonCause}&rdquo;
              </p>
            </div>
          </div>

          {/* Recently Buried Tabs */}
          <div>
            <h3 className="text-xs font-gothic uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2 font-bold">
              <Clock className="w-4 h-4 text-amber-400" />
              Recently Buried Tabs
            </h3>
            {recentTabs.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No recent burials recorded.</p>
            ) : (
              <div className="space-y-2">
                {recentTabs.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onClose();
                      onSelectTab(t);
                    }}
                    className="p-3 bg-[#0d1219] hover:bg-[#141c28] rounded-xl border border-[#293647] hover:border-[#3e4f68] cursor-pointer transition-all flex items-center justify-between group gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <img
                        src={getFaviconUrl(t.url)}
                        alt=""
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                        className="w-4 h-4 rounded-sm flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-sans font-semibold text-slate-100 group-hover:text-amber-200 truncate">
                          {t.title}
                        </p>
                        <p className="text-xs text-slate-300 font-mono truncate mt-0.5">
                          {getDomain(t.url)} &bull; {formatBurialDate(t.burialDate)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-300 font-sans font-medium whitespace-nowrap flex-shrink-0">
                      {formatTimeAgo(t.burialDate)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0e14] border-t border-[#263243] flex items-center justify-between text-xs text-slate-300">
          <span className="font-medium">Tab Cemetery &bull; Eternal Ledger</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-[#151d29] hover:bg-[#1e2838] border border-[#2e3a4d] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
          >
            Close Ledger
          </button>
        </div>
      </div>
    </div>
  );
};

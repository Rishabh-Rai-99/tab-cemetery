import React from 'react';
import { BuriedTab } from '../types';
import { formatBurialDate, formatTimeAgo, getDomain, getFaviconUrl } from '../utils/helpers';
import { Flame, Sparkles } from 'lucide-react';

interface CemeteryListViewProps {
  tabs: BuriedTab[];
  onSelect: (tab: BuriedTab) => void;
  onQuickResurrect: (tab: BuriedTab, e: React.MouseEvent) => void;
}

export const CemeteryListView: React.FC<CemeteryListViewProps> = ({
  tabs,
  onSelect,
  onQuickResurrect
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 z-20 relative">
      <div className="bg-[#0e131b] border border-[#2c3749] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        {/* Table Header (Desktop) */}
        <div className="hidden sm:grid grid-cols-12 px-5 py-3 border-b border-[#252f3f] text-xs font-gothic uppercase tracking-wider text-slate-200 font-bold bg-[#090c12]">
          <div className="col-span-5">Entombed Tab &amp; Domain</div>
          <div className="col-span-4">Cause of Demise</div>
          <div className="col-span-2">Burial Date</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#1e2736]">
          {tabs.map((tab) => {
            const domain = getDomain(tab.url);
            const favicon = getFaviconUrl(tab.url);

            return (
              <div
                key={tab.id}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${tab.title}`}
                onClick={() => onSelect(tab)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(tab);
                  }
                }}
                className="p-4 sm:px-5 sm:py-3.5 hover:bg-[#141b25] transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              >
                {/* Desktop Grid Layout */}
                <div className="hidden sm:grid grid-cols-12 items-center">
                  {/* Title & Favicon */}
                  <div className="col-span-5 flex items-center gap-3 pr-3 min-w-0">
                    <div className="w-7 h-8 rounded-t-lg bg-[#18212e] border border-[#344459] flex items-center justify-center flex-shrink-0 group-hover:border-amber-400 transition-colors">
                      <span className="text-[10px] text-slate-300 font-mono">†</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={favicon}
                          alt=""
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                          className="w-3.5 h-3.5 rounded-sm object-contain"
                        />
                        <span className="text-xs font-mono text-slate-300 truncate max-w-[140px]">
                          {domain}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-100 group-hover:text-amber-200 truncate mt-0.5">
                        {tab.title}
                      </h4>
                    </div>
                  </div>

                  {/* Cause of death */}
                  <div className="col-span-4 pr-3 min-w-0">
                    <p className="text-xs text-slate-200 font-epitaph italic truncate">
                      &ldquo;{tab.causeOfDeath}&rdquo;
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {tab.candleLit && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-medium bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-600/60">
                          <Flame className="w-3 h-3 animate-flame text-amber-400" />
                          <span>Candle</span>
                        </span>
                      )}
                      {tab.flowersCount > 0 && (
                        <span className="text-[11px] text-rose-200 font-medium bg-rose-950/50 px-1.5 py-0.5 rounded border border-rose-800/60">
                          🥀 {tab.flowersCount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Burial Date */}
                  <div className="col-span-2 text-xs">
                    <span className="block font-gothic text-xs font-semibold text-slate-200">
                      {formatBurialDate(tab.burialDate)}
                    </span>
                    <span className="block text-xs text-slate-300 font-medium">
                      {formatTimeAgo(tab.burialDate)}
                    </span>
                  </div>

                  {/* Quick actions */}
                  <div className="col-span-1 text-right flex items-center justify-end">
                    <button
                      type="button"
                      onClick={(e) => onQuickResurrect(tab, e)}
                      className="p-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-800 border border-emerald-600/80 hover:border-emerald-500 text-emerald-200 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                      title="Resurrect tab in browser"
                      aria-label={`Resurrect ${tab.title}`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>
                </div>

                {/* Mobile Stack Layout */}
                <div className="sm:hidden flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-8 rounded-t-lg bg-[#18212e] border border-[#344459] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] text-slate-300 font-mono">†</span>
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={favicon}
                          alt=""
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                          className="w-3.5 h-3.5 rounded-sm object-contain"
                        />
                        <span className="text-xs font-mono text-slate-300 truncate max-w-[160px]">
                          {domain}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-100 truncate">
                        {tab.title}
                      </h4>
                      <p className="text-xs text-slate-200 font-epitaph italic line-clamp-1">
                        &ldquo;{tab.causeOfDeath}&rdquo;
                      </p>
                      <div className="flex items-center gap-2 pt-0.5 text-xs text-slate-300 font-medium">
                        <span>{formatBurialDate(tab.burialDate)}</span>
                        <span>&bull;</span>
                        <span>{formatTimeAgo(tab.burialDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Resurrect action button */}
                  <button
                    type="button"
                    onClick={(e) => onQuickResurrect(tab, e)}
                    className="p-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-800 border border-emerald-600/80 text-emerald-200 hover:text-white transition-all shadow flex-shrink-0"
                    title="Resurrect tab in browser"
                    aria-label={`Resurrect ${tab.title}`}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

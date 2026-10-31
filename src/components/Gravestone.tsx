import React from 'react';
import { BuriedTab } from '../types';
import { formatBurialDate, formatTimeAgo, getDomain, getFaviconUrl } from '../utils/helpers';
import { Flame, Sparkles } from 'lucide-react';

interface GravestoneProps {
  tab: BuriedTab;
  onSelect: (tab: BuriedTab) => void;
  onQuickResurrect: (tab: BuriedTab, e: React.MouseEvent) => void;
}

export const Gravestone: React.FC<GravestoneProps> = ({
  tab,
  onSelect,
  onQuickResurrect
}) => {
  const domain = getDomain(tab.url);
  const favicon = getFaviconUrl(tab.url);

  // Render stone top contour based on graveStyle
  const renderStoneHeader = () => {
    switch (tab.graveStyle) {
      case 'gothic':
        return (
          <div className="relative flex justify-center items-center pb-2">
            {/* Gothic pointed arch spire */}
            <div className="w-0 h-0 border-l-[36px] border-l-transparent border-r-[36px] border-r-transparent border-b-[24px] border-b-[#263140] -mt-5"></div>
            <div className="absolute top-0 text-xs tracking-widest text-slate-300 font-gothic font-bold uppercase">
              † RIP †
            </div>
          </div>
        );
      case 'obelisk':
        return (
          <div className="relative flex justify-center items-center pb-2">
            <div className="w-20 h-3.5 bg-[#222a37] border-t border-x border-[#48586e] rounded-t-sm"></div>
            <div className="absolute top-1 text-xs tracking-widest text-slate-300 font-gothic font-bold">
              MEMORIA
            </div>
          </div>
        );
      case 'cross':
        return (
          <div className="relative flex justify-center items-center pb-1">
            <div className="flex flex-col items-center">
              <div className="w-4 h-6 bg-[#2d3848] border-t border-x border-[#596b82] rounded-t-sm flex items-center justify-center">
                <div className="w-8 h-2.5 bg-[#2d3848] border border-[#596b82] shadow-sm -mt-1"></div>
              </div>
            </div>
          </div>
        );
      case 'weathered':
        return (
          <div className="relative flex justify-between items-end px-3 pb-2 pt-1 border-b border-[#3b4b5e]">
            <span className="text-xs text-emerald-400 font-mono font-medium tracking-tight">🌿 mossy</span>
            <span className="text-xs tracking-widest text-slate-300 font-gothic font-bold">R.I.P</span>
            <span className="text-xs text-slate-300 font-serif">†</span>
          </div>
        );
      case 'classic':
      default:
        return (
          <div className="relative flex justify-center items-center pb-2 pt-1">
            <div className="w-14 h-1.5 bg-[#3e4d61] rounded-full mb-1"></div>
            <div className="absolute top-1 text-xs tracking-widest text-slate-300 font-gothic font-bold uppercase">
              R. I. P.
            </div>
          </div>
        );
    }
  };

  const getStoneContainerClass = () => {
    switch (tab.graveStyle) {
      case 'gothic':
        return 'rounded-t-3xl border-t-2';
      case 'obelisk':
        return 'rounded-t-md border-t-2';
      case 'cross':
        return 'rounded-t-2xl border-t';
      case 'weathered':
        return 'rounded-tl-2xl rounded-tr-md rounded-bl-sm rounded-br-2xl border-dashed';
      case 'classic':
      default:
        return 'rounded-t-[44px] border-t-2';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(tab);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Inspect grave: ${tab.title}`}
      onClick={() => onSelect(tab)}
      onKeyDown={handleKeyDown}
      className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 transform hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 rounded-2xl select-none w-full max-w-[280px]"
    >
      {/* Ghostly Hover aura / Moonlight halo */}
      <div className="absolute -inset-2 bg-gradient-to-t from-transparent via-cyan-950/25 to-blue-900/20 rounded-3xl opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />

      {/* Main Stone Body */}
      <div
        className={`w-full min-h-[310px] flex flex-col justify-between p-4 bg-gradient-to-b from-[#202734] via-[#171d27] to-[#12161f] border border-[#374659] group-hover:border-[#586e8a] group-focus-visible:border-amber-400 shadow-[0_12px_24px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)] group-hover:shadow-[0_16px_36px_rgba(15,23,42,0.85)] relative z-10 ${getStoneContainerClass()} transition-colors duration-300`}
      >
        {/* Weathering crack accent on weathered stones */}
        {tab.graveStyle === 'weathered' && (
          <div className="absolute top-10 right-4 w-7 h-10 border-r border-t border-[#4d5f77] rotate-12 opacity-50 pointer-events-none" />
        )}

        {/* Stone Top Header */}
        <div>
          {renderStoneHeader()}

          {/* Favicon & Domain badge */}
          <div className="flex items-center justify-center gap-1.5 mt-2 mb-3 bg-[#0d1117] py-1 px-3 rounded-full border border-[#364457] w-fit mx-auto shadow-inner">
            <img
              src={favicon}
              alt=""
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
              className="w-3.5 h-3.5 rounded-sm object-contain opacity-90 group-hover:opacity-100"
            />
            <span className="text-xs text-slate-200 font-mono tracking-tight truncate max-w-[170px]">
              {domain}
            </span>
          </div>

          {/* Carved Epitaph / Title */}
          <div className="text-center px-1">
            <h3
              className="font-gothic font-bold text-slate-100 text-sm leading-snug line-clamp-3 group-hover:text-amber-200 transition-colors engraved-text mb-2 break-words"
              title={tab.title}
            >
              {tab.title}
            </h3>

            {/* Cause of death preview with clear contrast */}
            <p className="text-xs text-slate-300 font-epitaph italic line-clamp-2 leading-relaxed">
              &ldquo;{tab.causeOfDeath}&rdquo;
            </p>
          </div>
        </div>

        {/* Stone Foot / Dates / Honors */}
        <div className="pt-3 border-t border-[#2c3848] mt-3">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
            <span className="font-gothic text-xs font-semibold tracking-wide text-slate-300">
              {formatBurialDate(tab.burialDate)}
            </span>
            <span className="text-slate-300 text-xs font-sans font-medium">
              {formatTimeAgo(tab.burialDate)}
            </span>
          </div>

          {/* Flowers & Candles status row and Action Button */}
          <div className="flex items-center justify-between pt-1 gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {tab.candleLit && (
                <span className="inline-flex items-center gap-1 text-xs text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-600/70 shadow-sm" title="Vigil candle lit">
                  <Flame className="w-3.5 h-3.5 animate-flame text-amber-400" />
                  <span className="font-medium text-[11px]">Vigil</span>
                </span>
              )}
              {tab.flowersCount > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-rose-200 bg-rose-950/50 px-2 py-0.5 rounded-md border border-rose-800/60 shadow-sm" title={`${tab.flowersCount} flowers placed`}>
                  <span>🥀</span>
                  <span className="font-medium text-[11px]">{tab.flowersCount}</span>
                </span>
              )}
            </div>

            {/* Resurrect action button: visible on mobile, clear hover on desktop */}
            <button
              type="button"
              onClick={(e) => onQuickResurrect(tab, e)}
              title="Resurrect tab in browser"
              aria-label={`Resurrect tab: ${tab.title}`}
              className="text-xs font-sans font-semibold text-emerald-200 hover:text-white bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/80 hover:border-emerald-500 px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 transition-all opacity-100 sm:opacity-90 sm:group-hover:opacity-100 focus:opacity-100 focus-visible:ring-1 focus-visible:ring-emerald-400"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Rise</span>
            </button>
          </div>
        </div>
      </div>

      {/* Earth mound & moss / grass at foot of headstone */}
      <div className="w-full h-4 bg-gradient-to-b from-[#141922] to-[#0c0f15] rounded-b-xl border-b border-x border-[#232b37] shadow-lg flex items-center justify-center -mt-1 z-20 relative">
        <div className="w-3/4 h-1 bg-[#1e2735] rounded-full opacity-70"></div>
        {/* Moss tufts with improved color contrast */}
        <span className="absolute -left-1 -top-1 text-xs select-none text-emerald-500/90">🌱</span>
        <span className="absolute -right-1 -top-1 text-xs select-none text-emerald-400/90">🌿</span>
      </div>
    </div>
  );
};

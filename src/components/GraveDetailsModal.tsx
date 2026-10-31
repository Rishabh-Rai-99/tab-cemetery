import React, { useState } from 'react';
import { BuriedTab } from '../types';
import { formatBurialDateTime, formatTimeAgo, getDomain, getFaviconUrl, playAtmosphericChime } from '../utils/helpers';
import confetti from 'canvas-confetti';
import { 
  X, 
  ExternalLink, 
  Trash2, 
  Flame, 
  Sparkles, 
  Copy, 
  Check, 
  Clock, 
  Calendar,
  AlertTriangle 
} from 'lucide-react';

interface GraveDetailsModalProps {
  tab: BuriedTab | null;
  onClose: () => void;
  onResurrect: (tab: BuriedTab) => void;
  onDelete: (tab: BuriedTab) => void;
  onToggleCandle: (tabId: string) => void;
  onAddFlower: (tabId: string) => void;
}

export const GraveDetailsModal: React.FC<GraveDetailsModalProps> = ({
  tab,
  onClose,
  onResurrect,
  onDelete,
  onToggleCandle,
  onAddFlower
}) => {
  const [confirmResurrect, setConfirmResurrect] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!tab) return null;

  const domain = getDomain(tab.url);
  const favicon = getFaviconUrl(tab.url);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(tab.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleExecuteResurrect = () => {
    playAtmosphericChime('resurrect');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#a7f3d0', '#6ee7b7', '#34d399', '#fef08a', '#ffffff'],
        disableForReducedMotion: true
      });
    } catch {
      // Ignore if confetti not supported
    }

    window.open(tab.url, '_blank', 'noopener,noreferrer');
    onResurrect(tab);
    onClose();
  };

  const handleExecuteDelete = () => {
    playAtmosphericChime('delete');
    onDelete(tab);
    onClose();
  };

  const handleCandleClick = () => {
    playAtmosphericChime('candle');
    onToggleCandle(tab.id);
  };

  const handleFlowerClick = () => {
    playAtmosphericChime('candle');
    onAddFlower(tab.id);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-[#111620] border border-[#344256] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top atmospheric bar */}
        <div className="relative px-6 py-4 bg-gradient-to-r from-[#161f2c] via-[#1d2737] to-[#161f2c] border-b border-[#2d3a4d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-gothic tracking-widest text-slate-200 uppercase font-semibold">
              Plot Registry &bull; {tab.graveStyle} Headstone
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-[#253245] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gravestone detail body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          {/* Gravestone Inscription Card */}
          <div className="relative p-5 sm:p-6 bg-gradient-to-b from-[#192230] to-[#111721] rounded-2xl border border-[#35445a] shadow-inner text-center">
            {/* RIP cross insignia */}
            <div 
              aria-hidden="true" 
              className="mb-3 text-slate-300 font-gothic text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2"
            >
              <span className="w-8 h-px bg-slate-600"></span>
              <span>Here Lies In Peace</span>
              <span className="w-8 h-px bg-slate-600"></span>
            </div>

            {/* Favicon & Domain */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0c1017] rounded-full border border-[#344256] mb-3">
              <img
                src={favicon}
                alt=""
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-4 h-4 rounded-sm object-contain"
              />
              <span className="text-xs font-mono text-slate-200 font-medium">
                {domain}
              </span>
            </div>

            {/* Inscribed Tab Title */}
            <h2 className="font-gothic text-xl sm:text-2xl font-bold text-slate-100 leading-snug mb-3 engraved-text break-words">
              {tab.title}
            </h2>

            {/* Cause of death */}
            <div className="py-2 px-4 bg-[#0c1017] rounded-xl border border-[#2b3749] inline-block max-w-md mx-auto mb-3">
              <p className="text-xs sm:text-sm text-amber-200 font-epitaph italic leading-relaxed">
                &ldquo;{tab.causeOfDeath}&rdquo;
              </p>
            </div>

            {/* Optional Personal Note */}
            {tab.note && (
              <p className="text-xs sm:text-sm text-slate-200 font-reading italic max-w-md mx-auto leading-relaxed border-t border-[#2a3648] pt-3 mt-2">
                &ldquo;{tab.note}&rdquo;
              </p>
            )}

            {/* URL preview with copy */}
            <div className="mt-4 pt-3 border-t border-[#293547] flex items-center justify-between text-xs font-mono bg-[#090c12] border border-[#263244] px-3.5 py-2 rounded-xl gap-2">
              <span className="truncate flex-1 text-slate-300 select-all text-left">
                {tab.url}
              </span>
              <button
                onClick={handleCopyUrl}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-[#1a2331] rounded-lg transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 flex-shrink-0"
                title="Copy URL"
                aria-label="Copy URL to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="text-[11px] font-sans font-medium">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Burial Metadata & Vigil Respects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Time buried card */}
            <div className="p-3.5 bg-[#0e131b] rounded-xl border border-[#2c384a] space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-200 font-sans">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-200">Burial Ceremony</span>
              </div>
              <p className="text-slate-100 font-mono text-xs font-medium">
                {formatBurialDateTime(tab.burialDate)}
              </p>
              <div className="flex items-center gap-1.5 text-slate-300 text-xs pt-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium">{formatTimeAgo(tab.burialDate)}</span>
              </div>
            </div>

            {/* Interactive Vigil Card (Pay Respects) */}
            <div className="p-3.5 bg-[#0e131b] rounded-xl border border-[#2c384a] flex flex-col justify-between">
              <span className="text-slate-200 font-semibold text-xs uppercase tracking-wider">
                Pay Your Respects
              </span>
              <div className="flex items-center gap-2 pt-2">
                {/* Light candle button */}
                <button
                  type="button"
                  onClick={handleCandleClick}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                    tab.candleLit
                      ? 'bg-amber-950/70 border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-semibold'
                      : 'bg-[#141b25] border-[#38475c] text-slate-200 hover:text-amber-200 hover:border-amber-600/70 hover:bg-[#1b2432]'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${tab.candleLit ? 'animate-flame text-amber-400' : 'text-slate-400'}`} />
                  <span>{tab.candleLit ? 'Candle Lit' : 'Light Candle'}</span>
                </button>

                {/* Place wilted flower button */}
                <button
                  type="button"
                  onClick={handleFlowerClick}
                  className="py-2 px-3.5 bg-[#141b25] hover:bg-rose-950/40 border border-[#38475c] hover:border-rose-600/70 text-slate-200 hover:text-rose-200 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-400"
                  title="Leave a black rose at the grave"
                  aria-label={`Leave a flower at the grave. Current count: ${tab.flowersCount}`}
                >
                  <span>🥀</span>
                  <span className="font-semibold">+{tab.flowersCount}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Confirmation Banners if actions triggered */}
          {confirmResurrect && (
            <div className="p-4 bg-emerald-950/60 border border-emerald-500/80 rounded-xl space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-200 font-gothic text-sm font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Resurrect this tab?</span>
              </div>
              <p className="text-xs text-emerald-100 font-sans leading-relaxed">
                The tab will open in a new browser window and ascend from the cemetery grounds forever.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmResurrect(false)}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:text-white hover:bg-[#1f2937] rounded-lg transition-colors border border-transparent hover:border-slate-600"
                >
                  Keep entombed
                </button>
                <button
                  type="button"
                  onClick={handleExecuteResurrect}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow transition-all"
                >
                  Yes, Resurrect
                </button>
              </div>
            </div>
          )}

          {confirmDelete && (
            <div className="p-4 bg-rose-950/60 border border-rose-500/80 rounded-xl space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-rose-200 font-gothic text-sm font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Let it rest forever?</span>
              </div>
              <p className="text-xs text-rose-100 font-sans leading-relaxed">
                This tab will be permanently erased from the cemetery grounds and forgotten for eternity.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:text-white hover:bg-[#1f2937] rounded-lg transition-colors border border-transparent hover:border-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecuteDelete}
                  className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow transition-all"
                >
                  Permanently let it rest
                </button>
              </div>
            </div>
          )}

          {/* Primary Action Buttons */}
          {!confirmResurrect && !confirmDelete && (
            <div className="pt-2 border-t border-[#293548] flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Delete / Let it rest action */}
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-rose-900/60 hover:border-rose-700/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Let it rest</span>
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#151d29] hover:bg-[#1e2838] border border-[#2e3a4d] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                >
                  Close
                </button>
                {/* Resurrect action */}
                <button
                  type="button"
                  onClick={() => setConfirmResurrect(true)}
                  className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-gothic font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 rounded-xl shadow-lg hover:shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Resurrect</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

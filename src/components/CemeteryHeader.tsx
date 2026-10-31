import React from 'react';
import { CemeteryStats } from '../types';
import { Plus, BookOpen, Volume2, VolumeX } from 'lucide-react';

interface CemeteryHeaderProps {
  stats: CemeteryStats;
  onOpenBuryModal: () => void;
  onOpenLedgerModal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CemeteryHeader: React.FC<CemeteryHeaderProps> = ({
  stats,
  onOpenBuryModal,
  onOpenLedgerModal,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <header className="relative pt-6 sm:pt-10 pb-8 px-4 text-center z-20 w-full max-w-full">
      {/* Top utility row: Sound & Ledger quick access */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6 px-1 sm:px-2 gap-2">
        {/* Left: Atmospheric Cemetery Crest */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-300 font-gothic tracking-widest uppercase flex-shrink-0">
          <span className="text-amber-400 font-bold">†</span>
          <span className="font-semibold text-slate-200">EST. 2026</span>
          <span className="text-amber-400 font-bold">†</span>
        </div>

        {/* Right: Sound toggle and ledger pill */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-[#131924] hover:bg-[#1d2636] border border-[#334255] text-slate-300 hover:text-white transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title={soundEnabled ? 'Mute solemn bell chimes' : 'Unmute solemn bell chimes'}
            aria-label={soundEnabled ? 'Mute solemn bell chimes' : 'Unmute solemn bell chimes'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={onOpenLedgerModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#131924] hover:bg-[#1d2636] border border-[#334255] text-slate-200 hover:text-white transition-colors text-xs font-sans shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="View Cemetery Ledger Statistics"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-amber-300">{stats.totalBuried}</span>
            <span className="text-slate-300 font-medium">
              <span className="inline sm:hidden">tabs</span>
              <span className="hidden sm:inline">tabs laid to rest</span>
            </span>
          </button>
        </div>
      </div>

      {/* Main Title & Subtitle per suggested copy */}
      <div className="max-w-2xl mx-auto space-y-3 relative px-2">
        {/* Decorative gothic flourish */}
        <div 
          aria-hidden="true" 
          className="flex items-center justify-center gap-3 text-slate-400 text-xs font-serif font-medium tracking-widest uppercase mb-1"
        >
          <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-slate-600"></span>
          <span className="text-[11px] sm:text-xs">Hallowed Browser Sanctuary</span>
          <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-slate-600"></span>
        </div>

        <h1 className="font-gothic text-2xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight break-words">
          <span className="block sm:inline">Welcome to </span>
          <span className="text-amber-200 block sm:inline">Tab Cemetery</span>
        </h1>

        <p className="text-xs sm:text-base text-slate-300 font-reading italic max-w-xl mx-auto leading-relaxed">
          &ldquo;A resting place for all those tabs you&apos;ll read later.&rdquo;
        </p>

        {/* Primary Call to Action */}
        <div className="pt-3 sm:pt-4 flex items-center justify-center gap-3">
          <button
            onClick={onOpenBuryModal}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-b from-[#243040] to-[#161f2c] hover:from-[#2e3d52] hover:to-[#1c2738] border border-amber-500/70 hover:border-amber-400 text-amber-200 hover:text-white font-gothic text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8),0_0_15px_rgba(245,158,11,0.2)] transition-all transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span className="text-base select-none group-hover:rotate-12 transition-transform duration-300">🪦</span>
            <span>Bury a tab</span>
            <Plus className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

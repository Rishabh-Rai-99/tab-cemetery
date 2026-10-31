import React from 'react';
import { Plus, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  isFiltered: boolean;
  onClearFilters: () => void;
  onOpenBuryModal: () => void;
  onLoadSampleTabs: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltered,
  onClearFilters,
  onOpenBuryModal,
  onLoadSampleTabs
}) => {
  if (isFiltered) {
    return (
      <div className="max-w-md mx-auto my-14 p-8 text-center bg-[#0d1117] rounded-2xl border border-[#2d3a4d] shadow-xl backdrop-blur-sm z-20 relative">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#151c27] border border-[#38485e] flex items-center justify-center text-2xl select-none">
          🌫️
        </div>
        <h3 className="font-gothic text-lg font-bold text-slate-100 mb-2">
          No Graves Match Your Search
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-reading italic mb-5 leading-relaxed">
          The mist conceals no forgotten tabs under these query parameters.
        </p>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#17202c] hover:bg-[#222e3f] border border-[#38485e] text-slate-200 hover:text-white text-xs font-sans font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Clear Search Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-14 p-7 sm:p-10 text-center bg-[#0e1219] rounded-3xl border border-[#2f3d52] shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-md z-20 relative">
      {/* Decorative tombstone illustration */}
      <div className="w-20 h-24 mx-auto mb-5 rounded-t-3xl bg-gradient-to-b from-[#242e3d] to-[#141a24] border-t-2 border-x border-[#43546c] flex flex-col items-center justify-center shadow-lg relative">
        <span className="text-xs font-gothic text-slate-300 font-bold tracking-widest uppercase">RIP</span>
        <span className="text-[10px] text-slate-400 font-mono mt-1 font-medium">EMPTY</span>
        {/* Little flower at base */}
        <span className="absolute -bottom-2 text-sm select-none">🥀</span>
      </div>

      <h3 className="font-gothic text-xl sm:text-2xl font-bold text-slate-100 mb-2 engraved-text">
        It&apos;s peaceful here. No tabs have been buried yet.
      </h3>

      <p className="text-xs sm:text-sm text-slate-300 font-reading italic max-w-sm mx-auto mb-6 leading-relaxed">
        The cemetery grounds are still... but somewhere in your open browser windows, dozens of unread tabs are waiting to rest in peace.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onOpenBuryModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-gothic text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Bury Your First Tab</span>
        </button>

        <button
          type="button"
          onClick={onLoadSampleTabs}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#141b26] hover:bg-[#1e2736] text-slate-200 hover:text-white border border-[#37475d] text-xs font-sans font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        >
          <span>Populate Sample Graves</span>
        </button>
      </div>
    </div>
  );
};

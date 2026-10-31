import React from 'react';
import { SortOption, Category } from '../types';
import { Search, X, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

interface CemeteryControlsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  selectedCategory: Category | 'all' | 'candles';
  onCategoryChange: (cat: Category | 'all' | 'candles') => void;
  viewMode: 'plots' | 'list';
  onViewModeChange: (mode: 'plots' | 'list') => void;
  totalFiltered: number;
}

export const CemeteryControls: React.FC<CemeteryControlsProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  totalFiltered
}) => {
  const categories: Array<{ id: Category | 'all' | 'candles'; label: string }> = [
    { id: 'all', label: 'All Grounds' },
    { id: 'reading', label: '📖 Deep Reads' },
    { id: 'tech', label: '💻 Tech & Code' },
    { id: 'rabbit_hole', label: '🐇 3 AM Spiral' },
    { id: 'shopping', label: '🛒 Wishlists' },
    { id: 'video', label: '🎬 Watch Later' },
    { id: 'candles', label: '🕯️ Vigils' }
  ];

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'all';

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-8 space-y-4 z-20 relative min-w-0">
      {/* Search and Sort row */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0e1219] p-3 rounded-2xl border border-[#2c384a] shadow-xl backdrop-blur-sm min-w-0">
        {/* Search input with "Find a forgotten tab..." */}
        <div className="relative w-full flex-1 min-w-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Find a forgotten tab..."
            aria-label="Find a forgotten tab"
            className="w-full pl-10 pr-9 py-2.5 bg-[#090c11] border border-[#2e3a4c] focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl text-sm text-slate-100 placeholder-slate-400 outline-none transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right controls: Sort dropdown & View switch */}
        <div className="flex items-center gap-2 justify-between sm:justify-end w-full sm:w-auto flex-shrink-0">
          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 bg-[#090c11] border border-[#2e3a4c] px-3 py-2 rounded-xl text-xs text-slate-200">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <label htmlFor="cemetery-sort" className="hidden sm:inline text-slate-300 font-medium">Sort:</label>
            <select
              id="cemetery-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-slate-200 font-medium outline-none cursor-pointer text-xs font-sans focus:text-white"
            >
              <option value="newest" className="bg-[#111620] text-slate-200">Newest Burials</option>
              <option value="oldest" className="bg-[#111620] text-slate-200">Oldest Residents</option>
              <option value="alpha" className="bg-[#111620] text-slate-200">Alphabetical (A-Z)</option>
              <option value="most_honored" className="bg-[#111620] text-slate-200">Most Honored</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-[#090c11] border border-[#2e3a4c] p-1 rounded-xl flex-shrink-0">
            <button
              onClick={() => onViewModeChange('plots')}
              className={`p-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                viewMode === 'plots'
                  ? 'bg-[#1e2736] text-amber-300 shadow-sm border border-[#38485e]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Graveyard Plots View"
              aria-label="Switch to Graveyard Plots View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                viewMode === 'list'
                  ? 'bg-[#1e2736] text-amber-300 shadow-sm border border-[#38485e]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Cemetery Archive List View"
              aria-label="Switch to Cemetery Archive List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills: constrained with min-w-0 so it scrolls horizontally without widening the viewport */}
      <div className="w-full max-w-full min-w-0 flex items-center justify-between gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
        <div className="flex items-center gap-2 flex-shrink-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onCategoryChange(c.id)}
              className={`text-xs px-3 py-1.5 rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                selectedCategory === c.id
                  ? 'bg-amber-950/60 text-amber-200 border-amber-500/80 shadow-sm font-semibold'
                  : 'bg-[#111622] text-slate-300 border-[#2e3a4d] hover:border-[#42536d] hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Clear filter indicator */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange('all');
            }}
            className="text-xs text-amber-400 hover:text-amber-300 whitespace-nowrap underline font-medium pl-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded flex-shrink-0"
          >
            Reset Filters ({totalFiltered})
          </button>
        )}
      </div>
    </div>
  );
};

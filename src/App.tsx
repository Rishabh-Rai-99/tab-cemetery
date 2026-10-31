import React, { useState, useEffect, useMemo } from 'react';
import { BuriedTab, SortOption, Category } from './types';
import { getStoredTabs, saveTabs, computeStats, playAtmosphericChime } from './utils/helpers';
import { INITIAL_BURIED_TABS } from './data/defaults';
import { AtmosphericBackground } from './components/AtmosphericBackground';
import { CemeteryHeader } from './components/CemeteryHeader';
import { CemeteryControls } from './components/CemeteryControls';
import { CemeteryGrounds } from './components/CemeteryGrounds';
import { CemeteryListView } from './components/CemeteryListView';
import { EmptyState } from './components/EmptyState';
import { BuryTabModal } from './components/BuryTabModal';
import { GraveDetailsModal } from './components/GraveDetailsModal';
import { CemeteryLedgerModal } from './components/CemeteryLedgerModal';
import { CemeteryFooter } from './components/CemeteryFooter';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [tabs, setTabs] = useState<BuriedTab[]>(() => getStoredTabs());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | 'candles'>('all');
  const [viewMode, setViewMode] = useState<'plots' | 'list'>('plots');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals state
  const [isBuryModalOpen, setIsBuryModalOpen] = useState(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<BuriedTab | null>(null);

  // Sync to localStorage whenever tabs change
  useEffect(() => {
    saveTabs(tabs);
  }, [tabs]);

  // Compute stats
  const stats = useMemo(() => computeStats(tabs), [tabs]);

  // Recent tabs for ledger (top 5 by burialDate descending)
  const recentTabs = useMemo(() => {
    return [...tabs]
      .sort((a, b) => new Date(b.burialDate).getTime() - new Date(a.burialDate).getTime())
      .slice(0, 5);
  }, [tabs]);

  // Filter & Sort tabs
  const filteredAndSortedTabs = useMemo(() => {
    let result = [...tabs];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.url.toLowerCase().includes(q) ||
          (t.note && t.note.toLowerCase().includes(q)) ||
          t.causeOfDeath.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'candles') {
        result = result.filter((t) => t.candleLit);
      } else {
        result = result.filter((t) => t.category === selectedCategory);
      }
    }

    // Sort order
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.burialDate).getTime() - new Date(a.burialDate).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.burialDate).getTime() - new Date(b.burialDate).getTime();
      }
      if (sortBy === 'alpha') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'most_honored') {
        const honorsA = (a.flowersCount || 0) + (a.candleLit ? 2 : 0);
        const honorsB = (b.flowersCount || 0) + (b.candleLit ? 2 : 0);
        return honorsB - honorsA;
      }
      return 0;
    });

    return result;
  }, [tabs, searchQuery, selectedCategory, sortBy]);

  // Handlers
  const handleBuryTab = (newTab: BuriedTab) => {
    setTabs((prev) => [newTab, ...prev]);
  };

  const handleResurrectTab = (tabToResurrect: BuriedTab) => {
    setTabs((prev) => prev.filter((t) => t.id !== tabToResurrect.id));
  };

  const handleDeleteTab = (tabToDelete: BuriedTab) => {
    setTabs((prev) => prev.filter((t) => t.id !== tabToDelete.id));
  };

  const handleToggleCandle = (tabId: string) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === tabId ? { ...t, candleLit: !t.candleLit } : t))
    );
    if (selectedTab && selectedTab.id === tabId) {
      setSelectedTab((prev) => (prev ? { ...prev, candleLit: !prev.candleLit } : null));
    }
  };

  const handleAddFlower = (tabId: string) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === tabId ? { ...t, flowersCount: (t.flowersCount || 0) + 1 } : t))
    );
    if (selectedTab && selectedTab.id === tabId) {
      setSelectedTab((prev) =>
        prev ? { ...prev, flowersCount: (prev.flowersCount || 0) + 1 } : null
      );
    }
  };

  // Quick resurrect directly from stone or list with confirmation check
  const handleQuickResurrect = (tab: BuriedTab, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Resurrect "${tab.title}"?\n\nThis will open the tab in your browser and release it from the cemetery grounds.`)) {
      if (soundEnabled) playAtmosphericChime('resurrect');
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#a7f3d0', '#6ee7b7', '#fef08a'],
          disableForReducedMotion: true
        });
      } catch {
        // ignore
      }
      window.open(tab.url, '_blank', 'noopener,noreferrer');
      handleResurrectTab(tab);
    }
  };

  const handleLoadSampleTabs = () => {
    setTabs(INITIAL_BURIED_TABS);
    if (soundEnabled) playAtmosphericChime('bury');
  };

  const handleClearAllTabs = () => {
    setTabs([]);
  };

  const handleImportTabs = (imported: BuriedTab[]) => {
    setTabs(imported);
    if (soundEnabled) playAtmosphericChime('candle');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="relative min-h-screen bg-[#080a0e] text-[#cbd5e1] font-sans overflow-x-hidden w-full max-w-full flex flex-col justify-between selection:bg-amber-950 selection:text-amber-200">
      {/* Dark mist & moon atmospheric background */}
      <AtmosphericBackground />

      {/* Main Content Area */}
      <div className="flex-1 pb-16 w-full max-w-full min-w-0">
        {/* Cemetery Header */}
        <CemeteryHeader
          stats={stats}
          onOpenBuryModal={() => setIsBuryModalOpen(true)}
          onOpenLedgerModal={() => setIsLedgerModalOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
        />

        {/* Cemetery Controls (Search, Sort, Filters, View Modes) */}
        {tabs.length > 0 && (
          <CemeteryControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalFiltered={filteredAndSortedTabs.length}
          />
        )}

        {/* Main Cemetery Display: Plots Grid, Archive List, or Empty State */}
        {tabs.length === 0 ? (
          <EmptyState
            isFiltered={false}
            onClearFilters={handleClearFilters}
            onOpenBuryModal={() => setIsBuryModalOpen(true)}
            onLoadSampleTabs={handleLoadSampleTabs}
          />
        ) : filteredAndSortedTabs.length === 0 ? (
          <EmptyState
            isFiltered={true}
            onClearFilters={handleClearFilters}
            onOpenBuryModal={() => setIsBuryModalOpen(true)}
            onLoadSampleTabs={handleLoadSampleTabs}
          />
        ) : viewMode === 'plots' ? (
          <CemeteryGrounds
            tabs={filteredAndSortedTabs}
            onSelectTab={(tab) => setSelectedTab(tab)}
            onQuickResurrect={handleQuickResurrect}
          />
        ) : (
          <CemeteryListView
            tabs={filteredAndSortedTabs}
            onSelect={(tab) => setSelectedTab(tab)}
            onQuickResurrect={handleQuickResurrect}
          />
        )}
      </div>

      {/* Cemetery Footer */}
      <CemeteryFooter
        tabs={tabs}
        onImportTabs={handleImportTabs}
        onResetSampleTabs={handleLoadSampleTabs}
        onClearAllTabs={handleClearAllTabs}
      />

      {/* Bury Tab Modal ("Bury a tab") */}
      <BuryTabModal
        isOpen={isBuryModalOpen}
        onClose={() => setIsBuryModalOpen(false)}
        onBury={handleBuryTab}
      />

      {/* Grave Details & Vigil Modal ("Inspect Grave") */}
      <GraveDetailsModal
        tab={selectedTab}
        onClose={() => setSelectedTab(null)}
        onResurrect={handleResurrectTab}
        onDelete={handleDeleteTab}
        onToggleCandle={handleToggleCandle}
        onAddFlower={handleAddFlower}
      />

      {/* Cemetery Ledger / Statistics Modal ("Tabs laid to rest") */}
      <CemeteryLedgerModal
        isOpen={isLedgerModalOpen}
        onClose={() => setIsLedgerModalOpen(false)}
        stats={stats}
        recentTabs={recentTabs}
        onSelectTab={(tab) => setSelectedTab(tab)}
      />
    </div>
  );
};

export default App;

import React from 'react';
import { BuriedTab } from '../types';
import { Gravestone } from './Gravestone';

interface CemeteryGroundsProps {
  tabs: BuriedTab[];
  onSelectTab: (tab: BuriedTab) => void;
  onQuickResurrect: (tab: BuriedTab, e: React.MouseEvent) => void;
}

export const CemeteryGrounds: React.FC<CemeteryGroundsProps> = ({
  tabs,
  onSelectTab,
  onQuickResurrect
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 z-20 relative">
      {/* Wrought Iron Fence top line decoration - safely clipped, never overflows */}
      <div 
        aria-hidden="true" 
        className="w-full max-w-4xl mx-auto mb-8 sm:mb-10 px-2 overflow-hidden select-none pointer-events-none opacity-40 text-slate-400"
      >
        <div className="flex items-center justify-center gap-1 overflow-hidden w-full whitespace-nowrap">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="text-xs sm:text-sm font-mono leading-none tracking-wider flex-shrink-0">
              ┼───┼
            </span>
          ))}
        </div>
      </div>

      {/* Gravestones Grid: 1 col on mobile, 2 on tablet, 3 on desktop, 4 on wide screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-14 justify-items-center w-full">
        {tabs.map((tab) => (
          <Gravestone
            key={tab.id}
            tab={tab}
            onSelect={onSelectTab}
            onQuickResurrect={onQuickResurrect}
          />
        ))}
      </div>
    </div>
  );
};

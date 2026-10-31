import React, { useRef } from 'react';
import { BuriedTab } from '../types';
import { Download, Upload, RefreshCw, Trash2, Heart } from 'lucide-react';

interface CemeteryFooterProps {
  tabs: BuriedTab[];
  onImportTabs: (tabs: BuriedTab[]) => void;
  onResetSampleTabs: () => void;
  onClearAllTabs: () => void;
}

export const CemeteryFooter: React.FC<CemeteryFooterProps> = ({
  tabs,
  onImportTabs,
  onResetSampleTabs,
  onClearAllTabs
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tabs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tab-cemetery-graves-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            onImportTabs(parsed);
          } else {
            alert('Invalid graveyard records file format.');
          }
        } catch {
          alert('Could not parse JSON records.');
        }
      };
    }
  };

  return (
    <footer className="mt-20 pb-12 border-t border-[#232d3d] bg-[#07090e] text-slate-300 text-xs z-20 relative backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Epitaph / branding */}
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-200 font-gothic tracking-wider">
              <span>⚰️</span>
              <span className="font-bold text-sm">Tab Cemetery</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-slate-300 text-xs">Since browser tabs were invented</span>
            </div>
            <p className="text-xs text-slate-300 font-reading italic">
              &ldquo;May your unread tabs rest in peace until the resurrection.&rdquo;
            </p>
          </div>

          {/* Backup & Management Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              disabled={tabs.length === 0}
              className="px-3.5 py-2 rounded-xl bg-[#131924] hover:bg-[#1e2736] border border-[#334255] text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              title="Export saved tabs as JSON backup"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export Ledger</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-[#131924] hover:bg-[#1e2736] border border-[#334255] text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              title="Import backup JSON"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              <span>Import</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />

            <button
              type="button"
              onClick={onResetSampleTabs}
              className="px-3.5 py-2 rounded-xl bg-[#131924] hover:bg-[#1e2736] border border-[#334255] text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              title="Restore initial humorous sample graves"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Sample Graves</span>
            </button>

            {tabs.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Exhume all graves and clear the entire cemetery? This cannot be undone.')) {
                    onClearAllTabs();
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-950/70 border border-rose-800/60 hover:border-rose-600/80 text-rose-300 hover:text-rose-100 transition-colors flex items-center gap-1.5 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-400"
                title="Wipe all graves"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Small copyright note */}
        <div className="mt-8 pt-4 border-t border-[#1a222e] text-center text-xs text-slate-300 flex items-center justify-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for chronic tab hoarders worldwide</span>
        </div>
      </div>
    </footer>
  );
};

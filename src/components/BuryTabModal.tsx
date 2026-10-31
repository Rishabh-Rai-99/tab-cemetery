import React, { useState } from 'react';
import { BuriedTab, GraveStyle, Category } from '../types';
import { cleanAndValidateUrl, getDomain, playAtmosphericChime } from '../utils/helpers';
import { CAUSES_OF_DEATH } from '../data/defaults';
import { X, Sparkles, AlertCircle } from 'lucide-react';

interface BuryTabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBury: (tab: BuriedTab) => void;
}

export const BuryTabModal: React.FC<BuryTabModalProps> = ({
  isOpen,
  onClose,
  onBury
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [causeOfDeath, setCauseOfDeath] = useState(CAUSES_OF_DEATH[0]);
  const [customCause, setCustomCause] = useState('');
  const [isCustomCause, setIsCustomCause] = useState(false);
  const [graveStyle, setGraveStyle] = useState<GraveStyle>('classic');
  const [category, setCategory] = useState<Category>('reading');
  const [urlError, setUrlError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Auto-fill title from domain if title is empty when user blurs URL input
  const handleUrlBlur = () => {
    if (url.trim() && !title.trim()) {
      const { valid, formattedUrl } = cleanAndValidateUrl(url);
      if (valid) {
        const domain = getDomain(formattedUrl);
        setTitle(`Page on ${domain}`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { valid, formattedUrl, error } = cleanAndValidateUrl(url);
    if (!valid) {
      setUrlError(error || 'Please enter a valid URL');
      return;
    }
    setUrlError(null);

    const finalTitle = title.trim() || `Forgotten tab from ${getDomain(formattedUrl)}`;
    const finalCause = isCustomCause && customCause.trim() ? customCause.trim() : causeOfDeath;

    const newTab: BuriedTab = {
      id: 'tab-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      title: finalTitle,
      url: formattedUrl,
      note: note.trim() || undefined,
      causeOfDeath: finalCause,
      burialDate: new Date().toISOString(),
      graveStyle,
      flowersCount: 0,
      candleLit: false,
      category
    };

    playAtmosphericChime('bury');
    onBury(newTab);
    onClose();

    // Reset form
    setTitle('');
    setUrl('');
    setNote('');
    setCustomCause('');
    setIsCustomCause(false);
    setGraveStyle('classic');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#111620] border border-[#344256] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle gothic banner header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-[#161f2c] via-[#1d2737] to-[#161f2c] border-b border-[#2d3a4d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0d1117] border border-[#3d4d63] flex items-center justify-center text-amber-200 shadow-inner">
              <span className="text-base select-none">🪦</span>
            </div>
            <div>
              <h2 className="font-gothic text-lg font-bold text-slate-100 tracking-wide">
                Bury a Tab
              </h2>
              <p className="text-xs text-slate-300 font-sans">
                Commit an unread tab to sacred rest
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-[#253245] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Website Title */}
          <div>
            <label htmlFor="tab-title-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5 font-sans">
              Website Title <span className="text-amber-400">*</span>
            </label>
            <input
              id="tab-title-input"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. A Gentle Guide to Asynchronous Rust"
              className="w-full px-3.5 py-2.5 bg-[#090c12] border border-[#324054] focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl text-sm text-slate-100 placeholder-slate-400 outline-none transition-all font-sans"
            />
          </div>

          {/* URL Input with validation */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="tab-url-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-200 font-sans">
                Website URL <span className="text-amber-400">*</span>
              </label>
              {url && (
                <span className="text-xs text-slate-300 font-mono font-medium truncate max-w-[200px]">
                  {getDomain(url)}
                </span>
              )}
            </div>
            <input
              id="tab-url-input"
              type="text"
              required
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (urlError) setUrlError(null);
              }}
              onBlur={handleUrlBlur}
              placeholder="https://example.com/article-you-wont-read"
              className={`w-full px-3.5 py-2.5 bg-[#090c12] border ${
                urlError ? 'border-rose-500 focus:border-rose-400' : 'border-[#324054] focus:border-amber-400'
              } focus:ring-1 focus:ring-amber-400/50 rounded-xl text-sm text-slate-100 placeholder-slate-400 outline-none transition-all font-mono`}
            />
            {urlError && (
              <p className="mt-1.5 text-xs text-rose-300 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span>{urlError}</span>
              </p>
            )}
          </div>

          {/* Cause of Tab Death */}
          <div>
            <label htmlFor="tab-cause-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5 font-sans">
              Cause of Demise (Epitaph)
            </label>
            {!isCustomCause ? (
              <div className="space-y-2">
                <select
                  id="tab-cause-select"
                  value={causeOfDeath}
                  onChange={(e) => {
                    if (e.target.value === '__custom__') {
                      setIsCustomCause(true);
                    } else {
                      setCauseOfDeath(e.target.value);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#090c12] border border-[#324054] focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl text-sm text-slate-100 outline-none font-epitaph italic"
                >
                  {CAUSES_OF_DEATH.map((cause) => (
                    <option key={cause} value={cause} className="bg-[#111620] text-slate-100 font-sans not-italic py-1">
                      &ldquo;{cause}&rdquo;
                    </option>
                  ))}
                  <option value="__custom__" className="bg-[#111620] text-amber-300 font-sans font-semibold not-italic">
                    ✍️ Write custom cause of demise...
                  </option>
                </select>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customCause}
                    onChange={(e) => setCustomCause(e.target.value)}
                    placeholder="e.g. Swore I'd learn Blender over a long weekend"
                    className="flex-1 px-3.5 py-2.5 bg-[#090c12] border border-[#324054] focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl text-sm text-slate-100 placeholder-slate-400 outline-none font-sans"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomCause(false)}
                    className="px-3.5 py-1 bg-[#17202c] hover:bg-[#222e3f] text-xs font-medium text-slate-200 rounded-xl border border-[#344357] transition-colors"
                  >
                    Presets
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Gravestone Style Picker: 2 cols on mobile, 5 on tablet/desktop */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5 font-sans">
              Headstone Architecture
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(
                [
                  { id: 'classic', label: 'Classic', shape: 'rounded-t-2xl' },
                  { id: 'gothic', label: 'Gothic', shape: 'rounded-t-3xl border-t-2' },
                  { id: 'obelisk', label: 'Obelisk', shape: 'rounded-t-sm' },
                  { id: 'cross', label: 'Cross', shape: 'rounded-t-xl' },
                  { id: 'weathered', label: 'Weathered', shape: 'rounded-tl-xl rounded-tr-sm border-dashed' }
                ] as const
              ).map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setGraveStyle(st.id)}
                  className={`p-2.5 flex flex-col items-center justify-center rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                    graveStyle === st.id
                      ? 'border-amber-500 bg-amber-950/40 shadow-md text-amber-200 font-semibold'
                      : 'border-[#334255] bg-[#0f141d] hover:border-[#475b75] text-slate-300 hover:text-white'
                  }`}
                >
                  <div
                    className={`w-7 h-9 bg-slate-700 border border-slate-500 mb-1.5 flex items-center justify-center ${st.shape}`}
                  >
                    <span className="text-[9px] text-slate-200 font-mono">†</span>
                  </div>
                  <span className="text-xs font-sans capitalize">
                    {st.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional Epitaph Note */}
          <div>
            <label htmlFor="tab-note-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5 font-sans">
              Epitaph / Personal Note <span className="text-slate-400 text-xs normal-case font-normal">(optional)</span>
            </label>
            <textarea
              id="tab-note-input"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Why did you open this tab? What were your broken promises to yourself?"
              className="w-full px-3.5 py-2 bg-[#090c12] border border-[#324054] focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl text-sm text-slate-100 placeholder-slate-400 outline-none resize-none font-reading leading-relaxed"
            />
          </div>

          {/* Category */}
          <div className="pt-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5 font-sans">
              Plot Section (Category)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: 'reading', label: '📖 Deep Reading' },
                  { id: 'tech', label: '💻 Tech & Code' },
                  { id: 'rabbit_hole', label: '🐇 3 AM Spiral' },
                  { id: 'shopping', label: '🛒 Wishlist Limbo' },
                  { id: 'video', label: '🎬 Watch Later' },
                  { id: 'other', label: '🪶 Miscellaneous' }
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                    category === cat.id
                      ? 'bg-amber-950/70 text-amber-200 border-amber-500 font-semibold shadow-sm'
                      : 'bg-[#0f141d] text-slate-300 border-[#334255] hover:border-[#475b75] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#293548] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#151d29] hover:bg-[#1e2838] border border-[#2e3a4d] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-gothic font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 rounded-xl shadow-lg hover:shadow-amber-950/50 transition-all flex items-center gap-2 transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Bury This Tab</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

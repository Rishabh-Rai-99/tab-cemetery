import { BuriedTab, CemeteryStats } from '../types';
import { INITIAL_BURIED_TABS } from '../data/defaults';

const STORAGE_KEY = 'tab_cemetery_tabs_v1';

export function getStoredTabs(): BuriedTab[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First visit: initialize with humorous sample tabs
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BURIED_TABS));
      return INITIAL_BURIED_TABS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_BURIED_TABS;
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return INITIAL_BURIED_TABS;
  }
}

export function saveTabs(tabs: BuriedTab[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export function cleanAndValidateUrl(inputUrl: string): { valid: boolean; formattedUrl: string; error?: string } {
  let trimmed = inputUrl.trim();
  if (!trimmed) {
    return { valid: false, formattedUrl: '', error: 'URL is required' };
  }

  // Prepend https:// if protocol is missing
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = 'https://' + trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    // Check for minimum valid hostname with at least one dot or localhost
    if (!parsed.hostname || (!parsed.hostname.includes('.') && parsed.hostname !== 'localhost')) {
      return { valid: false, formattedUrl: trimmed, error: 'Please enter a valid web domain (e.g., example.com)' };
    }
    return { valid: true, formattedUrl: parsed.toString() };
  } catch {
    return { valid: false, formattedUrl: trimmed, error: 'Malformed URL format' };
  }
}

export function getDomain(urlStr: string): string {
  try {
    const u = new URL(urlStr);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return urlStr;
  }
}

export function getFaviconUrl(urlStr: string): string {
  try {
    const domain = getDomain(urlStr);
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return '';
  }
}

export function formatBurialDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Unknown Era';
  }
}

export function formatBurialDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  } catch {
    return 'Unknown Era';
  }
}

export function getDaysEntombed(isoString: string): number {
  try {
    const burial = new Date(isoString).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - burial);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}

export function formatTimeAgo(isoString: string): string {
  const days = getDaysEntombed(isoString);
  if (days === 0) {
    const burial = new Date(isoString).getTime();
    const hours = Math.floor((Date.now() - burial) / (1000 * 60 * 60));
    if (hours <= 0) return 'Died moments ago';
    if (hours === 1) return 'Died 1 hour ago';
    return `Died ${hours} hours ago`;
  }
  if (days === 1) return 'Died yesterday';
  if (days < 30) return `Resting for ${days} days`;
  const months = Math.floor(days / 30);
  if (months === 1) return 'Resting for 1 month';
  if (months < 12) return `Resting for ${months} months`;
  const years = (days / 365).toFixed(1);
  return `Entombed for ${years} years`;
}

export function computeStats(tabs: BuriedTab[]): CemeteryStats {
  if (tabs.length === 0) {
    return {
      totalBuried: 0,
      oldestResident: null,
      newestResident: null,
      totalDaysEntombed: 0,
      mostCommonCause: 'None yet',
      totalCandlesLit: 0,
      totalFlowers: 0
    };
  }

  // Sort by date ascending (oldest first)
  const sorted = [...tabs].sort((a, b) => new Date(a.burialDate).getTime() - new Date(b.burialDate).getTime());
  const oldestResident = sorted[0];
  const newestResident = sorted[sorted.length - 1];

  let totalDays = 0;
  let totalCandles = 0;
  let totalFlowers = 0;
  const causeCount: Record<string, number> = {};

  for (const tab of tabs) {
    totalDays += getDaysEntombed(tab.burialDate);
    if (tab.candleLit) totalCandles++;
    totalFlowers += tab.flowersCount || 0;

    const cause = tab.causeOfDeath || 'Mysterious tab demise';
    causeCount[cause] = (causeCount[cause] || 0) + 1;
  }

  let mostCommonCause = 'I swear I was gonna read this over the weekend';
  let maxCount = 0;
  for (const [cause, count] of Object.entries(causeCount)) {
    if (count > maxCount) {
      maxCount = count;
      mostCommonCause = cause;
    }
  }

  return {
    totalBuried: tabs.length,
    oldestResident,
    newestResident,
    totalDaysEntombed: totalDays,
    mostCommonCause,
    totalCandlesLit: totalCandles,
    totalFlowers
  };
}

// Optional synthetic atmospheric audio using Web Audio API (no external sound files required)
export function playAtmosphericChime(type: 'bury' | 'resurrect' | 'delete' | 'candle'): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'bury') {
      // Deep church bell toll
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 1.8);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    } else if (type === 'resurrect') {
      // Rising ethereal spirit chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } else if (type === 'candle') {
      // Soft mystical ping
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch {
    // Audio autoplay or permissions not available, fail silently
  }
}

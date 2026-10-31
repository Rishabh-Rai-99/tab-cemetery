export type GraveStyle = 'classic' | 'gothic' | 'obelisk' | 'cross' | 'weathered';

export type Category = 
  | 'reading'
  | 'tech'
  | 'rabbit_hole'
  | 'shopping'
  | 'video'
  | 'other';

export interface BuriedTab {
  id: string;
  title: string;
  url: string;
  note?: string;
  causeOfDeath: string;
  burialDate: string; // ISO 8601 string
  graveStyle: GraveStyle;
  flowersCount: number;
  candleLit: boolean;
  category: Category;
}

export type SortOption = 'newest' | 'oldest' | 'alpha' | 'most_honored';

export interface CemeteryStats {
  totalBuried: number;
  oldestResident: BuriedTab | null;
  newestResident: BuriedTab | null;
  totalDaysEntombed: number;
  mostCommonCause: string;
  totalCandlesLit: number;
  totalFlowers: number;
}

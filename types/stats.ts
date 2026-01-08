export type CatchSummary = {
  weight_kg: number;
  length_cm: number;
};

export type SpeciesBreakdownItem = {
  species: string;
  count: number;
};

export type LurePerformance = {
  name: string;
  catches: number;
  avgWeight: number;
  success: number;
};

export type LocationStat = {
  name: string;
  catches: number;
};

export type ProgressPoint = {
  month: string;
  progress: number;
};

export type UserStatistics = {
  totalCatches: number;
  fishingDays: number;
  biggestCatch: CatchSummary;
  longestCatch: CatchSummary;
  speciesBreakdown: SpeciesBreakdownItem[];
  topLures: LurePerformance[];
  topLocations: LocationStat[];
  progress: ProgressPoint[];
};

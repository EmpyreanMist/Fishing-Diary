import { supabase } from "../supabase";
import type { UserStatistics } from "../../types/stats";

type SpeciesLookup = {
  id: number;
  english_name: string;
};

type LureLookup = {
  id: number;
  name: string;
};

type StatsCatchRow = {
  id: number;
  weight_kg: number | null;
  length_cm: number | null;
  caught_at: string | null;
  location_name: string | null;
  fish_species: SpeciesLookup | SpeciesLookup[] | null;
  lure: LureLookup | LureLookup[] | null;
};

const getSingle = <T,>(value: T | T[] | null): T | null => {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
};

export async function getUserStatistics(userId: string): Promise<UserStatistics> {
  const { data: catches, error } = await supabase
    .from("catches")
    .select(
      `
      id,
      weight_kg,
      length_cm,
      caught_at,
      location_name,
      fish_species:fish_species_id (id, english_name),
      lure:lure_id (id, name)
  `
    )
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  const safeCatches: StatsCatchRow[] = catches ?? [];

  const totalCatches = safeCatches.length;

  const fishingDays = new Set(
    safeCatches
      .map((c) => (c.caught_at ? new Date(c.caught_at).toDateString() : null))
      .filter((value): value is string => Boolean(value))
  ).size;

  const biggestCatch = safeCatches.reduce(
    (max, c) => {
      const weight = c.weight_kg ?? 0;
      if (weight > max.weight_kg) {
        return { weight_kg: weight, length_cm: c.length_cm ?? 0 };
      }
      return max;
    },
    { weight_kg: 0, length_cm: 0 }
  );

  const longestCatch = safeCatches.reduce(
    (max, c) => {
      const length = c.length_cm ?? 0;
      if (length > max.length_cm) {
        return { length_cm: length, weight_kg: c.weight_kg ?? 0 };
      }
      return max;
    },
    { length_cm: 0, weight_kg: 0 }
  );

  const speciesMap: Record<string, number> = {};
  safeCatches.forEach((c) => {
    const fishSpecies = getSingle(c.fish_species);
    const name = fishSpecies?.english_name ?? "Unknown";
    speciesMap[name] = (speciesMap[name] || 0) + 1;
  });
  const speciesBreakdown = Object.entries(speciesMap).map(
    ([species, count]) => ({ species, count })
  );

  const lureMap: Record<string, { count: number; totalWeight: number }> = {};
  safeCatches.forEach((c) => {
    const lure = getSingle(c.lure);
    const name = lure?.name ?? "Unknown";
    if (!lureMap[name]) lureMap[name] = { count: 0, totalWeight: 0 };
    lureMap[name].count++;
    lureMap[name].totalWeight += c.weight_kg ?? 0;
  });

  const topLures = Object.entries(lureMap)
    .map(([name, data]) => ({
      name,
      catches: data.count,
      avgWeight: +(data.totalWeight / data.count).toFixed(1),
      success: Math.min(100, data.count * 10),
    }))
    .sort((a, b) => b.catches - a.catches);

  const lakeMap: Record<string, number> = {};
  safeCatches.forEach((c) => {
    const name = c.location_name ?? "Unknown";
    lakeMap[name] = (lakeMap[name] || 0) + 1;
  });

  const topLocations = Object.entries(lakeMap)
    .map(([name, catches]) => ({ name, catches }))
    .sort((a, b) => b.catches - a.catches)
    .slice(0, 5);

  const now = new Date();
  const progress: UserStatistics["progress"] = [];
  for (let i = 5; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = month.toLocaleString("en-US", { month: "short" });

    const count = safeCatches.filter((c) => {
      if (!c.caught_at) return false;
      const d = new Date(c.caught_at);
      return (
        d.getMonth() === month.getMonth() &&
        d.getFullYear() === month.getFullYear()
      );
    }).length;

    progress.push({ month: monthName, progress: count });
  }

  return {
    totalCatches,
    fishingDays,
    biggestCatch,
    longestCatch,
    speciesBreakdown,
    topLures,
    topLocations,
    progress,
  };
}

import { supabase } from "../supabase";


export async function getUserStatistics(userId: string) {

  const { data: catches, error } = await supabase
  .from("catches")
  .select(`
      id,
      weight_kg,
      length_cm,
      created_at,
      location_name,
      fish_species:fish_species_id (id, swedish_name),
      lure:lure_id (id, name)
  `)
  .eq("user_id", userId);

  if (error) throw new Error(error.message);


  const totalCatches = catches.length;


  const fishingDays = new Set(
    catches.map((c) => new Date(c.created_at).toDateString())
  ).size;

  const averagePerTrip = fishingDays > 0 ? (totalCatches / fishingDays) : 0;

  const biggestCatch = catches.reduce(
    (max, c) => (c.weight_kg > max.weight_kg ? c : max),
    { weight_kg: 0 }
  );

  const speciesMap: Record<string, number> = {};
  catches.forEach((c) => {
    const fishSpecies = c.fish_species as any;
    const name = Array.isArray(fishSpecies) ? fishSpecies[0]?.swedish_name ?? "Unknown" : fishSpecies?.swedish_name ?? "Unknown";
    speciesMap[name] = (speciesMap[name] || 0) + 1;
  });
  const speciesBreakdown = Object.entries(speciesMap).map(
    ([species, count]) => ({ species, count })
  );


  const lureMap: Record<string, { count: number; totalWeight: number }> = {};
  catches.forEach((c) => {
    const lure = c.lure as any;
    const name = Array.isArray(lure) ? lure[0]?.name ?? "Unknown" : lure?.name ?? "Unknown";
    if (!lureMap[name]) lureMap[name] = { count: 0, totalWeight: 0 };
    lureMap[name].count++;
    lureMap[name].totalWeight += c.weight_kg;
  });

  const topLures = Object.entries(lureMap).map(([name, data]) => ({
    name,
    catches: data.count,
    avgWeight: +(data.totalWeight / data.count).toFixed(1),
    success: Math.min(100, data.count * 10),
  }));


const lakeMap: Record<string, number> = {};
catches.forEach((c) => {
  const name = c.location_name ?? "Unknown";
  lakeMap[name] = (lakeMap[name] || 0) + 1;
});

const topLocations = Object.entries(lakeMap)
  .map(([name, catches]) => ({ name, catches }))
  .sort((a, b) => b.catches - a.catches)
  .slice(0, 5);


  const now = new Date();
  const progress = [];
  for (let i = 5; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = month.toLocaleString("en-US", { month: "short" });

    const count = catches.filter((c) => {
      const d = new Date(c.created_at);
      return d.getMonth() === month.getMonth() && d.getFullYear() === month.getFullYear();
    }).length;

    progress.push({ month: monthName, progress: count });
  }

  return {
    totalCatches,
    fishingDays,
    averagePerTrip,
    biggestCatch,
    speciesBreakdown,
    topLures,
    topLocations,
    progress,
  };
}

import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";

type StatItem = {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  sub: string;
};

export default function StatsGrid() {
  const [totalCatches, setTotalCatches] = useState<number>(0);
  const [favoriteSpecies, setFavoriteSpecies] = useState<string>("—");
  const [bestMonth, setBestMonth] = useState<string>("—");

  useEffect(() => {
    fetchTotalCatches();
    fetchFavoriteSpecies();
    fetchBestMonth().then(setBestMonth);
  }, []);

  async function fetchBestMonth() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return "—";

    const { data, error } = await supabase
      .from("catches")
      .select("caught_at")
      .eq("user_id", user.id);

    if (error || !data) {
      console.error("Error fetching months:", error);
      return "—";
    }

    if (data.length === 0) return "—";

    // Count by month number (0–11)
    const monthCounts: Record<number, number> = {};

    for (const row of data) {
      if (!row.caught_at) continue;

      const month = new Date(row.caught_at).getMonth();
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    }

    // Find best month
    const bestMonthIndex = Object.entries(monthCounts).sort(
      (a, b) => Number(b[1]) - Number(a[1])
    )[0][0];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[Number(bestMonthIndex)];
  }

  async function fetchFavoriteSpecies() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // 1. Fetch species IDs + caught_at
    const { data, error } = await supabase
      .from("catches")
      .select("fish_species_id, caught_at")
      .eq("user_id", user.id)
      .order("caught_at", { ascending: false });

    if (error || !data) {
      console.error("Error fetching species:", error);
      return;
    }

    // 2. Count occurrences AND track latest caught_at
    const stats: Record<number, { count: number; latest: string | null }> = {};

    for (const row of data) {
      const id = row.fish_species_id;
      if (!id) continue;

      if (!stats[id]) {
        stats[id] = {
          count: 0,
          latest: row.caught_at ?? null,
        };
      }

      stats[id].count++;

      // If this fish has a caught_at AND the stored latest is null, update
      if (
        row.caught_at &&
        (!stats[id].latest || row.caught_at > stats[id].latest)
      ) {
        stats[id].latest = row.caught_at;
      }
    }

    // If user has no catches
    if (Object.keys(stats).length === 0) {
      setFavoriteSpecies("—");
      return;
    }

    // 3. Sort by:
    //    1. highest count
    //    2. latest date (null counts as oldest)
    const favoriteSpeciesId = Object.entries(stats)
      .sort((a, b) => {
        const [, statA] = a;
        const [, statB] = b;

        // Sort by count first
        if (statB.count !== statA.count) {
          return statB.count - statA.count;
        }

        // Tiebreak: sort by latest date
        const dateA = statA.latest ?? ""; // null-safe
        const dateB = statB.latest ?? "";

        // Newer date wins. Empty string = oldest.
        return dateB.localeCompare(dateA);
      })
      .map(([id]) => Number(id))[0];

    // 4. Fetch the name of the species
    const { data: species } = await supabase
      .from("fish_species")
      .select("english_name")
      .eq("id", favoriteSpeciesId)
      .single();

    setFavoriteSpecies(species?.english_name ?? "—");
  }

  async function fetchTotalCatches() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const { count, error } = await supabase
      .from("catches")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (error) {
      console.error("Error counting catches:", error);
      return;
    }

    setTotalCatches(count ?? 0);
  }

  const stats: StatItem[] = [
    {
      icon: "fish-outline",
      value: totalCatches.toString(),
      label: "Total Catches",
      sub: "This season",
    },
    {
      icon: "calendar-outline",
      value: "8",
      label: "Recent Trips",
      sub: "Last 30 days",
    },
    {
      icon: "trending-up-outline",
      value: favoriteSpecies.toString(),
      label: "Favorite Species",
      sub: "Most caught",
    },
    {
      icon: "bar-chart-outline",
      value: "June",
      label: bestMonth,
      sub: "Peak season",
    },
  ];

  return (
    <View style={styles.grid}>
      {stats.map((item, index) => (
        <LinearGradient
          key={index}
          colors={["#1A2732", "#0E141B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Ionicons name={item.icon} size={32} color="#5ACCF2" />
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.sub}>{item.sub}</Text>
        </LinearGradient>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  card: {
    width: "45%",
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F5F5F5",
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    color: "#F5F5F5",
    marginTop: 4,
  },
  sub: {
    fontSize: 13,
    color: "#98A6B3",
    marginTop: 2,
  },
});

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

type StatsGridProps = {
  refreshSignal: number;
};

const UNKNOWN_LABEL = "Unknown";

export default function StatsGrid({ refreshSignal }: StatsGridProps) {
  const [totalCatches, setTotalCatches] = useState<number>(0);
  const [favoriteSpecies, setFavoriteSpecies] = useState<string>(UNKNOWN_LABEL);
  const [bestMonth, setBestMonth] = useState<string>(UNKNOWN_LABEL);

  useEffect(() => {
    fetchTotalCatches();
    fetchFavoriteSpecies();
    fetchBestMonth().then(setBestMonth);
  }, [refreshSignal]);

  async function fetchBestMonth(): Promise<string> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return UNKNOWN_LABEL;

    const { data, error } = await supabase
      .from("catches")
      .select("caught_at")
      .eq("user_id", user.id);

    if (error || !data) {
      return UNKNOWN_LABEL;
    }

    if (data.length === 0) return UNKNOWN_LABEL;

    const monthCounts: Record<number, number> = {};

    for (const row of data) {
      if (!row.caught_at) continue;

      const month = new Date(row.caught_at).getMonth();
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    }

    if (Object.keys(monthCounts).length === 0) {
      return UNKNOWN_LABEL;
    }

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

  async function fetchFavoriteSpecies(): Promise<void> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("catches")
      .select("fish_species_id, caught_at")
      .eq("user_id", user.id)
      .order("caught_at", { ascending: false });

    if (error || !data) {
      return;
    }

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

      if (
        row.caught_at &&
        (!stats[id].latest || row.caught_at > stats[id].latest)
      ) {
        stats[id].latest = row.caught_at;
      }
    }

    if (Object.keys(stats).length === 0) {
      setFavoriteSpecies(UNKNOWN_LABEL);
      return;
    }

    const favoriteSpeciesId = Object.entries(stats)
      .sort((a, b) => {
        const [, statA] = a;
        const [, statB] = b;

        if (statB.count !== statA.count) {
          return statB.count - statA.count;
        }

        const dateA = statA.latest ?? "";
        const dateB = statB.latest ?? "";

        return dateB.localeCompare(dateA);
      })
      .map(([id]) => Number(id))[0];

    const { data: species } = await supabase
      .from("fish_species")
      .select("english_name")
      .eq("id", favoriteSpeciesId)
      .single();

    setFavoriteSpecies(species?.english_name ?? UNKNOWN_LABEL);
  }

  async function fetchTotalCatches(): Promise<void> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { count, error } = await supabase
      .from("catches")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (error) {
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

import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "../../lib/supabase";
import { getUserStatistics } from "../../lib/stats/statService";

import { StatsHeader } from "@/components/stats/StatsHeader";
import { StatsGrid } from "@/components/stats/StatsGrid";
import { StatsProgress } from "@/components/stats/StatsProgress";
import { StatsSpeciesBreakdown } from "@/components/stats/StatsSpeciesBreakdown";
import { StatsLures } from "@/components/stats/StatsLures";
import { StatsTopLocations } from "@/components/stats/StatsTopLocations";
import { StatsAchievements } from "@/components/stats/StatsAchievements";

export default function StatsScreen() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setErrorMsg(null);

        // Hämta användare
        const { data: auth } = await supabase.auth.getUser();
        const user = auth.user;

        if (!user) {
          setErrorMsg("You must be logged in to see your statistics.");
          return;
        }

        // Hämta statistik
        const result = await getUserStatistics(user.id);
        setStats(result);

      } catch (err: any) {
        console.error("Stats load error:", err);
        setErrorMsg(err.message ?? "Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // --- LOADING STATE ---
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#5ACCF2" />
          <Text style={styles.loadingText}>Loading statistics…</Text>
        </View>
      </SafeAreaView>
    );
  }

  // --- ERROR ---
  if (errorMsg) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.center}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // --- EMPTY ---
  if (!stats) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.center}>
          <Text style={styles.errorText}>No statistics available.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const biggest = stats.biggestCatch?.weight_kg ?? 0;

  // --- NORMAL RENDER ---
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <StatsHeader />

          <StatsGrid
            total={stats.totalCatches}
            days={stats.fishingDays}
            avg={stats.averagePerTrip.toFixed(1)}
            biggest={biggest.toFixed(1)}
          />

          <StatsProgress data={stats.progress} />

          <StatsSpeciesBreakdown data={stats.speciesBreakdown} />

          <StatsLures lures={stats.topLures} />

          <StatsTopLocations data={stats.topLocations} />

          <StatsAchievements />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  center: {
    flex: 1,
    backgroundColor: "#0A121A",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 10,
    color: "#98A6B3",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

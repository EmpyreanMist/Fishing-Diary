import { StatsAchievements } from "@/components/stats/StatsAchievements";
import { StatsGrid } from "@/components/stats/StatsGrid";
import { StatsLures } from "@/components/stats/StatsLures";
import { StatsProgress } from "@/components/stats/StatsProgress";
import { StatsSpeciesBreakdown } from "@/components/stats/StatsSpeciesBreakdown";
import { StatsTopLocations } from "@/components/stats/StatsTopLocations";
import { StatsHeader } from "@/components/stats/StatsHeader";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <StatsHeader />
          <StatsGrid />
          <StatsProgress />
          <StatsSpeciesBreakdown />
          <StatsLures />
          <StatsTopLocations />
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
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

/* Dummy data, this will be replaced by data from user database */
const fishData = [
  { species: "Pike", count: 28 },
  { species: "Perch", count: 19 },
  { species: "Trout", count: 12 },
  { species: "Roach", count: 7 },
];

export function StatsSpeciesBreakdown() {
  // Calculations for max value and total count
  const total = fishData.reduce((sum, item) => sum + item.count, 0);
  const maxValue = Math.max(...fishData.map((i) => i.count));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="fish-outline" size={20} color="#5ACCF2" />
        <Text style={styles.title}>Species Breakdown</Text>
      </View>

      <Text style={styles.subtitle}>
        Your most commonly caught fish species
      </Text>

      {fishData.map((fish) => {
        const percentage = Math.round((fish.count / total) * 100);
        const barWidth = (fish.count / maxValue) * 100;

        return (
          <View key={fish.species} style={styles.row}>
            <Text style={styles.species}>{fish.species}</Text>

            <View style={styles.barSection}>
              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${barWidth}%` }]} />
              </View>
            </View>

            <View style={styles.valueSection}>
              <Text style={styles.value}>{fish.count}</Text>
              <Text style={styles.percent}>{percentage}%</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121B22",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    color: "#F5F5F5",
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 8,
  },
  subtitle: {
    color: "#98A6B3",
    fontSize: 14,
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  species: {
    width: 60,
    color: "#F5F5F5",
    fontSize: 15,
    fontWeight: "600",
  },
  barSection: {
    flex: 1,
    marginHorizontal: 10,
  },
  barBackground: {
    height: 8,
    backgroundColor: "#1E2833",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#5ACCF2",
    borderRadius: 4,
  },
  valueSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: 60,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 6,
  },
  percent: {
    color: "#98A6B3",
    fontSize: 13,
  },
});

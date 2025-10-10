import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

/* Dummy data, will be change by user database or from lure API maby */
const lureData = [
  { name: "Spinner", catches: 18, avgWeight: 2.3, success: 75 },
  { name: "Crankbait", catches: 15, avgWeight: 2.8, success: 68 },
  { name: "Jig", catches: 12, avgWeight: 1.9, success: 62 },
  { name: "Soft Plastic", catches: 10, avgWeight: 2.1, success: 58 },
  { name: "Spoon", catches: 8, avgWeight: 2.5, success: 55 },
];

export function StatsLures() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="flash-outline" size={20} color="#5ACCF2" />
        <Text style={styles.title}>Best Performing Lures</Text>
      </View>

      <Text style={styles.subtitle}>
        Your most successful lures ranked by catches and effectiveness
      </Text>

      {lureData.map((lure, index) => (
        <View key={lure.name} style={styles.card}>
          <View style={styles.topRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{index + 1}</Text>
            </View>
            <Text style={styles.lureName}>{lure.name}</Text>

            <View style={styles.tag}>
              <Text style={styles.tagText}>{lure.catches} catches</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detail}>Avg Weight: {lure.avgWeight}kg</Text>
            <Text style={styles.detail}>Success Rate: {lure.success}%</Text>
          </View>

          <View style={styles.barBackground}>
            <View style={[styles.barFill, { width: `${lure.success}%` }]} />
          </View>
        </View>
      ))}
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#18242E",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#0A3852",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#5ACCF2",
    fontWeight: "bold",
    fontSize: 14,
  },
  lureName: {
    flex: 1,
    marginLeft: 10,
    color: "#F5F5F5",
    fontWeight: "600",
    fontSize: 16,
  },
  tag: {
    backgroundColor: "#1E2833",
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  tagText: {
    color: "#F5F5F5",
    fontSize: 13,
    fontWeight: "500",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  detail: {
    color: "#98A6B3",
    fontSize: 13,
  },
  barBackground: {
    height: 6,
    backgroundColor: "#1E2833",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#5ACCF2",
    borderRadius: 4,
  },
});

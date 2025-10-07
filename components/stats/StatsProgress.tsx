import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

/* This data will be replaced by information from user database */
const progressData = [
  { month: "Jan", progress: 3 },
  { month: "Feb", progress: 5 },
  { month: "Mar", progress: 8 },
  { month: "Apr", progress: 12 },
  { month: "May", progress: 15 },
  { month: "Jun", progress: 18 },
];

/* This will also be replaced by highest value from user database */
const MAX_VALUE = 18; // Maximum value for scaling the bars

export function StatsProgress() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="trending-up-outline" size={18} color="#5ACCF2" />
        <Text style={styles.title}>Monthly Progress</Text>
      </View>

      <Text style={styles.subtitle}>
        Your fishing activity over the past 6 months
      </Text>

      {/* Progress List */}
      {progressData.map((item) => {
        const progressWidth = (item.progress / MAX_VALUE) * 100;

        return (
          <View key={item.month} style={styles.row}>
            <Text style={styles.month}>{item.month}</Text>

            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View
                style={[styles.progressFill, { width: `${progressWidth}%` }]}
              />
            </View>

            <Text style={styles.value}>{item.progress}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121B22",
    paddingTop: 40,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  header: { flexDirection: "row", padding: 10 },
  title: { fontSize: 25, fontWeight: "bold", color: "white", paddingLeft: 10 },
  subtitle: { color: "#98A6B3", marginBottom: 20 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  month: {
    color: "white",
    fontSize: 16,
    width: 40,
  },
  progressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#1E2A33",
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#5ACCF2",
    borderRadius: 4,
  },
  value: {
    color: "#98A6B3",
    width: 30,
    textAlign: "right",
  },
});

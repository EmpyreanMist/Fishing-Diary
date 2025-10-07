import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

export function StatsHeader() {
  return (
    <LinearGradient
      colors={["#2F7D71", "#2E6F83"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <Ionicons name="stats-chart" size={26} color="#fff" />
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>

      <Text style={styles.headerSubtitle}>
        Track your fishing progress and achievements
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 140,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    height: "50%",
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 8,
  },
  headerSubtitle: {
    color: "#fff",
    opacity: 0.9,
    fontSize: 18,
    paddingHorizontal: 20,
    marginTop: 4,
  },
});

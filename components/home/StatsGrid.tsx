import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type StatItem = {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  sub: string;
};

export default function StatsGrid() {
  const stats: StatItem[] = [
    {
      icon: "fish-outline",
      value: "47",
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
      value: "Pike",
      label: "Favorite Species",
      sub: "Most caught",
    },
    {
      icon: "bar-chart-outline",
      value: "June",
      label: "Best Month",
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

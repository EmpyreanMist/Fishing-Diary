import { StyleSheet, View } from "react-native";
import { StatsCard } from "./StatsCard";

export function StatsGrid() {
  return (
    <View style={styles.grid}>
      <StatsCard icon="fish-outline" value="67" label="Total Catches" />
      <StatsCard icon="calendar-outline" value="23" label="Fishing Days" />
      <StatsCard icon="disc-outline" value="2.9" label="Avg per Trip" />
      <StatsCard icon="ribbon-outline" value="4.2kg" label="Biggest Catch" />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingTop: 40,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

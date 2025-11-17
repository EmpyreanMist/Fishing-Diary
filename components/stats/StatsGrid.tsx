import { StyleSheet, View } from "react-native";
import { StatsCard } from "./StatsCard";

type Props = {
  total: number;
  days: number;
  average: number;
  biggest: number | string;
};
export function StatsGrid({ total, days, average, biggest }: Props) {
  return (
    <View style={styles.grid}>
      <StatsCard icon="fish-outline" value={String(total)} label="Total Catches" />
      <StatsCard icon="calendar-outline" value={String(days)} label="Fishing Days" />
      <StatsCard icon="disc-outline" value={String(average)} label="Avg per Trip" />
      <StatsCard icon="ribbon-outline" value={`${biggest} kg`} label="Biggest Catch" />
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

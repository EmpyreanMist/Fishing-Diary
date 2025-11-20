import { StyleSheet, View } from "react-native";
import { StatsCard } from "./StatsCard";
import { Fish, Ruler, Scale, Calendar } from "lucide-react-native";

type Props = {
  total: number;
  days: number;
  biggestWeight: number | string;
  biggestLength: number | string;
};
export function StatsGrid({ total, days, biggestLength, biggestWeight }: Props) {
  return (
    <View style={styles.grid}>
      <StatsCard icon={Fish} value={String(total)} label="Total Catches" />
      <StatsCard icon={Calendar} value={String(days)} label="Fishing Days" />
      <StatsCard icon={Ruler} value={`${biggestLength} cm`} label="Longest Fish" />
      <StatsCard icon={Scale} value={`${biggestWeight} kg`} label="Heaviest Fish" />
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

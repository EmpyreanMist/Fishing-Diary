import React from "react";
import { StyleSheet, View } from "react-native";
import StatCard from "./StatCard";

type Props = {
  total: string;
  biggest: string;
  species: string;
};

export default function StatsRow({ total, biggest, species }: Props) {
  return (
    <View style={styles.row}>
      <StatCard value={total} label="Total" />
      <StatCard value={biggest} label="Biggest" />
      <StatCard value={species} label="Species" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
});

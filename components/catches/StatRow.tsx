import React from "react";
import { StyleSheet, View } from "react-native";
import StatCard from "./StatCard";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  total: string;
  biggest: string;
  species: string;
};

export default function StatsRow({ total, biggest, species }: Props) {
  return (
    <LinearGradient
      colors={["#1A2732", "#0E141B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.row}>
        <StatCard value={total} label="Total" />
        <StatCard value={biggest} label="Biggest" />
        <StatCard value={species} label="Species" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 16,
    padding: 12,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});

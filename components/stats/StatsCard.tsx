import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { ComponentType } from "react";

type Props = {
  icon: ComponentType<{ size?: number; color?: string }>;
  value: string;
  label: string;
};

export function StatsCard({ icon: Icon, value, label }: Props) {
  return (
    <LinearGradient
      colors={["#1A2732", "#0E141B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Icon size={28} color="#5ACCF2" />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 6,
  },
  label: {
    color: "#98A6B3",
    opacity: 0.9,
    fontSize: 14,
    marginTop: 4,
  },
});

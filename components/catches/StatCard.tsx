import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  value: string;
  label: string;
};

/**
 * Renders a compact card displaying a prominent value with a descriptive label beneath it.
 *
 * @param value - The text shown prominently as the statistic or metric.
 * @param label - A short descriptor displayed below the value.
 * @returns A React element that displays the value and label inside a styled card.
 */
export default function StatCard({ value, label }: Props) {
  return (
    <View style={[styles.card]}>
      <Text style={[styles.value]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#121B22",
  },

  value: {
    color: "#5ACCF2",
    fontSize: 18,
    fontWeight: "700",
  },

  label: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
  },
});
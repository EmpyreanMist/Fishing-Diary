import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  value: string;
  label: string;
//   highlighted?: boolean;
};

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
//   highlight: {
//     backgroundColor: "#0E1620",
//   },
  value: {
    color: "#E5E7EB",
    fontSize: 18,
    fontWeight: "700",
  },
//   valueHighlight: {
//     color: "#5ACCF2",
//   },
  label: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
  },
});

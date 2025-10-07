import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
};

export function StatsCard({ icon, value, label }: Props) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={28} color="#4FD1D9" />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#121B22",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1E2A33",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginBottom: 16,
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

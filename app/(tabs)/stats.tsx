import { StatsCard } from "@/components/ui/StatsCard";
import { StyleSheet, View } from "react-native";

export default function statsScreen() {
  return (
    <View style={styles.container}>
      <StatsCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A121A",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

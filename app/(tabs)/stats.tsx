import { StatsGrid } from "@/components/stats/StatsGrid";
import { StatsProgress } from "@/components/stats/StatsProgress";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatsHeader } from "../../components/stats/StatsHeader";

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <StatsHeader />
        <StatsGrid />
        <StatsProgress />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  container: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
});

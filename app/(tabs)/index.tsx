import { HeroSection } from "@/components/home/HeroSection";
import StatsGrid from "@/components/home/StatsGrid";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, StyleSheet } from "react-native";
import ActionButton from "@/components/ui/ActionButton";

export default function HomeScreen() {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection />
        <StatsGrid />

        <View style={styles.buttonsContainer}>
          <ActionButton
            label="Find Spots"
            color="blue"
            width={"90%"}
            icon={"location-outline"}
          />
          <ActionButton
            label="Quick Photo"
            color="green"
            width={"90%"}
            icon={"camera-outline"}
          />
          <ActionButton
            label="Statistics"
            color="black"
            width={"90%"}
            icon={"stats-chart-outline"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
    gap: 14,
  },
  actionButton: {
    width: "90%",
  },
});

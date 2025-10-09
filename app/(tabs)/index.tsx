import { HeroSection } from "@/components/home/HeroSection";
import StatsGrid from "../../components/home/StatsGrid";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#0A121A" }}
    >
      <View>
        <HeroSection />
        <StatsGrid />
      </View>
    </SafeAreaView>
  );
}

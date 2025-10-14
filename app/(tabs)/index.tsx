import { useState } from "react";
import {
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  View,
  Modal,
} from "react-native";
import { Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionButton from "@/components/ui/ActionButton";
import StatsGrid from "@/components/home/StatsGrid";
import RecentCatches from "@/components/home/RecentCatches";
import CatchForm from "@/components/addCatch/CatchForm";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width > 700;

  const [showCatchForm, setShowCatchForm] = useState(false);

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          <Image
            style={[styles.image, { width, height: width * 0.6 }]}
            source={require("@/assets/images/fishing.png")}
            resizeMode="cover"
          />

          <View style={[styles.overlay, { top: (width * 0.6) / 2 - 40 }]}>
            <Text style={[styles.title, { fontSize: isTablet ? 40 : 28 }]}>
              Fishing Diary
            </Text>
            <Text style={[styles.subtitle, { fontSize: isTablet ? 22 : 18 }]}>
              Your digital angler's log
            </Text>
          </View>

          <View style={styles.heroButtons}>
            <ActionButton
              label="+ Add Catch"
              onPress={() => setShowCatchForm(true)}
            />
            <ActionButton label="+ Add Trip" />
          </View>
        </View>

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

        <RecentCatches />
      </ScrollView>

      <Modal
        visible={showCatchForm}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowCatchForm(false)}
      >
        <CatchForm
          //@ts-ignore
          onClose={() => setShowCatchForm(false)}
        />
      </Modal>
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
  heroContainer: {
    backgroundColor: "#0A121A",
    alignItems: "center",
  },
  image: {
    alignSelf: "stretch",
  },
  overlay: {
    position: "absolute",
    left: 20,
    transform: [{ translateY: -20 }],
  },
  title: {
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  subtitle: {
    color: "#F5F5F5",
    marginTop: 4,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
    bottom: 12,
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
    gap: 14,
  },
});

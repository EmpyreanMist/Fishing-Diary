import { useState } from "react";
import {
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  View,
  Modal,
  RefreshControl
} from "react-native";
import { Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionButton from "@/components/ui/ActionButton";
import StatsGrid from "@/components/home/StatsGrid";
import RecentCatches from "@/components/home/RecentCatches";
import CatchForm from "@/components/addCatch/CatchForm";
import AddTrip from "@/components/logTrip/AddTrip";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width > 700;

  const [showCatchForm, setShowCatchForm] = useState(false);
  const [showTripScreen, setShowTripScreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);

    // Triggerar barnkomponenterna
    setRefreshSignal((prev) => prev + 1);

    // Fake wait
    await new Promise((res) => setTimeout(res, 300));

    setRefreshing(false);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
              Your digital angler&apos;s log
            </Text>
          </View>

          <View style={styles.heroButtons}>
            <ActionButton
              label="+ Add Catch"
              onPress={() => setShowCatchForm(true)}
            />
            <ActionButton
              label="+ Add Trip"
              onPress={() => setShowTripScreen(true)}
            />
          </View>
        </View>

        <StatsGrid refreshSignal={refreshSignal} />
        <RecentCatches refreshSignal={refreshSignal} />
      </ScrollView>

      <Modal
        visible={showCatchForm}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowCatchForm(false)}
        style={styles.catchFormContainer}
      >
        <CatchForm
          onClose={() => setShowCatchForm(false)}
          onSaved={() => setRefreshSignal((s) => s + 1)}
        />
      </Modal>
      <Modal
        visible={showTripScreen}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowTripScreen(false)}
      >
        <AddTrip
          //@ts-ignore
          onClose={() => setShowTripScreen(false)}
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
  catchFormContainer: {
    width: "100%",
  },
});

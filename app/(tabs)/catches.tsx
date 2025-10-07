import ActionButton from "@/components/ui/ActionButton";
import { LinearGradient } from "expo-linear-gradient";
import { Fish } from "lucide-react-native";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CatchesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      {/* Gör statusbaren ljus text och genomskinlig så gradienten syns */}
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <LinearGradient
        colors={["#2F7D71", "#2E6F83"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.topbar,
          { paddingTop: insets.top + 20 },
        ]}
      >
        <View style={styles.headerRow}>
          <View style={styles.titleRow}>
            <Fish size={28} color="white" />
            <Text style={styles.title}>My Catches</Text>
          </View>

          <ActionButton
            label="Add Catch"
            icon="add"
            color="transparent"
            size="md"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.subtitleTop}>8 catches logged</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ height: 500 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  topbar: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  subtitleTop: {
    marginTop: 6,
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});

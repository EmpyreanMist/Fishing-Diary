import ActionButton from "@/components/ui/ActionButton";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { LinearGradient } from "expo-linear-gradient";
import { Fish, Search } from "lucide-react-native";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        style={[styles.topbar, { paddingTop: insets.top + 20 }]}
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
        <Card
          style={{
            backgroundColor: "#121B22",
            borderColor: "#1F2937",
            borderWidth: 1,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <View style={styles.cardHeader}>
            <Icon as={Search} color="#5ACCF2" size="sm" />
            <Text style={styles.cardTitle}>Search & Filter</Text>
          </View>
          <View style={{ padding: 16 }}>
            {/* Sökfält */}
            <View style={{ marginBottom: 12 }}>
              <Input
                style={{
                  borderColor: "#1F2937",
                  borderWidth: 1,
                  borderRadius: 12,
                  backgroundColor: "transparent",
                }}
              >
                <Icon
                  as={require("lucide-react-native").Search}
                  color="#9CA3AF"
                  style={{ marginLeft: 12 }}
                />
                <InputField
                  placeholder="Search by species or location..."
                  placeholderTextColor="#6B7280"
                  style={{
                    color: "white",
                    paddingVertical: 10,
                    paddingHorizontal: 8,
                  }}
                />
              </Input>
            </View>

            {/* Filter-pills (statisk layout) */}
            <View style={styles.pillsRow}>
              <TouchableOpacity style={styles.pill}>
                <Text style={styles.pillText}>All Species</Text>
                <Text style={styles.pillCaret}>▾</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.pill}>
                <Text style={styles.pillText}>Date (newest)</Text>
                <Text style={styles.pillCaret}>▾</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Placeholder för kommande steg (statistikrutor + lista) */}
        <View style={{ height: 24 }} />
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
  cardHeader: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomColor: "#1F2937",
    borderBottomWidth: 1,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  pillsRow: {
    flexDirection: "row",
    gap: 12,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#121B22",
    flex: 1,
  },
  pillText: {
    color: "#D1D5DB",
    fontSize: 14,
  },
  pillCaret: {
    color: "#9CA3AF",
    marginLeft: 8,
    fontSize: 12,
  },
});

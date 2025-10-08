import ActionButton from "@/components/ui/ActionButton";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";

import { LinearGradient } from "expo-linear-gradient";
import {
  CalendarDays,
  Fish,
  FishIcon,
  MapPin,
  Ruler,
  Search,
} from "lucide-react-native";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CatchItem = {
  id: string;
  species: string;
  weight: string;
  length: string;
  lake: string;
  date: string; // visningsformat
};

const DUMMY: CatchItem[] = [
  {
    id: "1",
    species: "Pike",
    weight: "2.3 kg",
    length: "65 cm",
    lake: "Lake Superior",
    date: "2024-10-01",
  },
  {
    id: "2",
    species: "Perch",
    weight: "0.8 kg",
    length: "28 cm",
    lake: "Lake Michigan",
    date: "2024-10-03",
  },
  {
    id: "3",
    species: "Pike",
    weight: "1.9 kg",
    length: "58 cm",
    lake: "Lake Erie",
    date: "2024-10-05",
  },
  {
    id: "4",
    species: "Trout",
    weight: "1.2 kg",
    length: "45 cm",
    lake: "Lake Huron",
    date: "2024-10-08",
  },
];

function CatchRow({ item }: { item: CatchItem }) {
  return (
    <View style={styles.catchCard}>
      {/* Vänster: ikon + detaljer */}
      <View style={styles.catchLeft}>
        <View style={styles.fishIcon}>
          <Fish size={18} color="#5ACCF2" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.catchSpecies}>{item.species}</Text>

          <View style={styles.inlineRow}>
            <View style={styles.inlineGroup}>
              <Fish size={14} color="#9CA3AF" />
              <Text style={styles.inlineText}>{item.weight}</Text>
            </View>
            <View style={styles.inlineGroup}>
              <Ruler size={14} color="#9CA3AF" />
              <Text style={styles.inlineText}>{item.length}</Text>
            </View>
          </View>

          <View style={[styles.inlineGroup, { marginTop: 4 }]}>
            <MapPin size={14} color="#9CA3AF" />
            <Text style={styles.locationText}>{item.lake}</Text>
          </View>
        </View>
      </View>

      {/* Höger: datum-badge */}
      <View style={styles.dateBadge}>
        <CalendarDays size={12} color="#9CA3AF" />
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );
}

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

        <Text style={styles.subtitleTop}>4 catches logged</Text>
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

        <View style={styles.statsRow}>
          <View style={styles.statCard} accessibilityRole="summary">
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>

          <View
            style={[styles.statCard, styles.statHighlighted]}
            accessibilityRole="summary"
          >
            <Text style={[styles.statValue, styles.statHighlightedValue]}>
              2.3 kg
            </Text>
            <Text style={styles.statLabel}>Biggest</Text>
          </View>

          <View style={styles.statCard} accessibilityRole="summary">
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Species</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>All Catches</Text>
        <FlatList
          data={DUMMY}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <CatchRow item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          scrollEnabled={false}
          contentContainerStyle={{ paddingTop: 4 }}
        />

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
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#121B22",
  },
  statHighlighted: {
    backgroundColor: "#121B22",
  },
  statValue: {
    color: "#E5E7EB",
    fontSize: 18,
    fontWeight: "700",
  },
  statHighlightedValue: {
    color: "#5ACCF2",
  },
  statLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    color: "#E5E7EB",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  catchCard: {
    backgroundColor: "#121B22",
    borderColor: "#1F2937",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  catchLeft: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  fishIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  catchSpecies: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "700",
  },
  inlineRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 2,
  },
  inlineGroup: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  inlineText: {
    color: "#D1D5DB",
    fontSize: 13,
  },
  locationText: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#0D141B",
    alignSelf: "flex-start",
  },
  dateText: {
    color: "#D1D5DB",
    fontSize: 12,
    fontWeight: "600",
  },
});

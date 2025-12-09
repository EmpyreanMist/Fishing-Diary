import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CatchCard({ item, onImagePress }: any) {
  const [expanded, setExpanded] = useState(false);
  const hasPhoto = item.photos && item.photos.length > 0;

  function toggleExpand() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }

  return (
    <LinearGradient
      colors={["#1A2732", "#0E141B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.topRow}>
        {hasPhoto ? (
          <Pressable onPress={() => onImagePress(item.photos[0])}>
            <Image source={{ uri: item.photos[0] }} style={styles.photo} />
          </Pressable>
        ) : (
          <Ionicons name="fish-outline" size={30} color="#5ACCF2" />
        )}

        <View style={styles.middleColumn}>
          <Text style={styles.species}>{item.species}</Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Ionicons name="barbell-outline" size={14} color="#98A6B3" />
              <Text style={styles.statText}>{item.weight}</Text>
            </View>

            <View style={styles.stat}>
              <Ionicons name="resize-outline" size={14} color="#98A6B3" />
              <Text style={styles.statText}>{item.length}</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#98A6B3" />
            <Text style={styles.locationText}>{item.lake}</Text>
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>
      </View>

      {expanded && (
        <View style={styles.expandArea}>
          <Text style={styles.expandLabel}>More details</Text>

          <Text style={styles.expandText}>🎣 Species: {item.species}</Text>
          <Text style={styles.expandText}>🎯 Lure: {item.lure ?? "—"}</Text>
          <Text style={styles.expandText}>📝 Notes: {item.notes ?? "—"}</Text>
        </View>
      )}

      <Pressable onPress={toggleExpand}>
        <Text style={styles.viewMore}>
          {expanded ? "Hide details ▲" : "View more ▼"}
        </Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1C2E40",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  photo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#0A121A",
    marginRight: 14,
  },

  middleColumn: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },

  species: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  statsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 4,
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  statText: {
    color: "#A5B2C4",
    fontSize: 13,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  locationText: {
    color: "#A5B2C4",
    fontSize: 13,
  },

  rightColumn: {
    alignItems: "flex-end",
    marginLeft: 10,
  },

  dateBadge: {
    backgroundColor: "#172838",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  dateText: {
    color: "#A5B2C4",
    fontSize: 12,
  },

  expandArea: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#1C2E40",
  },

  expandLabel: {
    color: "#5ACCF2",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  expandText: {
    color: "#D1D5DB",
    fontSize: 13,
    marginBottom: 4,
  },

  viewMore: {
    color: "#5ACCF2",
    marginTop: 10,
    fontWeight: "500",
    textAlign: "center",
  },
});

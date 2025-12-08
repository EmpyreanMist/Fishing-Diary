import React from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { CalendarDays, Fish, MapPin, Ruler, Scale } from "lucide-react-native";
import type { CatchItem } from "../../components/common/types";

export default function CatchRow({
  item,
  onImagePress,
}: {
  item: CatchItem;
  onImagePress: (url: string) => void;
}) {
  return (
    <View style={styles.catchCard}>
      <View style={styles.catchLeft}>
        <View style={styles.avatar}>
          {item.photos.length > 0 ? (
            <Pressable onPress={() => onImagePress(item.photos[0])}>
              <Image
                source={{ uri: item.photos[0] }}
                style={styles.avatarImage}
              />
            </Pressable>
          ) : (
            <Fish size={18} color="#5ACCF2" />
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.catchSpecies}>{item.species}</Text>

          <View style={styles.inlineRow}>
            <View style={styles.inlineGroup}>
              <Scale size={14} color="#9CA3AF" />
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
          <View style={[styles.inlineGroup, { marginTop: 4 }]}>
            <Fish size={14} color="#9CA3AF" />
            <Text style={styles.inlineText}>{item.species}</Text>
          </View>
        </View>
      </View>

      <View style={styles.dateBadge}>
        <CalendarDays size={12} color="#9CA3AF" />
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  avatar: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    resizeMode: "cover",
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
    backgroundColor: "#0A121A",
    alignSelf: "flex-start",
  },
  dateText: {
    color: "#D1D5DB",
    fontSize: 12,
    fontWeight: "600",
  },
});

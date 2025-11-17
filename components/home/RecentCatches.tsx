import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type CatchItem = {
  id: string;
  species: string;
  weight: string;
  length: string;
  location: string;
  date: string;
};

const dummyData: CatchItem[] = [
  {
    id: "1",
    species: "Pike",
    weight: "2.3 kg",
    length: "65 cm",
    location: "Lake Superior",
    date: "1/10/2024",
  },
  {
    id: "2",
    species: "Perch",
    weight: "0.8 kg",
    length: "28 cm",
    location: "Lake Michigan",
    date: "1/8/2024",
  },
  {
    id: "3",
    species: "Pike",
    weight: "1.9 kg",
    length: "58 cm",
    location: "Lake Erie",
    date: "1/5/2024",
  },
];

export default function RecentCatches() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="fish-outline" size={20} color="#5ACCF2" />
        <Text style={styles.title}>Recent Catches</Text>
      </View>
      <Text style={styles.subtitle}>Your latest fishing successes</Text>

      <View style={{ gap: 12, marginTop: 10 }}>
        {dummyData.map((item) => (
          <LinearGradient
            key={item.id}
            colors={["#1A2732", "#0E141B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <View style={styles.speciesContainer}>
                <Ionicons name="fish-outline" size={18} color="#5ACCF2" />
                <Text style={styles.species}>{item.species}</Text>
              </View>
              <View style={styles.dateBadge}>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Ionicons name="barbell-outline" size={15} color="#98A6B3" />
                <Text style={styles.statText}>{item.weight}</Text>
              </View>
              <View style={styles.stat}>
                <Ionicons name="resize-outline" size={15} color="#98A6B3" />
                <Text style={styles.statText}>{item.length}</Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={15} color="#98A6B3" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </LinearGradient>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121B22",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#1E2A38",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 6,
  },
  subtitle: {
    color: "#A5B2C4",
    fontSize: 13,
  },
  card: {
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1C2E40",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  speciesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  species: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
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
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
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
});

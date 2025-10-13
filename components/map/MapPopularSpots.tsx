import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export function MapPopularSpots() {
  const spots = [
    {
      name: "Lake Superior",
      species: "Pike, Perch",
      catches: 15,
      distance: "2.3 km",
    },
    {
      name: "Lake Michigan",
      species: "Trout, Pike",
      catches: 12,
      distance: "5.7 km",
    },
    {
      name: "Lake Erie",
      species: "Perch, Bass",
      catches: 8,
      distance: "12.1 km",
    },
    {
      name: "Lake Huron",
      species: "Pike, Walleye",
      catches: 6,
      distance: "45.2 km",
    },
  ];

  return (
    <LinearGradient
      colors={["#1A2732", "#0E141B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Ionicons name="fish-outline" size={20} color="#5ACCF2" />
        <Text style={styles.title}>Popular Fishing Spots</Text>
      </View>
      <Text style={styles.sub}>Top locations based on community catches</Text>

      {spots.map((s, i) => (
        <View key={i} style={styles.item}>
          <View>
            <Text style={styles.name}>{s.name}</Text>
            <Text style={styles.species}>{s.species}</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.catches}>{s.catches} catches</Text>
            <Text style={styles.distance}>{s.distance}</Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    marginTop: 200,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 6 },
  title: { color: "#F5F5F5", fontWeight: "600", fontSize: 16 },
  sub: { color: "#98A6B3", fontSize: 13, marginBottom: 10 },
  item: {
    backgroundColor: "rgba(16, 24, 32, 0.6)",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: { color: "#F5F5F5", fontWeight: "500" },
  species: { color: "#98A6B3", fontSize: 12 },
  right: { alignItems: "flex-end" },
  catches: { color: "#F5F5F5", fontSize: 12 },
  distance: { color: "#98A6B3", fontSize: 12 },
});

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const topLocations = [
  { name: "Lake Superior", catches: 15 },
  { name: "Lake Michigan", catches: 12 },
  { name: "Lake Erie", catches: 8 },
  { name: "Lake Huron", catches: 6 },
];

export function StatsTopLocations() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="locate-outline" size={20} color="#5ACCF2" />
        <Text style={styles.title}>Top Locations</Text>
      </View>

      <Text style={styles.subtitle}>Your most productive fishing spots</Text>

      <View>
        {topLocations.map((location, index) => (
          <View style={styles.card} key={location.name}>
            <View style={styles.rankCircle}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.location}>{location.name}</Text>
              <Text style={styles.catches}>{location.catches} catches</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121B22",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F5F5F5",
    marginLeft: 8,
  },
  subtitle: {
    color: "#98A6B3",
    fontSize: 14,
    marginBottom: 18,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18242E",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  rankCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#5ACCF2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rankText: {
    color: "#0A121A",
    fontWeight: "bold",
  },
  info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    color: "#F5F5F5",
    fontSize: 16,
    fontWeight: "600",
  },
  catches: {
    color: "#98A6B3",
    fontSize: 14,
    fontWeight: "600",
  },
});

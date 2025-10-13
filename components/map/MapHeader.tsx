import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

export function MapHeader() {
  return (
    <LinearGradient
      colors={["#0072FF", "#00C6FF"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <Ionicons name="location" size={26} color="#fff" />
        <Text style={styles.headerTitle}>Fishing Map</Text>
      </View>

      <Text style={styles.headerSubtitle}>
        Explore fishing spots and track your catches
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 140,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    height: "50%",
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 8,
  },
  headerSubtitle: {
    color: "#fff",
    opacity: 0.9,
    fontSize: 18,
    paddingHorizontal: 20,
    marginTop: 4,
  },
});

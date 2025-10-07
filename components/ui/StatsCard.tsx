import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

export function StatsCard() {
  return (
    <LinearGradient
      colors={["#2F7D71", "#2E6F83"]}
      start={[0, 0]}
      end={[1, 1]}
      style={{
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <Ionicons name="stats-chart" size={24} color="#fff" />
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: 8,
          }}
        >
          Statistics
        </Text>
      </View>

      <View>
        <Text style={{ color: "#fff", opacity: 0.9, fontSize: 14 }}>
          Track your fishing progress and achievements
        </Text>
      </View>
    </LinearGradient>
  );
}

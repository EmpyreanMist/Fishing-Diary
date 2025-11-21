import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FishMarker() {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 6,
        borderRadius: 20,
      }}
    >
      <Ionicons name="fish" size={25} color="#4CC9F0" />
    </View>
  );
}

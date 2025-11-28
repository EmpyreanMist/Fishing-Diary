import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CatchDateTimeButtonProps {
  value: Date;
  onPress: () => void;
}

export default function CatchDateTimeButton({ value, onPress }: CatchDateTimeButtonProps) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons name="calendar-outline" size={18} color="white" />
        <Text style={styles.text}>
          {value.toLocaleDateString()}{" "}
          {value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 16,
  },
  button: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  text: {
    color: "white",
    marginLeft: 8,
  },
});

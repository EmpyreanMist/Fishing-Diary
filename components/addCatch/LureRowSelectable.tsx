import { View, Text, Image, TouchableOpacity } from "react-native";

interface LureSelectableProps {
  label: string;
  image?: string;
  onPress: () => void;
}

export default function LureRowSelectable({ label, image, onPress }: LureSelectableProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#334155",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 16,
          flexShrink: 1,
          marginRight: 10,
        }}
      >
        {label}
      </Text>

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            resizeMode: "cover",
          }}
        />
      )}
    </TouchableOpacity>
  );
}

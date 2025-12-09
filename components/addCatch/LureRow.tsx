import { Swipeable } from "react-native-gesture-handler";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { supabase } from "@/lib/supabase";

interface Lure {
  id: number;
  name: string;
  brand: string;
  color?: string;
  weight_gram?: number;
  image_url?: string | null;
  storage_path?: string | null;
  user_id?: string;
}

interface LureRowProps {
  lure: Lure;
  refresh: () => void;
  onPress?: () => void;
}

export default function LureRow({ lure, refresh, onPress }: LureRowProps) {
  const handleDelete = async () => {
    try {
      if (!lure.user_id) {
        console.error("Cannot delete lure without user_id");
        return;
      }

      if (lure.storage_path) {
        await supabase.storage
          .from("user_lure_images")
          .remove([lure.storage_path]);
      }

      const { error } = await supabase
        .from("user_lures")
        .delete()
        .eq("id", lure.id)
        .eq("user_id", lure.user_id);

      if (error) throw error;

      refresh();
    } catch (err) {
      console.error("Error deleting lure:", err);
    }
  };

  const renderRightActions = () => (
    <TouchableOpacity
      onPress={handleDelete}
      style={{
        backgroundColor: "#DC2626",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#334155",
          }}
        >
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                flexShrink: 1,
              }}
              numberOfLines={2}
            >
              {lure.brand} - {lure.name}{lure.weight_gram ? ` - ${lure.weight_gram}g` : ""}{lure.color ? ` - ${lure.color}` : ""}
            </Text>
          </View>

          {lure.image_url && (
            <Image
              source={{ uri: lure.image_url }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                resizeMode: "cover",
                marginLeft: 5,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

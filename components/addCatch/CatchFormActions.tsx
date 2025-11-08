import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Camera, MapPinPlus, X } from "lucide-react-native";
import ActionButton from "../ui/ActionButton";
import { VStack, Image, Pressable, Text } from "@gluestack-ui/themed";
import { StyleSheet, View } from "react-native";

interface CatchFormActionsProps {
  onClose: () => void;
  onSave: () => void;
  onAddPhoto: () => void;
  onGetLocation: () => void;
  loading?: boolean;
  photos?: string[];
  onRemovePhoto?: (index: number) => void;
  locationStatus?: string | null;
}

export default function CatchFormActions({
  onClose,
  onSave,
  onAddPhoto,
  onGetLocation,
  loading = false,
  photos = [],
  onRemovePhoto,
  locationStatus,
}: CatchFormActionsProps) {
  return (
    <VStack className="my-5">
      {photos.length > 0 && (
        <Box
          className="mb-4"
          style={{
            backgroundColor: "#111",
            borderRadius: 12,
            padding: 10,
            borderWidth: 1,
            borderColor: "#222",
          }}
        >
          <Text
            style={{
              color: "#ccc",
              fontSize: 14,
              marginBottom: 8,
              fontWeight: "500",
            }}
          >
            Selected photos
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {photos.map((uri, index) => (
              <View
                key={index}
                style={{
                  position: "relative",
                  width: "30%",
                  aspectRatio: 1,
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri }}
                  alt={`Photo ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#333",
                  }}
                />
                <Pressable
                  onPress={() => onRemovePhoto && onRemovePhoto(index)}
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    borderRadius: 12,
                    padding: 3,
                  }}
                >
                  <X size={12} color="white" />
                </Pressable>
              </View>
            ))}
          </View>
        </Box>
      )}

      <HStack className="w-full py-4" space="lg">
        <Button
          className="w-1/2 flex-1"
          variant="outline"
          action="primary"
          style={styles.button}
          onPress={onAddPhoto}
        >
          <ButtonIcon as={Camera} size="sm" color="white" />
          <ButtonText>Add Photo</ButtonText>
        </Button>

        <Button
          className="w-1/2 flex-1"
          variant="outline"
          action="primary"
          style={styles.button}
          onPress={onGetLocation}
        >
          <ButtonIcon as={MapPinPlus} size="sm" color="white" />
          <ButtonText>GPS Location</ButtonText>
        </Button>
      </HStack>

      {locationStatus && (
        <Text
          style={{
            color: "#00FFAA",
            fontSize: 13,
            marginTop: 8,
            textAlign: "center",
            opacity: 0.8,
          }}
        >
          {locationStatus}
        </Text>
      )}

      <HStack className="w-full py-4" space="lg">
        <Box className="w-1/2 flex-1">
          <ActionButton label="Cancel" color="black" size="md" onPress={onClose} />
        </Box>
        <Box className="w-1/2">
          <ActionButton
            label={loading ? "Saving..." : "Save catch"}
            color="blue"
            size="md"
            disabled={loading}
            onPress={onSave}
          />
        </Box>
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1A1A1A",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 12,
  },
});

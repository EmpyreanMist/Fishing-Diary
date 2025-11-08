import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Camera, MapPinPlus } from "lucide-react-native";
import ActionButton from "../ui/ActionButton";
import { VStack } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

interface CatchFormActionsProps {
  onClose: () => void;
  onSave: () => void;
  onAddPhoto: () => void;
  onGetLocation: () => void;
  loading?: boolean;
}

export default function CatchFormActions({
  onClose,
  onSave,
  onAddPhoto,
  onGetLocation,
  loading = false,
}: CatchFormActionsProps) {
  return (
    <VStack className="my-5">
      <HStack className="w-full py-4" space="lg">
        <Button
          className="w-1/2 flex-1"
          variant="outline"
          action="primary"
          style={{
            backgroundColor: "#1A1A1A",
            borderColor: "#333",
            borderWidth: 1,
            borderRadius: 12,
          }}
          onPress={onAddPhoto}
        >
          <ButtonIcon as={Camera} size="sm" color="white" />
          <ButtonText>Add Photo</ButtonText>
        </Button>

        <Button
          className="w-1/2 flex-1"
          variant="outline"
          action="primary"
          style={{
            backgroundColor: "#1A1A1A",
            borderColor: "#333",
            borderWidth: 1,
            borderRadius: 12,
          }}
          onPress={onGetLocation}
        >
          <ButtonIcon as={MapPinPlus} size="sm" color="white" />
          <ButtonText>GPS Location</ButtonText>
        </Button>
      </HStack>

      <HStack className="w-full py-4" space="lg">
        <Box className="w-1/2 flex-1">
          <ActionButton
            label="Cancel"
            color="black"
            size="md"
            onPress={onClose}
          />
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

const styles = StyleSheet.create({});

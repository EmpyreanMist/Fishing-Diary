import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable, Text } from "react-native";

interface CatchFormHeaderProps {
  onClose: () => void;
}

export default function CatchFormHeader({ onClose }: CatchFormHeaderProps) {
  return (
    <HStack space="$md" className="px-5 py-3 items-center justify-between">
      <Box className="flex-0.8">
        <Heading size="lg" style={{ color: "white" }}>
          Add New Catch
        </Heading>
        <Divider className="my-1" style={{ backgroundColor: "#5ACCF2" }} />
        <Heading size="sm" style={{ color: "#94A3B8" }}>
          Record your latest fishing trip
        </Heading>
      </Box>

      <Box style={{ flex: 0.2 }} className="items-end">
        <Pressable onPress={onClose} hitSlop={10}>
          <Text style={{ color: "white", fontSize: 22 }}>X</Text>
        </Pressable>
      </Box>
    </HStack>
  );
}

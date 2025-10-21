import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { FormControl, View } from "@gluestack-ui/themed";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Camera, MapPinPlus } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import LureDropDown from "./LureDropDown";
import SpeciesDropDown from "./SpeciesDropDown";
import ActionButton from "../ui/ActionButton";
import { Pressable, StyleSheet, Text } from "react-native";
import { useState } from "react";
import SimpleDropdown from "./SimpleDropdown";

interface CatchFormProps {
  onClose: () => void;
}

export default function CatchForm({ onClose }: CatchFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <View style={styles.screen}>
      <VStack space="$md">
        {/* Header med stängknapp */}
        <Box className="w-full h-20 p-4 pr-5 items-end">
          <Pressable onPress={onClose}>
            <Text style={{ color: "white", fontSize: 22 }}>✕</Text>
          </Pressable>
        </Box>

        <Box className="px-5 w-[80%]">
          <Heading size="lg">Add New Catch</Heading>
          <Divider className="my-2" style={styles.divider} />
          <Heading size="sm">Record your latest fishing trip</Heading>
        </Box>
      </VStack>

      <FormControl className="px-5 py-4 rounded-lg w-full">
        <Heading className="pb-2" size="lg">
          Species
        </Heading>
        {/* <SpeciesDropDown /> */}
        <SimpleDropdown
          label="Select fish species:"
          items={[
            { label: "Choose lure", value: "" },
            { label: "Pike", value: "Pike" },
            { label: "Zander", value: "Zander" },
            { label: "Perch", value: "Perch" },
          ]}
        />

        <HStack className="w-full py-4" space="4xl">
          <Box className="flex-1">
            <Heading className="pb-2" size="lg">
              Weight (kg)
            </Heading>
            <Input
              style={[
                styles.input,
                focusedField === "weight" && styles.inputFocused,
              ]}
            >
              <InputField
                placeholder="Enter weight..."
                onFocus={() => setFocusedField("weight")}
                onBlur={() => setFocusedField(null)}
              />
            </Input>
          </Box>

          <Box className="w-1/2">
            <Heading className="pb-2" size="md">
              Length (cm)
            </Heading>
            <Input
              style={[
                styles.input,
                focusedField === "length" && styles.inputFocused,
              ]}
            >
              <InputField
                placeholder="Enter length here..."
                onFocus={() => setFocusedField("length")}
                onBlur={() => setFocusedField(null)}
              />
            </Input>
          </Box>
        </HStack>

        <Heading className="py-2" size="md">
          Location
        </Heading>
        <Input
          style={[
            styles.input,
            focusedField === "location" && styles.inputFocused,
          ]}
        >
          <InputField
            onFocus={() => setFocusedField("location")}
            onBlur={() => setFocusedField(null)}
            placeholder="Where did you catch it?"
          />
        </Input>

        <SimpleDropdown
          label="Lure Used:"
          items={[
            { label: "Select lure type", value: "" },
            { label: "Spinner", value: "Spinner" },
            { label: "Jig", value: "Jig" },
            { label: "Custom", value: "Custom" },
          ]}
        />

        <Heading className="pt-4">Notes</Heading>
        <Textarea
          size="md"
          style={[
            styles.input,
            focusedField === "notes" && styles.inputFocused,
          ]}
          className="w-full"
        >
          <TextareaInput
            onFocus={() => setFocusedField("notes")}
            onBlur={() => setFocusedField(null)}
            placeholder="Your text goes here..."
          />
        </Textarea>

        {/* Foto + GPS-knappar */}
        <VStack>
          <HStack className="w-full py-4" space="lg">
            <Button
              className="w-1/2 flex-1"
              variant="outline"
              style={styles.button}
            >
              <ButtonIcon as={Camera} size="sm" color="white" />
              <ButtonText>Add Photo</ButtonText>
            </Button>

            <Button
              style={styles.button}
              className="w-1/2"
              variant="outline"
              action="primary"
            >
              <ButtonIcon as={MapPinPlus} size="sm" color="white" />
              <ButtonText>GPS Location</ButtonText>
            </Button>
          </HStack>

          {/* Cancel + Save */}
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
              <ActionButton label="Save catch" color="blue" size="md" />
            </Box>
          </HStack>
        </VStack>
      </FormControl>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, // ⬅️ viktigt för fullskärm
    backgroundColor: "#0A121A", // mörk bakgrund
    paddingTop: 40,
    paddingBottom: 60,
  },
  button: {
    backgroundColor: "#1A1A1A",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 8,
  },
  inputFocused: {
    borderColor: "#5ACCF2",
  },
  divider: {
    backgroundColor: "#5ACCF2",
  },
});

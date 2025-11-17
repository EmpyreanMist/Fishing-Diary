import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { StyleSheet } from "react-native";

interface CatchFormInputsProps {
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  weightKg: string;
  setWeightKg: React.Dispatch<React.SetStateAction<string>>;
  lengthCm: string;
  setLengthCm: React.Dispatch<React.SetStateAction<string>>;
  locationName: string;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
}

export default function CatchFormInputs({
  focusedField,
  setFocusedField,
  weightKg,
  setWeightKg,
  lengthCm,
  setLengthCm,
  locationName,
  setLocationName,
  notes,
  setNotes,
}: CatchFormInputsProps) {
  return (
    <>
      <HStack className="w-full py-4" space="4xl">
        <Box className="flex-1">
          <Heading className="pb-2 color-white" size="md">
            Weight (kg)
          </Heading>
          <Input
            style={[
              styles.input,
              focusedField === "weight" && styles.inputFocused,
            ]}
          >
            <InputField
              value={weightKg} 
              onChangeText={setWeightKg} 
              placeholder="Enter weight..."
              keyboardType="decimal-pad" 
              onFocus={() => setFocusedField("weight")}
              onBlur={() => setFocusedField(null)}
            />
          </Input>
        </Box>

        <Box className="w-1/2">
          <Heading className="pb-2 color-white" size="md">
            Length (cm)
          </Heading>
          <Input
            style={[
              styles.input,
              focusedField === "length" && styles.inputFocused,
            ]}
          >
            <InputField
              value={lengthCm}
              onChangeText={setLengthCm}
              placeholder="Enter length..."
              keyboardType="decimal-pad"
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
          value={locationName}
          onChangeText={setLocationName}
          placeholder="Where did you catch it?"
          onFocus={() => setFocusedField("location")}
          onBlur={() => setFocusedField(null)}
        />
      </Input>

      <Heading className="py-4">Notes</Heading>
      <Textarea
        size="md"
        style={[styles.input, focusedField === "notes" && styles.inputFocused]}
        className="w-full"
      >
        <TextareaInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Your text goes here..."
          onFocus={() => setFocusedField("notes")}
          onBlur={() => setFocusedField(null)}
        />
      </Textarea>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 8,
  },
  inputFocused: {
    borderColor: "#5ACCF2",
  },
});

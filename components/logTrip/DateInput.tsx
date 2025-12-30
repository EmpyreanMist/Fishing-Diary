import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { Calendar } from "lucide-react-native";
import { StyleSheet } from "react-native";

interface DateInputProps {
  date: Date | null;
  onOpen: () => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

export default function DateInput({
  date,
  onOpen,
  focusedField,
  setFocusedField,
}: DateInputProps) {
  const formatted = (date ?? new Date()).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

  return (
    <Box>
      <Pressable
        onPress={() => {
          onOpen();
          setFocusedField("date");
        }}
      >
        <Box pointerEvents="none">
          <Input
            style={[
              styles.input,
              focusedField === "date" && styles.inputFocused,
            ]}
            size="md"
          >
            <Icon as={Calendar} style={styles.calendarIcon} />
            <InputField
              editable={false}
              value={formatted}
            />
          </Input>
        </Box>
      </Pressable>
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 8,
  },
  inputFocused: { borderColor: "#5ACCF2" },
  calendarIcon: {
    marginLeft: 6,
    color: "#94A3B8",
  },
});

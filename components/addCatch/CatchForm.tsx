import { View, StyleSheet } from "react-native";
import { FormControl } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CatchFormHeader from "./CatchFormHeader";
import CatchFormInputs from "./CatchFormInputs";
import LureDropdown from "./LureDropdown";
import CatchFormActions from "./CatchFormActions";
import SimpleDropdown from "./SimpleDropdown";
import FishDropdown from "./FishDropdown";

interface CatchFormProps {
  onClose: () => void;
}

export default function CatchForm({ onClose }: CatchFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#0A121A" }}>
        <CatchFormHeader onClose={onClose} />
      </SafeAreaView>

      <FormControl className="px-5 py-4 rounded-lg w-full">
        <FishDropdown />

        <CatchFormInputs
          focusedField={focusedField}
          setFocusedField={setFocusedField}
        />
        <LureDropdown />
        <CatchFormActions onClose={onClose} />
      </FormControl>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0A121A",
    paddingTop: 20,
    paddingBottom: 60,
  },
});

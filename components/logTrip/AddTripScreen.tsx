import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import { FormControl } from "@/components/ui/form-control";
import TripForm from "@/components/logTrip/TripForm";
import { useState } from "react";
import TripHeader from "@/components/logTrip/TripHeader";
import { ModalComponentProps } from "../common/types";
import CatchForm from "@/components/addCatch/CatchForm";
import { CatchDraft } from "../common/types";

export default function AddTrip({ onClose }: ModalComponentProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  // New state for catches inside a trip
  const [catches, setCatches] = useState<CatchDraft[]>([]);
  const [showCatchModal, setShowCatchModal] = useState(false);

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleAddCatch = (draft: CatchDraft) => {
    setCatches((prev) => [...prev, draft]);
    setShowCatchModal(false);
  };

  return (
    <>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View className="mb-5">
          <TripHeader />
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <FormControl className="mx-auto w-full p-2">
            <TripForm
              date={date}
              setDate={setDate}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              handleFocus={handleFocus}
              onClose={onClose}
              // NEW PROPS
              catches={catches}
              onAddCatch={() => setShowCatchModal(true)}
            />
          </FormControl>
        </ScrollView>
      </SafeAreaView>

      {/* Catch modal for adding catches inside a trip */}
      {showCatchModal && (
        <YourModalComponent onClose={() => setShowCatchModal(false)}>
          <CatchForm
            onClose={() => setShowCatchModal(false)}
            onSubmit={handleAddCatch}
          />
        </YourModalComponent>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  container: { flex: 1, backgroundColor: "#0A121A" },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  heading: {
    color: "#fff",
    padding: 10,
  },
});

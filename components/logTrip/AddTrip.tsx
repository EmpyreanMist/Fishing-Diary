import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View, Modal } from "react-native";
import { FormControl } from "@/components/ui/form-control";
import TripForm from "@/components/logTrip/TripForm";
import { useState } from "react";
import TripHeader from "@/components/logTrip/TripHeader";
import { ModalComponentProps, CatchDraft } from "../common/types";
import CatchForm from "@/components/addCatch/CatchForm";
import uuid from "react-native-uuid";

export default function AddTrip({ onClose }: ModalComponentProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const [catches, setCatches] = useState<Record<string, CatchDraft>>({});
  const [showCatchModal, setShowCatchModal] = useState(false);

  const handleFocus = (field: string): void => {
    setFocusedField(field);
  };

  const generateUniqueId = (): string => {
    return String(uuid.v4());
  };

  const handleAddCatch = (draft: CatchDraft): void => {
    const id = generateUniqueId();

    setCatches((prev) => ({ ...prev, [id]: draft }));
    setShowCatchModal(false);
  };

  const removeCatch = (id: string): void => {
    setCatches((prevCatches) => {
      const updatedCatches = { ...prevCatches };
      delete updatedCatches[id];
      return updatedCatches;
    });
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
              catches={catches}
              onAddCatch={() => setShowCatchModal(true)}
              removeCatch={removeCatch}
            />
          </FormControl>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={showCatchModal}
        animationType="slide"
        onRequestClose={() => setShowCatchModal(false)}
      >
        <CatchForm
          onClose={() => setShowCatchModal(false)}
          onSubmit={handleAddCatch}
        />
      </Modal>
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

import {
  ScrollView,
  StyleSheet,
  Alert,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FormControl } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import CatchFormHeader from "./CatchFormHeader";
import CatchFormInputs from "./CatchFormInputs";
import LureDropdown from "./LureDropdown";
import CatchFormActions from "./CatchFormActions";
import FishDropdown from "./FishDropdown";
import { supabase } from "../../lib/supabase";
import CatchDateTimePicker from "./CatchDateTimePicker";
import type { ModalComponentProps, FormState } from "../common/types";
import { createCatch } from "../../lib/catches/createCatch";
import { uploadCatchPhotos } from "../../lib/catches/uploadPhotos";

import * as ImagePicker from "expo-image-picker";
import CatchMapModal from "./addCatchMapModal/CatchMapModal";

export default function CatchForm({ onClose }: ModalComponentProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const [form, setForm] = useState<FormState>({
    speciesId: "",
    lureId: "",
    weightKg: "",
    lengthCm: "",
    locationName: "",
    notes: "",
    caughtAt: new Date(),
  });

  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [localPhotos, setLocalPhotos] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session?.user?.id ?? null);
    };
    loadSession();
  }, []);

  const setField = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleGetLocation = () => {
    setShowMap(true);
  };

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setLocationStatus(null);
      Alert.alert("Permission denied", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // NOTE: Using MediaTypeOptions for compatibility with current Expo SDK.
      // MediaType is the new API but not fully supported in our version yet.
      // TODO: Replace with [ImagePicker.MediaType.Images] after upgrading Expo SDK (≥55).
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      selectionLimit: 0,
    });

    if (result.canceled || !result.assets?.length) return;
    const newUris = result.assets.map((asset) => asset.uri);
    setLocalPhotos((prev) => [...prev, ...newUris]);
  };

  const handleSaveCatch = async () => {
    if (!userId) return Alert.alert("Not signed in");

    setSaving(true);

    const catchData = await createCatch(form, userId, latitude, longitude);
    if (!catchData) {
      setSaving(false);
      Alert.alert("Save failed", "Could not create catch.");
      return;
    }

    const failedPhotos = await uploadCatchPhotos(
      localPhotos,
      userId,
      catchData.id
    );
    setLocalPhotos(failedPhotos);
    setSaving(false);

    if (failedPhotos.length > 0) {
      Alert.alert(
        "Partial success",
        failedPhotos.length === localPhotos.length
          ? "Catch saved but no photos were uploaded."
          : "Catch saved but some photos failed to upload."
      );
    } else {
      Alert.alert("Success", "Catch and photos saved!");
      onClose();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <CatchFormHeader onClose={onClose} />

          <View style={styles.inner}>
            <FormControl className="px-5 py-4 rounded-lg w-full">
              <FishDropdown onSelect={(id) => setField("speciesId", id)} />

              <CatchFormInputs
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                weightKg={form.weightKg}
                setWeightKg={(val) => setField("weightKg", val)}
                lengthCm={form.lengthCm}
                setLengthCm={(val) => setField("lengthCm", val)}
                locationName={form.locationName}
                setLocationName={(val) => setField("locationName", val)}
                notes={form.notes}
                setNotes={(val) => setField("notes", val)}
              />

              <LureDropdown onSelect={(id) => setField("lureId", id)} />

              <CatchDateTimePicker
                value={form.caughtAt}
                onChange={(date) => setField("caughtAt", date)}
              />

              <CatchFormActions
                onClose={onClose}
                onSave={handleSaveCatch}
                onAddPhoto={handleAddPhoto}
                onGetLocation={handleGetLocation}
                loading={saving}
                photos={localPhotos}
                locationStatus={locationStatus}
                onRemovePhoto={(index) =>
                  setLocalPhotos((prev) => prev.filter((_, i) => i !== index))
                }
              />
            </FormControl>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CatchMapModal
        visible={showMap}
        onClose={() => setShowMap(false)}
        onSave={(coords) => {
          if (coords) {
            setLatitude(coords.latitude);
            setLongitude(coords.longitude);
            setLocationStatus("GPS location saved!");
          }
          setShowMap(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 200,
  },
  inner: {
    flexGrow: 1,
  },
});

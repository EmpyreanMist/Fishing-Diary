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

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

interface CatchFormProps {
  onClose: () => void;
}

export default function CatchForm({ onClose }: CatchFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [speciesId, setSpeciesId] = useState<string>("");
  const [lureId, setLureId] = useState<string>("");
  const [weightKg, setWeightKg] = useState<string>("");
  const [lengthCm, setLengthCm] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [gpsSaved, setGpsSaved] = useState(false);

  const [notes, setNotes] = useState<string>("");

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

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      selectionLimit: 0,
    });

    if (result.canceled || !result.assets?.length) return;
    const newUris = result.assets.map((asset) => asset.uri);
    setLocalPhotos((prev) => [...prev, ...newUris]);
  };

  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need access to your location.");
      return;
    }

    try {
      const pos = await Location.getCurrentPositionAsync({});
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);

      setLocationStatus("📍 GPS saved!");
      setGpsSaved(true);
    } catch (err) {
      setLocationStatus("Failed to get location");
      setGpsSaved(false);
    }
  };

  const handleSaveCatch = async () => {
    if (!userId) {
      Alert.alert("Not signed in", "Logga in först.");
      return;
    }

    const rawWeight =
      typeof weightKg === "string"
        ? weightKg
        : String((weightKg as any)?.nativeEvent?.text ?? "");

    const weight = parseFloat(rawWeight.trim().replace(",", "."));
    if (isNaN(weight) || weight <= 0) {
      Alert.alert("Invalid weight", "Ange vikt i kg (> 0).");
      return;
    }

    setSaving(true);
    const payload = {
      user_id: userId,
      fish_species_id: speciesId ? Number(speciesId) : null,
      lure_id: lureId ? Number(lureId) : null,
      weight_kg: weight,
      length_cm: lengthCm ? Number(lengthCm) : null,
      location_name: locationName || null,
      notes: notes || null,
      latitude,
      longitude,
    };

    const { data, error } = await supabase
      .from("catches")
      .insert([payload])
      .select()
      .single();

    if (error) {
      setSaving(false);
      console.error(error);
      Alert.alert("Save failed", error.message);
      return;
    }

    setSaving(false);
    Alert.alert("Success", "Catch saved!");
    onClose();
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
              <FishDropdown onSelect={setSpeciesId} />

              <CatchFormInputs
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                weightKg={weightKg}
                setWeightKg={setWeightKg}
                lengthCm={lengthCm}
                setLengthCm={setLengthCm}
                locationName={locationName}
                setLocationName={setLocationName}
                notes={notes}
                setNotes={setNotes}
              />

              <LureDropdown onSelect={setLureId} />

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

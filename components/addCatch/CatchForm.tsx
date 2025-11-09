import { View, StyleSheet, Alert } from "react-native";
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
import * as ImageManipulator from "expo-image-manipulator";
import * as Location from "expo-location";
import { decode } from "base64-arraybuffer";
import { sortRoutes } from "expo-router/build/sortRoutes";

interface CatchFormProps {
  onClose: () => void;
}

export default function CatchForm({ onClose }: CatchFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Form state
  const [speciesId, setSpeciesId] = useState<string>("");
  const [lureId, setLureId] = useState<string>("");
  const [weightKg, setWeightKg] = useState<string>("");
  const [lengthCm, setLengthCm] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [localPhoto, setLocalPhoto] = useState<string | null>(null);

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
      mediaTypes: ImagePicker.MediaType.image, // ✅ ny och korrekt syntax
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled || !result.assets.length) return;
    const image = result.assets[0];

    setLocalPhoto(image.uri); // ✅ preview innan upload
  };

  // 📍 Get GPS location
  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need access to your location.");
      return;
    }

    const pos = await Location.getCurrentPositionAsync({});
    setLatitude(pos.coords.latitude);
    setLongitude(pos.coords.longitude);

    Alert.alert("Location saved", "GPS coordinates added.");
  };

  // 💾 Save catch
  const handleSaveCatch = async () => {
    if (!userId) {
      Alert.alert("Not signed in", "Logga in först.");
      return;
    }

    const weight = Number(weightKg);
    if (!weightKg || Number.isNaN(weight) || weight <= 0) {
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

    if (photoUrl) {
      await supabase.from("catch_photos").insert([
        {
          catch_id: data.id,
          image_url: photoUrl,
        },
      ]);
    }

    setSaving(false);
    Alert.alert("Success", "Catch saved!");
    onClose();
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#0A121A" }}>
        <CatchFormHeader onClose={onClose} />
      </SafeAreaView>

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
        />
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

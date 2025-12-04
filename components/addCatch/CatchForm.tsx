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
import type {
  ModalComponentProps,
  FormState,
  CatchDraft,
} from "../common/types";
import createCatch from "../../lib/catches/createCatch";
import { uploadCatchPhotos } from "../../lib/catches/uploadPhotos";
import { useAuth } from "@/providers/AuthProvider";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import CatchDateTimeButton from "./CatchDateTimeButton";
import CatchDateTimeModals from "./CatchDateTimeModals";
import CatchMapModal from "./CatchMapModal";

type Props = {
  onClose: () => void;
  onSaved?: () => void;
  onSubmit?: (draft: CatchDraft) => Promise<void> | void;
  loading?: boolean;
  initialValue?: Partial<CatchDraft>;
};

export default function CatchForm({
  onClose,
  onSaved,
  onSubmit,
  loading = false,
  initialValue = {},
}: Props) {
  const { user } = useAuth();

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const [form, setForm] = useState({
    speciesId: initialValue.speciesId ?? '',
    lureId: initialValue.lureId ?? '',
    weightKg: initialValue.weightKg ?? '',
    lengthCm: initialValue.lengthCm ?? '',
    locationName: initialValue.locationName ?? '',
    notes: initialValue.notes ?? '',
    caughtAt: initialValue.caughtAt ?? new Date(),
  });

  const [latitude, setLatitude] = useState<number | null>(initialValue.latitude ?? null);
  const [longitude, setLongitude] = useState<number | null>(initialValue.longitude ?? null);
  const [localPhotos, setLocalPhotos] = useState<string[]>(initialValue.photos ?? []);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

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

  const handleAddPhoto = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== "granted") {
      Alert.alert("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      selectionLimit: 0,
    });

    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setLocalPhotos((prev) => [...prev, ...uris]);
    }
  };

  const handleSubmit = () => {
    const draft: CatchDraft = {
      ...form,
      latitude,
      longitude,
      photos: localPhotos,
    };

    if (onSubmit) {
      // Din funktion för att hantera flera catches via trip-formuläret
      onSubmit(draft);
      return;
    }

    // Spara som fristående catch
    saveStandaloneCatch(draft);
  };

  const saveStandaloneCatch = async (draft: CatchDraft) => {
    try {
      const userId = user!.id;

      const formState = {
        speciesId: draft.speciesId,
        lureId: draft.lureId,
        weightKg: draft.weightKg,
        lengthCm: draft.lengthCm,
        locationName: draft.locationName,
        notes: draft.notes,
        caughtAt: draft.caughtAt,
      };

      const created = await createCatch(
        formState,
        userId,
        draft.latitude,
        draft.longitude
      );

      if (!created) {
        Alert.alert("Error", "Could not save catch.");
        return;
      }

      if (draft.photos.length > 0) {
        const failed = await uploadCatchPhotos(
          draft.photos,
          userId,
          created.id
        );

        if (failed.length > 0) {
          Alert.alert("Warning", "Some photos failed to upload.");
        }
      }

      Alert.alert("Success", "Catch saved!");
      if (onSaved) {
        onSaved();
      }
      onClose();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <CatchFormHeader onClose={onClose} />

          <View style={styles.inner}>
            <FormControl className="px-5 py-4 rounded-lg w-full">
              <FishDropdown onSelect={(id) => setField("speciesId", id)} />

              <CatchFormInputs
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                weightKg={form.weightKg}
                setWeightKg={(v) => setField("weightKg", v)}
                lengthCm={form.lengthCm}
                setLengthCm={(v) => setField("lengthCm", v)}
                locationName={form.locationName}
                setLocationName={(v) => setField("locationName", v)}
                notes={form.notes}
                setNotes={(v) => setField("notes", v)}
              />

              <LureDropdown onSelect={(id) => setField("lureId", id)} />
              <CatchDateTimeButton
                value={form.caughtAt}
                onPress={() => setShowDate(true)}
              />
              <CatchFormActions
                onClose={onClose}
                onSave={handleSubmit}
                onAddPhoto={handleAddPhoto}
                onGetLocation={() => setShowMap(true)}
                loading={loading}
                photos={localPhotos}
                locationStatus={locationStatus}
                onRemovePhoto={(i) =>
                  setLocalPhotos((prev) => prev.filter((_, idx) => idx !== i))
                }
              />
            </FormControl>
          </View>
        </ScrollView>
        <CatchDateTimeModals
          value={form.caughtAt}
          onChange={(d) => setField("caughtAt", d)}
          showDate={showDate}
          showTime={showTime}
          setShowDate={setShowDate}
          setShowTime={setShowTime}
        />
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
  safeArea: { flex: 1, backgroundColor: "#0A121A" },
  scrollContent: { flexGrow: 1, paddingBottom: 200 },
  inner: { flexGrow: 1 },
});

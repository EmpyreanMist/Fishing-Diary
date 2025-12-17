import { Alert } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import CatchForm from "./CatchForm";
import { CatchDraft } from "../common/types";
import createCatch from "../../lib/catches/createCatch";
import { uploadCatchPhotos } from "../../lib/catches/uploadPhotos";
import type { ModalComponentProps } from "../common/types";
import { useState } from "react";

export default function CreateCatchContainer({ onClose }: ModalComponentProps) {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (draft: CatchDraft) => {
    const userId = user!.id;

    setSaving(true);

    const created = await createCatch(
      {
        speciesId: draft.speciesId,
        lureId: draft.lureId,
        lureType: draft.lureType, 
        weightKg: draft.weightKg,
        lengthCm: draft.lengthCm,
        locationName: draft.locationName,
        notes: draft.notes,
        caughtAt: draft.caughtAt,
      },
      userId,
      draft.latitude,
      draft.longitude
    );

    if (!created) {
      setSaving(false);
      Alert.alert("Failed saving catch");
      return;
    }

    const failed = await uploadCatchPhotos(draft.photos, userId, created.id);

    setSaving(false);

    if (failed.length > 0) {
      Alert.alert("Partial success");
    } else {
      Alert.alert("Success");
      onClose();
    }
  };

  return (
    <CatchForm onClose={onClose} onSubmit={handleSubmit} loading={saving} />
  );
}

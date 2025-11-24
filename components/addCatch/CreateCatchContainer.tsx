import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import CatchForm from "./CatchForm";
import { CatchDraft } from "../common/types";
import { createCatch } from "../../lib/catches/createCatch";
import { uploadCatchPhotos } from "../../lib/catches/uploadPhotos";
import type { ModalComponentProps } from "../common/types";

export default function CreateCatchContainer({ onClose }: ModalComponentProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session?.user?.id ?? null);
    };
    load();
  }, []);

  const handleSubmit = async (draft: CatchDraft) => {
    if (!userId) {
      Alert.alert("Not signed in");
      return;
    }

    setSaving(true);

    const created = await createCatch(
      {
        speciesId: draft.speciesId,
        lureId: draft.lureId,
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

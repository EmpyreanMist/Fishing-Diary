import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { supabase } from "./supabase";

export async function uploadAvatar(userId: string) {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) throw new Error("Permission denied");

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });

  if (result.canceled) return null;

  const uri = result.assets[0].uri;

  // Convert to WEBP + compress
  const manip = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 512 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.WEBP }
  );

  const fileExt = "webp";
  const fileName = `${userId}-${Date.now()}.${fileExt}`;

  const file = await fetch(manip.uri);
  const blob = await file.blob();

  const { error: uploadErr } = await supabase.storage
    .from("avatars")
    .upload(fileName, blob, {
      upsert: true,
      contentType: "image/webp",
    });

  if (uploadErr) throw uploadErr;

  const { data: publicUrl } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}

import * as ImageManipulator from "expo-image-manipulator";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";

export async function uploadLurePhoto(
  localUri: string,
  userId: string,
  lureId: number
) {
  try {
    const manipulated = await ImageManipulator.manipulateAsync(
      localUri,
      [{ resize: { width: 1080 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.WEBP, base64: true }
    );

    const storagePath = `${userId}/${lureId}.webp`;

    const { error: uploadError } = await supabase.storage
      .from("user_lure_images")
      .upload(storagePath, decode(manipulated.base64!), {
        contentType: "image/webp",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("user_lure_images")
      .getPublicUrl(storagePath);

    return {
      publicUrl: urlData?.publicUrl ?? null,
      storagePath: storagePath,
    };
  } catch (err) {
    console.error("Image processing error:", err);
    return null;
  }
}

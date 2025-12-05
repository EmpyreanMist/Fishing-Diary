import * as ImageManipulator from "expo-image-manipulator";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";


export async function uploadLurePhoto(
  localUri: string,
  userId: string,
  lureId: number
): Promise<string | null> {
  try {
    const manipulated = await ImageManipulator.manipulateAsync(
      localUri,
      [{ resize: { width: 1080 } }],
      {
        compress: 0.8,
        format: ImageManipulator.SaveFormat.WEBP,
        base64: true,
      }
    );

    if (!manipulated.base64) {
      console.error("No base64 data for image");
      return null;
    }

    const filename = `${userId}/${lureId}.webp`;

    const { error: uploadError } = await supabase.storage
      .from("user_lure_images")
      .upload(filename, decode(manipulated.base64), {
        contentType: "image/webp",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("user_lure_images")
      .getPublicUrl(filename);

    const publicUrl = urlData?.publicUrl ?? null;

    if (!publicUrl) return null;

    const { error: dbError } = await supabase
      .from("user_lures")
      .update({ image_url: publicUrl })
      .eq("id", lureId)
      .eq("user_id", userId);

    if (dbError) {
      console.error("DB update error:", dbError);

      await supabase.storage.from("user_lure_images").remove([filename]);
      return null;
    }

    return publicUrl;

  } catch (err) {
    console.error("Image processing error:", err);
    return null;
  }
}


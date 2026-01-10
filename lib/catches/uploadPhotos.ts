import * as ImageManipulator from "expo-image-manipulator";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../lib/supabase";

export async function uploadCatchPhotos(
  localPhotos: string[],
  userId: string,
  catchId: number
): Promise<string[]> {
  const failedPhotoUris: string[] = [];

  for (const [index, uri] of localPhotos.entries()) {
    try {
      const manipulated = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1080 } }],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.WEBP,
          base64: true,
        }
      );

      if (!manipulated.base64) {
        console.error("No base64 data for image:", uri);
        failedPhotoUris.push(uri);
        continue;
      }

      const filename = `${userId}_${catchId}_${index}.webp`;
      const { error: uploadError } = await supabase.storage
        .from("catch_photos")
        .upload(filename, decode(manipulated.base64), {
          contentType: "image/webp",
          upsert: true,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        failedPhotoUris.push(uri);
        continue;
      }

      const { data: publicUrl } = supabase.storage
        .from("catch_photos")
        .getPublicUrl(filename);

      const { error: dbError } = await supabase.from("catch_photos").insert([
        {
          catch_id: catchId,
          image_url: publicUrl.publicUrl,
        },
      ]);

      if (dbError) {
        console.error("DB insert error:", dbError);
        await supabase.storage.from("catch_photos").remove([filename]);
        failedPhotoUris.push(uri);
      }
    } catch (err) {
      console.error("Image processing error:", err);
      failedPhotoUris.push(uri);
    }
  }

  return failedPhotoUris;
}

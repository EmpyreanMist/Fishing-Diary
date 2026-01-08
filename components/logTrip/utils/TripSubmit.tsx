import { CatchDraft, TripValues } from "@/components/common/types";
import { supabase } from "@/lib/supabase";
import timeTodayToIso from "./TimeTodayToIso";
import { uploadCatchPhotos } from "@/lib/catches/uploadPhotos";

type TripRow = {
  id: number;
};

type CatchRow = {
  id: number;
};

type AtomicCatchRow = {
  id: number;
  key: string;
};

type TripSubmitFailure =
  | {
      type: "catch_insert";
      key: string;
      error: unknown;
      element: CatchDraft;
    }
  | {
      type: "photo_upload";
      key: string;
      catch_id: number;
      details: string[];
    }
  | {
      type: "photo_upload_exception";
      key: string;
      catch_id: number;
      error: unknown;
    };

type TripSubmitResult = {
  trip: TripRow | null;
  catches: CatchRow[];
  failures: TripSubmitFailure[];
};

type AtomicCatchPayload = {
  key: string;
  index: number;
  fish_species_id: number | null;
  lure_id: number | null;
  weight_kg: number | null;
  length_cm: number | null;
  location_name: string | null;
  notes: string | null;
  caught_at: string | null;
  latitude: number | null;
  longitude: number | null;
};

type AtomicRpcResult = {
  trip: TripRow | null;
  catches: AtomicCatchRow[];
};

export default async function handleTripSubmit(
  catches: Record<string, CatchDraft>,
  tripValues: TripValues,
  options: { atomic?: boolean } = { atomic: false }
): Promise<TripSubmitResult> {
  const succesfulSubmittedCatches: CatchRow[] = [];
  const failures: TripSubmitFailure[] = [];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  if (options.atomic) {
    const catchListEntries: AtomicCatchPayload[] = Object.entries(catches).map(
      ([key, element], index) => ({
        key,
        index,
        fish_species_id: element.speciesId ? Number(element.speciesId) : null,
        lure_id: element.lureId ? Number(element.lureId) : null,
        weight_kg: element.weightKg ? Number(element.weightKg) : null,
        length_cm: element.lengthCm ? Number(element.lengthCm) : null,
        location_name: element.locationName || null,
        notes: element.notes || null,
        caught_at: element.caughtAt
          ? new Date(element.caughtAt).toISOString()
          : null,
        latitude: element.latitude || null,
        longitude: element.longitude || null,
      })
    );

    try {
      const tripPayload = {
        user_id: user.id,
        trip_name: tripValues.trip_name,
        start_time: timeTodayToIso(tripValues.startTime),
        end_time: timeTodayToIso(tripValues.endTime),
        participants: tripValues.participants,
        weather: tripValues.weather,
        temperature: tripValues.temperature,
        wind: tripValues.wind,
        water_condition: tripValues.water_conditions,
        notes: tripValues.notes,
        fishing_method: tripValues.fishing_method,
        trip_latitude: tripValues.trip_latitude,
        trip_longitude: tripValues.trip_longitude,
        trip_location: tripValues.trip_location,
      };

      const { data: rpcData, error: rpcError } = await supabase.rpc(
        "insert_trip_with_catches",
        {
          trip: JSON.stringify(tripPayload),
          catches: JSON.stringify(catchListEntries),
        }
      );

      if (rpcError) {
        throw rpcError;
      }

      const typedRpcData = (rpcData ?? null) as AtomicRpcResult | null;
      const returnedTrip = typedRpcData?.trip ?? null;
      const returnedCatches = typedRpcData?.catches ?? [];

      for (const returned of returnedCatches) {
        const originalEntry = catches[returned.key];
        if (
          originalEntry &&
          Array.isArray(originalEntry.photos) &&
          originalEntry.photos.length > 0
        ) {
          try {
            const failedPhotos = await uploadCatchPhotos(
              originalEntry.photos,
              user.id,
              returned.id
            );
            if (failedPhotos.length > 0) {
              failures.push({
                type: "photo_upload",
                key: returned.key,
                catch_id: returned.id,
                details: failedPhotos,
              });
            }
          } catch (err) {
            failures.push({
              type: "photo_upload_exception",
              key: returned.key,
              catch_id: returned.id,
              error: err,
            });
          }
        }
      }

      return {
        trip: returnedTrip,
        catches: returnedCatches,
        failures,
      };
    } catch (err) {
      throw err;
    }
  }

  const { data: tripDataRaw, error: tripError } = await supabase
    .from("trip")
    .insert([
      {
        user_id: user.id,
        trip_name: tripValues.trip_name,
        start_time: timeTodayToIso(tripValues.startTime),
        end_time: timeTodayToIso(tripValues.endTime),
        participants: tripValues.participants,
        weather: tripValues.weather,
        temperature: tripValues.temperature,
        wind: tripValues.wind,
        water_condition: tripValues.water_conditions,
        notes: tripValues.notes,
        fishing_method: tripValues.fishing_method,
        trip_latitude: tripValues.trip_latitude,
        trip_longitude: tripValues.trip_longitude,
        trip_location: tripValues.trip_location,
      },
    ])
    .select()
    .single();

  if (tripError) {
    throw tripError;
  }

  const tripData = tripDataRaw as TripRow | null;
  if (!tripData) {
    throw new Error("Trip insert failed.");
  }

  const tripId = tripData.id;

  const catchList = Object.entries(catches);
  if (catchList.length === 0) {
    return { trip: tripData, catches: [], failures };
  }

  for (const [key, element] of catchList) {
    const { data: catchDataRaw, error: catchError } = await supabase
      .from("catches")
      .insert([
        {
          user_id: user.id,
          trip_id: tripId,
          fish_species_id: element.speciesId ? Number(element.speciesId) : null,
          lure_id: element.lureId ? Number(element.lureId) : null,
          weight_kg: element.weightKg ? Number(element.weightKg) : null,
          length_cm: element.lengthCm ? Number(element.lengthCm) : null,
          location_name: element.locationName || null,
          notes: element.notes || null,
          caught_at: element.caughtAt
            ? new Date(element.caughtAt).toISOString()
            : null,
          latitude: element.latitude || null,
          longitude: element.longitude || null,
        },
      ])
      .select()
      .single();

    if (catchError) {
      failures.push({ type: "catch_insert", key, error: catchError, element });
      continue;
    }

    const catchData = catchDataRaw as CatchRow | null;
    if (!catchData) {
      failures.push({
        type: "catch_insert",
        key,
        error: new Error("Catch insert returned no data."),
        element,
      });
      continue;
    }

    if (Array.isArray(element.photos) && element.photos.length > 0) {
      try {
        const failedPhotos = await uploadCatchPhotos(
          element.photos,
          user.id,
          catchData.id
        );
        if (failedPhotos.length > 0) {
          failures.push({
            type: "photo_upload",
            key,
            catch_id: catchData.id,
            details: failedPhotos,
          });
        }
      } catch (err) {
        failures.push({
          type: "photo_upload_exception",
          key,
          catch_id: catchData.id,
          error: err,
        });
      }
    }

    succesfulSubmittedCatches.push(catchData);
  }

  return { trip: tripData, catches: succesfulSubmittedCatches, failures };
}

import { CatchDraft, TripValues } from '@/components/common/types';
import { supabase } from '@/lib/supabase';
import timeTodayToIso from './TimeTodayToIso';
import { uploadCatchPhotos } from '@/lib/catches/uploadPhotos';

export default async function handleTripSubmit(
  catches: { [key: string]: CatchDraft },
  tripValues: TripValues,
  options: { atomic?: boolean } = { atomic: false }
): Promise<{
  trip: any | null;
  catches: any[];
  failures: any[];
}> {
  const succesfulSubmittedCatches: any[] = [];
  const failures: any[] = [];

  console.log('Submitting trip with the following details:', tripValues);
  console.log('Catches:', catches);

  // 1. AUTH ⬇
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  // Atomic mode: prefer a server-side RPC that wraps the trip + catches insert in a DB transaction.
  if (options.atomic) {
    // Prepare payloads for RPC
    const catchListEntries = Object.entries(catches).map(([key, element], index) => ({
      key,
      index,
      fish_species_id: element.speciesId ? Number(element.speciesId) : null,
      lure_id: element.lureId ? Number(element.lureId) : null,
      weight_kg: element.weightKg ? Number(element.weightKg) : null,
      length_cm: element.lengthCm ? Number(element.lengthCm) : null,
      location_name: element.locationName || null,
      notes: element.notes || null,
      caught_at: element.caughtAt ? new Date(element.caughtAt).toISOString() : null,
      latitude: element.latitude || null,
      longitude: element.longitude || null,
    }));

    // Note: This assumes a Postgres function `insert_trip_with_catches(trip json, catches json)` exists.
    // The function should insert the trip and catches within a single transaction and return the inserted rows.
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
        'insert_trip_with_catches',
        {
          trip: JSON.stringify(tripPayload),
          catches: JSON.stringify(catchListEntries),
        }
      );

      if (rpcError) {
        console.error('Atomic RPC insert error:', rpcError);
        throw rpcError;
      }

      // rpcData is expected to contain { trip: {...}, catches: [{...}] }
      const returnedTrip = rpcData?.trip ?? null;
      const returnedCatches = rpcData?.catches ?? [];

      // After DB-level atomic insert, perform photo uploads (these cannot be part of DB transaction)
      for (const returned of returnedCatches) {
        const originalEntry = catches[returned.key];
        if (originalEntry && Array.isArray(originalEntry.photos) && originalEntry.photos.length > 0) {
          try {
            const failedPhotos = await uploadCatchPhotos(originalEntry.photos, user.id, returned.id);
            if (failedPhotos.length > 0) {
              failures.push({
                type: 'photo_upload',
                key: returned.key,
                catch_id: returned.id,
                details: failedPhotos,
              });
            }
          } catch (err) {
            failures.push({ type: 'photo_upload_exception', key: returned.key, catch_id: returned.id, error: err });
          }
        }
      }

      return { trip: returnedTrip, catches: returnedCatches, failures };
    } catch (err) {
      // Don't swallow: bubble up so caller can handle, but include context
      console.error('Atomic insert failed:', err);
      throw err;
    }
  }

  // 2. INSERT TRIP (non-atomic) ⬇
  const { data: tripData, error: tripError } = await supabase
    .from('trip')
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
    console.error('Trip insert error:', tripError);
    throw tripError;
  }

  // 2.5. GET TRIP ID
  const tripId = tripData.id;
  console.log('Trip ID:', tripId);

  // 3. IF NO CATCHES → RETURN
  const catchList = Object.entries(catches);
  if (catchList.length === 0) {
    console.log('No catches to submit.');
    return { trip: tripData, catches: [], failures };
  }

  // 4. LOOP THROUGH CATCHES
  for (const [key, element] of catchList) {
    console.log('Submitting catch:', element, ' (key:', key, ')');

    const { data: catchData, error: catchError } = await supabase
      .from('catches')
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
          caught_at: element.caughtAt ? new Date(element.caughtAt).toISOString() : null,
          latitude: element.latitude || null,
          longitude: element.longitude || null,
        },
      ])
      .select()
      .single();

    if (catchError) {
      console.error('Catch insert ERROR:', catchError);
      failures.push({ type: 'catch_insert', key, index: undefined, error: catchError, element });
      continue;
    }

    console.log('Catch submitted:', catchData);

    // HANDLE PHOTO UPLOADS
    if (Array.isArray(element.photos) && element.photos.length > 0) {
      console.log('Uploading photos:', element.photos);

      try {
        const failedPhotos = await uploadCatchPhotos(element.photos, user.id, catchData.id);
        if (failedPhotos.length > 0) {
          console.warn('Some photos failed to upload:', failedPhotos);
          failures.push({ type: 'photo_upload', key, catch_id: catchData.id, details: failedPhotos });
        }
      } catch (err) {
        console.error('Photo upload exception:', err);
        failures.push({ type: 'photo_upload_exception', key, catch_id: catchData.id, error: err });
      }
    } else {
      console.log('No photos for this catch.');
    }

    succesfulSubmittedCatches.push(catchData);
  }

  return { trip: tripData, catches: succesfulSubmittedCatches, failures };
}

 //TODO: Fix date picker to handle start time and end time


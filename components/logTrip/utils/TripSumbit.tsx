import { CatchDraft, TripValues } from '@/components/common/types';
import { supabase } from '@/lib/supabase';
import timeTodayToIso from './TimeTodayToIso';
import { uploadCatchPhotos } from '@/lib/catches/uploadPhotos';

export default async function handleTripSubmit(
  catches: { [key: string]: CatchDraft },
  tripValues: TripValues
) {
  const succesfulSubmittedCatches: any[] = [];

  console.log('Submitting trip with the following details:', tripValues);
  console.log('Catches:', catches);

  // 1. AUTH ⬇
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  // 2. INSERT TRIP ⬇
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
  const catchList = Object.values(catches);
  if (catchList.length === 0) {
    console.log('No catches to submit.');
    return [];
  }

  // 4. LOOP THROUGH CATCHES
  for (const element of catchList) {
    console.log('Submitting catch:', element);

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
      console.error("Catch insert ERROR:", catchError);
      continue;
    }

    console.log("Catch submitted:", catchData);

    // HANDLE PHOTO UPLOADS
    if (Array.isArray(element.photos) && element.photos.length > 0) {
      console.log("Uploading photos:", element.photos);

      const failedPhotos = await uploadCatchPhotos(
        element.photos,
        user.id,
        catchData.id
      );

      if (failedPhotos.length > 0) {
        console.warn("Some photos failed to upload:", failedPhotos);
      }
    } else {
      console.log("No photos for this catch.");
    }

    succesfulSubmittedCatches.push(catchData);
  }

  return succesfulSubmittedCatches;
}

 //TODO: Fix date picker to handle start time and end time


import { CatchDraft, TripValues } from '@/components/common/types';
import { supabase } from '@/lib/supabase';
import timeTodayToIso from './TimeTodayToIso';

export default async function handleTripSubmit(
  catches: { [key: string]: CatchDraft },
  tripValues: TripValues /* , form: any */
) {
  const succesfulSubmittedCatches: any[] = [];
  //implement trip submission logic here to supabase
  console.log('Submitting trip with the following details:');
  console.log('Trip Values:', tripValues);
  console.log('Catches:', catches);

  // Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('Authenticated user:', user);

  if (!user) throw new Error('Not authenticated');

  // Insert trip data into 'trip' table
  const { data: tripData, error } = await supabase
    .from('trip')
    .insert([
      {
        user_id: user.id,
        trip_name: tripValues.trip_name,
        //TODO: needs to handle date also
        //TODO: start_time needs to change to be handled with the date picker
        start_time: timeTodayToIso(tripValues.startTime),
        //TODO: end_time needs to change to be handled with the date picker
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

  if (error) {
    console.error('Error submitting trip:', error);
  } else {
    console.log('Trip submitted successfully:', tripData);
  }

  // to get the trip id for foreign key in catches table
  const tripId = tripData.id;
  console.log('Trip ID for submitted trip:', tripId);

  // 3. Handle case: no catches → return early
  const catchValues = Object.values(catches);
  if (catchValues.length === 0) {
    console.log('No catches to submit.');
    return [];
  }

  //implement catches submission logic here to supabase
  for (const element of Object.values(catches)) {
    console.log('Catch to submit:', element);
    const { data, error } = await supabase
      .from('catches')
      .insert([
        {
          trip_id: tripId,
          species_id: element.speciesId,
          lure_id: element.lureId,
          weight_kg: element.weightKg,
          length_cm: element.lengthCm,
          location_name: element.locationName,
          notes: element.notes,
          caught_at: element.caughtAt,
          latitude: element.latitude,
          longitude: element.longitude,
          photos: element.photos,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(`Error submitting catch (${element}): ${error}`);
    } else {
      console.log('Catch submitted successfully:', data);
      succesfulSubmittedCatches.push(data);
    }
  }

  return succesfulSubmittedCatches;
}

//TODO: Fix catches implementation

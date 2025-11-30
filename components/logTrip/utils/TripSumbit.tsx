import { CatchDraft, TripValues } from '@/components/common/types';
import { supabase } from '@/lib/supabase.web';

export default /* async */ function handleTripSubmit(
  catches: { [key: string]: CatchDraft },
  tripValues: TripValues /* , form: any */
) {
  const succesfulSubmittedCatches: any[] = [];
  //implement trip submission logic here to supabase
  console.log('Submitting trip with the following details:');
  console.log('Trip Values:', tripValues);
  console.log('Catches:', catches);
  // const { data: tripData, error } = await supabase
  //   .from('trips')
  //   .insert([
  //     {
  //       trip_name: tripValues.trip_name,
  //       start_time: tripValues.startTime,
  //       end_time: tripValues.endTime,
  //       participants: tripValues.participants,
  //       weather: tripValues.weather,
  //       temperature: tripValues.temperature,
  //       wind: tripValues.wind,
  //       water_conditions: tripValues.water_conditions,
  //       notes: tripValues.notes,
  //       fishing_method: tripValues.fishing_method,
  //     },
  //   ])
  //   .select()
  //   .single();

  // if (error) {
  //   console.error('Error submitting trip:', error);
  // } else {
  //   console.log('Trip submitted successfully:', tripData);
  // }

  // // to get the trip id for foreign key in catches table
  // const tripId = tripData.id;
  // console.log('Trip ID for submitted trip:', tripId);

  /* //implement catches submission logic here to supabase
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
  } */

  return succesfulSubmittedCatches;
}

/* console.log('Submitting trip with the following details:');
    console.log('Catches:', catches); */
// You can add API calls or database interactions here

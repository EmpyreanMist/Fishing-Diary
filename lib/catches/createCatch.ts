import { supabase } from '../../lib/supabase';
import type { FormState } from '../../components/addCatch/types/types';

/**
 * Skapar en ny catch-post i databasen.
 */
export async function createCatch(form: FormState, userId: string, latitude: number | null, longitude: number | null) {
  const weight = parseFloat(form.weightKg.replace(',', '.'));
  if (isNaN(weight) || weight <= 0) {
    console.error('Invalid weight:', form.weightKg);
    return null;
  }

  const payload = {
    user_id: userId,
    fish_species_id: form.speciesId ? Number(form.speciesId) : null,
    lure_id: form.lureId ? Number(form.lureId) : null,
    weight_kg: weight,
    length_cm: form.lengthCm ? Number(form.lengthCm) : null,
    location_name: form.locationName || null,
    notes: form.notes || null,
    latitude,
    longitude,
    caught_at: form.caughtAt.toISOString(),
  };

  const { data, error } = await supabase.from('catches').insert([payload]).select().single();

  if (error) {
    console.error('createCatch error:', error);
    return null;
  }

  return data;
}

export interface ModalComponentProps {
  onClose: () => void;
}

export interface CatchFormProps {
  onClose: () => void;
}

export interface FormState {
  speciesId: string;
  lureId: number | null;
  lureType: "global" | "custom" | null;
  weightKg: string;
  lengthCm: string;
  locationName: string;
  notes: string;
  caughtAt: Date;
}

export type CatchDraft = {
  speciesId: string;
  lureId: number | null;
  lureType: "global" | "custom" | null;
  weightKg: string;
  lengthCm: string;
  locationName: string;
  notes: string;
  caughtAt: Date;

  latitude: number | null;
  longitude: number | null;

  photos: string[];
};

export interface TripValues {
  trip_name: string;
  startTime: string;
  endTime: string;
  participants: string;
  weather: string;
  temperature: string;
  wind: string;
  water_conditions: string;
  notes: string;
  fishing_method: string;
}

export type CatchItem = {
  id: string;
  speciesId: string;
  species: string;
  weight: string;
  length: string;
  lake: string;
  date: string;
  photos: string[];
  lure: string;
  notes: string;
};

export type SpeciesRow = {
  id: number;
  english_name: string;
};

export type LureRow = {
  name: string;
  brand: string | null;
};

export type CatchRow = {
  id: number;
  weight_kg: number | null;
  length_cm: number | null;
  location_name: string | null;
  caught_at: string | null;
  notes: string | null;

  catch_photos?: { image_url: string }[];

  fish_species: SpeciesRow | SpeciesRow[] | null;
  lures: LureRow | LureRow[] | null;
};

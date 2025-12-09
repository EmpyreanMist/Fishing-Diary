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
  trip_location: string;
  trip_longitude: number | null;
  trip_latitude: number | null;
}

export type TripLocation = {
  latitude: number;
  longitude: number;
  place?: any;
} | null;

export type TripMapFormProps = {
  setTripLocation: (location: TripLocation) => void;
};

export type regionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
export type CatchItem = {
  id: string;
  species: string;
  weight: string;
  length: string;
  lake: string;
  date: string;
  photos: string[];
};

export type CatchRow = {
  id: string;
  user_id: string;
  fish_species_id: number | null;
  weight_kg: number | null;
  length_cm: number | null;
  location_name: string | null;
  caught_at: string | null;
  notes: string | null;
  created_at: string;

  catch_photos?: { image_url: string }[];

  fish_species?: {
    swedish_name: string | null;
    english_name: string | null;
  };
};

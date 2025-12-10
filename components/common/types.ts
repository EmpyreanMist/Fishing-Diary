export interface ModalComponentProps {
  onClose: () => void;
}

export interface CatchFormProps {
  onClose: () => void;
}

export interface FormState {
  speciesId: string;
  lureId: string;
  weightKg: string;
  lengthCm: string;
  locationName: string;
  notes: string;
  caughtAt: Date;
}

export type CatchDraft = {
  speciesId: string;
  lureId: string;
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
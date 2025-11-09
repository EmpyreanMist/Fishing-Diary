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

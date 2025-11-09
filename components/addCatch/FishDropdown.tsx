import { useEffect, useState } from 'react';
import SimpleDropdown from './SimpleDropdown';
import { supabase } from '../../lib/supabase';

interface FishSpecies {
  id: string;
  english_name: string;
  image_url?: string | null;
}

interface FishDropdownProps {
  onSelect: (id: string) => void;
}

export default function FishDropdown({ onSelect }: FishDropdownProps) {
interface FishDropdownProps {
  onSelect: (id: string) => void;
}

export default function FishDropdown({ onSelect }: FishDropdownProps) {
  const [species, setSpecies] = useState<FishSpecies[]>([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data, error } = await supabase
        .from('fish_species')
        .select('*')
        .order('english_name', { ascending: true });

      if (error) console.error('Error fetching species:', error);
      else setSpecies(data);
    };

    fetchSpecies();
  }, []);

  const speciesOptions = species.map((fish) => ({
    label: fish.english_name,
    value: fish.id,
    image: fish.image_url ?? undefined,
  }));

  return (
    <SimpleDropdown
      label="Species:"
      items={[{ label: 'Select species', value: '' }, ...speciesOptions]}
      enableSearch
      placeholder="Search or select fish..."
      onSelect={onSelect}
    />
  );
}

import SimpleDropdown from '../addCatch/SimpleDropdown';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
interface FishingMethod {
  id: number | string;
  name: string | null;
}
export default function FishingMethodDropdown() {
  const [methods, setMethods] = useState<FishingMethod[]>([]);
  useEffect(() => {
    const fetchMethods = async () => {
      const { data, error } = await supabase
        .from('fishing_methods')
        .select('id, name')
        .order('name', { ascending: true });
      if (error) {
        console.error('Error fetching fishing methods:', error);
        return;
      }
      setMethods(data ?? []);
    };
    fetchMethods();
  }, []);
  const methodOptions = methods
    .map((method) => {
      const label = method.name?.trim();
      if (!label) return null;
      return {
        label,
        value: String(method.id),
      };
    })
    .filter(
      (
        option
      ): option is {
        label: string;
        value: string;
      } => option !== null
    );
  return (
    <SimpleDropdown
      label="Fishing method:"
      items={[{ label: 'Select method', value: '' }, ...methodOptions]}
      enableSearch={true}
      placeholder="Search or select method..."
    />
  );
}

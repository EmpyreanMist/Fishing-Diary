import SimpleDropdown from '../addCatch/SimpleDropdown';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
interface FishingMethod {
  id: string;
  method_name: string;
  method_img: string | null;
}
interface FishingMethodDropdownProps {
  onSelect: (id: string) => void;
}

export default function FishingMethodDropdown({onSelect} : FishingMethodDropdownProps) {
  const [fishMethods, setFishMethods] = useState<FishingMethod[]>([]);

  useEffect(() => {
    // method to fetch fising methods
    const fetchMethods = async () => {
      const { data, error } = await supabase.from('fishing_methods').select('id, method_name, method_img');
      /* .order('method_name', { ascending: true }); */

      if (error) {
        console.error('Error fetching fishing methods:', error);
        return;
      }
      setFishMethods(data ?? []);
    };

    //call function
    fetchMethods();
  }, []);

  const methodOptions = fishMethods.map((method) => {
    return {
      label: method.method_name,
      value: method.id,
      image: method.method_img ?? undefined,
    };
  });

  return (
    <SimpleDropdown
      label="Choose fishing method:"
      items={[{ label: 'Choose fishing method:', value: '' }, ...methodOptions]}
      enableSearch={true}
      onSelect={onSelect}
      placeholder="Search or select method..."
    />
  );
}

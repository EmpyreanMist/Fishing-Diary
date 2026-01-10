import { useEffect, useState } from "react";
import SimpleDropdown from "./SimpleDropdown";
import { supabase } from "../../lib/supabase";

interface FishSpecies {
  id: string;
  english_name: string;
  image_url?: string | null;
}

interface FishDropdownProps {
  onSelect: (id: string) => void;
}

export default function FishDropdown({ onSelect }: FishDropdownProps) {
  const [species, setSpecies] = useState<FishSpecies[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSpecies = async (): Promise<void> => {
      const { data, error } = await supabase
        .from("fish_species")
        .select("*")
        .order("english_name", { ascending: true });

      if (!isMounted) return;

      if (error) {
        console.error("Failed to fetch fish species", error);
        setError("Could not load species");
        setSpecies([]);
      } else {
        setSpecies(data ?? []);
      }

      setLoading(false);
    };

    fetchSpecies();

    return () => {
      isMounted = false;
    };
  }, []);

  const speciesOptions = species.map((fish) => ({
    label: fish.english_name,
    value: fish.id,
    image: fish.image_url ?? undefined,
  }));

  if (loading) {
    return <p>Loading species...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <SimpleDropdown
      label="Species:"
      items={[{ label: "Select species", value: "" }, ...speciesOptions]}
      enableSearch
      placeholder="Search or select fish..."
      onSelect={onSelect}
    />
  );
}

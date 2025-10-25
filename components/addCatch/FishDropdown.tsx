import { useEffect, useState } from "react";
import SimpleDropdown from "./SimpleDropdown";
import { supabase } from "../../lib/supabase";

interface FishSpecies {
  id: string;
  english_name: string;
  image_url?: string | null;
}

export default function FishDropdown() {
  const [species, setSpecies] = useState<FishSpecies[]>([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data, error } = await supabase
        .from("fish_species")
        .select("*")
        .order("english_name", { ascending: true });

      if (error) console.error("Error fetching species:", error);
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
      items={[{ label: "Select species", value: "" }, ...speciesOptions]}
      enableSearch={true}
      placeholder="Search or select fish..."
    />
  );
}

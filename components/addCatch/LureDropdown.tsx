import { useEffect, useState } from "react";
import SimpleDropdown from "./SimpleDropdown";
import { supabase } from "../../lib/supabase";

interface Lure {
  id: number;
  name: string;
  brand: string;
  weight_gram: number;
  color: string;
  image_url?: string | null;
}

export default function LureDropdown() {
  const [lures, setLures] = useState<Lure[]>([]);

  useEffect(() => {
    const fetchLures = async () => {
      const { data, error } = await supabase
        .from("lures")
        .select("*")
        .order("name", { ascending: true });
      if (!error && data) setLures(data);
    };
    fetchLures();
  }, []);

  const lureOptions = lures.map((lure) => ({
    label: `${lure.brand} - ${lure.name} – ${lure.weight_gram}g - ${lure.color}`,
    value: lure.id.toString(),
    image: lure.image_url ?? undefined,
  }));

  return (
    <SimpleDropdown
      label="Lure Used:"
      items={[{ label: "Select lure", value: "" }, ...lureOptions]}
      enableSearch={true}
      placeholder="Search or select lure..."
    />
  );
}

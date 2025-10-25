import { useEffect, useState } from "react";
import SimpleDropdown from "./SimpleDropdown";
import { supabase } from "../../lib/supabase";

interface Lure {
  id: number;
  name: string;
  brand: string;
  weight_gram: number;
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
    label: `${lure.name} (${lure.brand}) ${lure.weight_gram}g`,
    value: lure.id.toString(),
    image: lure.image_url ?? undefined,
  }));

  return (
    <SimpleDropdown
      label="Lure Used:"
      items={[{ label: "Select lure", value: "" }, ...lureOptions]}
    />
  );
}

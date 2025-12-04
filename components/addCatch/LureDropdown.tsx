import { useEffect, useState } from "react";
import SimpleDropdown from "./SimpleDropdown";
import { supabase } from "../../lib/supabase";
import AddCustomLureModal from "./AddCustomLureModal";

interface Lure {
  id: number;
  name: string;
  brand: string;
  weight_gram: number;
  color: string;
  image_url?: string | null;
}

interface UserLure extends Lure {
  isCustom: true;
}

interface LureDropdownProps {
  onSelect: (id: string) => void;
}

export default function LureDropdown({ onSelect }: LureDropdownProps) {
  const [globalLures, setGlobalLures] = useState<Lure[]>([]);
  const [customLures, setCustomLures] = useState<UserLure[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // ---- FETCH ALL LURES ----
  const fetchLures = async () => {
    const { data: glob } = await supabase
      .from("lures")
      .select("*")
      .order("name", { ascending: true });

    const { data: custom } = await supabase
      .from("user_lures")
      .select("*")
      .order("name", { ascending: true });

    if (glob) setGlobalLures(glob);
    if (custom) setCustomLures(custom.map((l) => ({ ...l, isCustom: true })));
  };

  // ---- INITIAL LOAD ----
  useEffect(() => {
    fetchLures();
  }, []);

  // ---- REFRESH AFTER CUSTOM LURE WAS ADDED ----
  const refresh = async () => {
    await fetchLures();
  };

  // ---- COMBINED LIST FOR DROPDOWN ----
  const lureOptions = [
    ...customLures.map((lure) => ({
      label: `⭐ ${lure.brand} - ${lure.name} – ${lure.weight_gram}g - ${lure.color}`,
      value: `custom-${lure.id}`,
      image: lure.image_url ?? undefined,
    })),
    ...globalLures.map((lure) => ({
      label: `${lure.brand} - ${lure.name} – ${lure.weight_gram}g - ${lure.color}`,
      value: String(lure.id),
      image: lure.image_url ?? undefined,
    })),
  ];

  return (
    <>
      <SimpleDropdown
        label="Lure Used:"
        items={[{ label: "Select lure", value: "" }, ...lureOptions]}
        enableSearch
        enableAddCustom
        onAddCustom={() => setShowAddModal(true)}
        placeholder="Search or select lure..."
        onSelect={onSelect}
      />

      <AddCustomLureModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreated={refresh}
      />
    </>
  );
}

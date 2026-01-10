import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Marker } from "react-native-maps";

const fishIcon = require("../../assets/images/fish2.png");

type CatchMarker = {
  latitude: number;
  longitude: number;
  weight_kg: number | null;
  fish: {
    english_name: string;
  } | null;
};

type UserCatchMarkersProps = {
  refreshKey?: number;
};

type CatchRow = {
  latitude: number | string | null;
  longitude: number | string | null;
  weight_kg: number | null;
  fish_species: { english_name: string } | { english_name: string }[] | null;
};

export function UserCatchMarkers({ refreshKey }: UserCatchMarkersProps) {
  const [markers, setMarkers] = useState<CatchMarker[]>([]);

  useEffect(() => {
    fetchMarkers();
  }, [refreshKey]);

  async function fetchMarkers(): Promise<void> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("catches")
      .select(
        `
        latitude,
        longitude,
        weight_kg,
        fish_species ( english_name )
      `
      )
      .eq("user_id", user.id)
      .not("latitude", "is", null)
      .not("longitude", "is", null);

    if (error) return;

    const rows: CatchRow[] = data ?? [];
    setMarkers(
      rows.map((row) => {
        const species = Array.isArray(row.fish_species)
          ? row.fish_species[0] ?? null
          : row.fish_species;

        return {
          latitude: Number(row.latitude),
          longitude: Number(row.longitude),
          weight_kg: row.weight_kg,
          fish: species,
        };
      })
    );
  }

  return (
    <>
      {markers.map((m, i) => (
        <Marker
          key={`catch-${i}`}
          coordinate={{ latitude: m.latitude, longitude: m.longitude }}
          title={m.fish?.english_name ?? "Catch"}
          description={`${m.weight_kg ?? "?"} kg`}
          image={fishIcon}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      ))}
    </>
  );
}

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

export function UserCatchMarkers({ refreshKey }: UserCatchMarkersProps) {
  const [markers, setMarkers] = useState<CatchMarker[]>([]);

  useEffect(() => {
    fetchMarkers();
  }, [refreshKey]);

  async function fetchMarkers() {
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

    if (error) return console.log(error);

    setMarkers(
      data.map((row: any) => ({
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
        weight_kg: row.weight_kg,
        fish: row.fish_species,
      }))
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

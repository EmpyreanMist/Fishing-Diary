import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Marker } from "react-native-maps";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CatchMarker = {
  latitude: number;
  longitude: number;
  weight_kg: number | null;
  fish: {
    english_name: string;
  } | null;
};

export function UserCatchMarkers() {
  const [markers, setMarkers] = useState<CatchMarker[]>([]);

  useEffect(() => {
    fetchMarkers();
  }, []);

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

    const formatted = data.map((row: any) => ({
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
      weight_kg: row.weight_kg,
      fish: row.fish_species,
    }));

    setMarkers(formatted);
  }

  return (
    <>
      {markers.map((m, i) => (
        <Marker
          key={`catch-${i}`}
          coordinate={{ latitude: m.latitude, longitude: m.longitude }}
          title={m.fish?.english_name ?? "Catch"}
          description={`${m.weight_kg ?? "?"} kg`}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: 6,
              borderRadius: 20,
            }}
          >
            <Ionicons name="fish" size={25} color="#4CC9F0" />
          </View>
        </Marker>
      ))}
    </>
  );
}

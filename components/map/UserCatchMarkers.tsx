import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Marker } from "react-native-maps";

type LatLng = { latitude: number; longitude: number };

export function UserCatchMarkers() {
  const [markers, setMarkers] = useState<LatLng[]>([]);

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
      .select("latitude, longitude")
      .eq("user_id", user.id)
      .not("latitude", "is", null)
      .not("longitude", "is", null);

    if (error) {
      console.log("Marker fetch error:", error);
      return;
    }

    const coords = data.map((row) => ({
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
    }));

    setMarkers(coords);
  }

  return (
    <>
      {markers.map((m, i) => (
        <Marker key={`catch-${i}`} coordinate={m} pinColor="red" title="Fish" />
      ))}
    </>
  );
}

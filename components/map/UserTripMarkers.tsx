import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { Marker } from "react-native-maps";

const tripIcon = require("../../assets/images/fish-trip.png");

type TripMarker = {
  latitude: number;
  longitude: number;
  title: string | null;
  date: string | null;
};

type UserTripMarkersProps = {
  refreshKey?: number;
};

export function UserTripMarkers({ refreshKey }: UserTripMarkersProps) {
  const [markers, setMarkers] = useState<TripMarker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrips = useCallback(async () => {
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.warn("No user, cannot fetch trips");
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("trip")
      .select("trip_latitude, trip_longitude, trip_name, start_time")
      .eq("user_id", user.id)
      .not("trip_latitude", "is", null)
      .not("trip_longitude", "is", null);

    if (error) {
      console.warn("Trip fetch error:", error.message);
      setIsLoading(false);
      return;
    }

    const formatted = data.map((row: any) => ({
      latitude: Number(row.trip_latitude),
      longitude: Number(row.trip_longitude),
      title: row.trip_name ?? "Fishing Trip",
      date: row.start_time ?? null,
    }));

    setMarkers(formatted);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips, refreshKey]);

  if (!markers.length) return null;

  return (
    <>
      {markers.map((m, i) => (
        <Marker
          key={`trip-${i}`}
          coordinate={{ latitude: m.latitude, longitude: m.longitude }}
          title={m.title ?? "Trip"}
          description={m.date ?? ""}
          image={tripIcon}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      ))}
    </>
  );
}

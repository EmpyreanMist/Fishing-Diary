import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { Marker } from "react-native-maps";

const tripIcon = require("../../assets/images/fish-trip.png");

type TripMarker = {
  latitude: number;
  longitude: number;
  title: string | null;
  date: string | null;
  description: string | null;
};

type UserTripMarkersProps = {
  refreshKey?: number;
};

type TripRow = {
  trip_name: string | null;
  updated_at: string | null;
  trip_latitude: number | string | null;
  trip_longitude: number | string | null;
  catches: { id: number }[] | null;
};

export function UserTripMarkers({ refreshKey }: UserTripMarkersProps) {
  const [markers, setMarkers] = useState<TripMarker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrips = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("trip")
      .select(
        `
        id,
        trip_name,
        updated_at,
        trip_latitude,
        trip_longitude,
        catches:catches(id)
      `
      )
      .eq("user_id", user.id)
      .not("trip_latitude", "is", null)
      .not("trip_longitude", "is", null);

    if (error) {
      console.warn("Trip fetch error:", error.message);
      setIsLoading(false);
      return;
    }

    const rows: TripRow[] = data ?? [];
    const formatted = rows.map((row) => {
      const d = row.updated_at ? new Date(row.updated_at) : null;

      const dateLabel = d
        ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(d.getDate()).padStart(2, "0")}`
        : null;

      const catchCount = Array.isArray(row.catches) ? row.catches.length : 0;

      const descriptionParts = [
        dateLabel,
        catchCount > 0 ? `${catchCount} catches` : null,
      ].filter((value): value is string => Boolean(value));

      return {
        latitude: Number(row.trip_latitude),
        longitude: Number(row.trip_longitude),
        title: row.trip_name ?? "Fishing Trip",
        date: dateLabel,
        description: descriptionParts.join(", "),
      };
    });

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
          description={m.description ?? m.date ?? ""}
          image={tripIcon}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      ))}
    </>
  );
}

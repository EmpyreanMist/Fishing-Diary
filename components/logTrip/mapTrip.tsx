import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { TripLocation, regionType } from "../common/types";
import { UserCatchMarkers } from "../../components/map/UserCatchMarkers";
import { UserTripMarkers } from "../map/UserTripMarkers";

type TripMapFormProps = {
  setTripLocation: (location: TripLocation) => void;
};

const tripIcon = require("../../assets/images/fish-trip.png");

const defaultRegion: regionType = {
  latitude: 59.3293,
  longitude: 18.0686,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function TripMapForm({ setTripLocation }: TripMapFormProps) {
  const [initialRegion, setInitialRegion] = useState<regionType | null>(null);
  const [selected, setSelected] = useState<TripLocation>(null);
  const [isLoadingPlace, setIsLoadingPlace] = useState(false);

  useEffect(() => {
    const loadLocation = async (): Promise<void> => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setInitialRegion(defaultRegion);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch {
        setInitialRegion(defaultRegion);
      }
    };

    loadLocation();
  }, []);

  async function getPlaceName(
    lat: number,
    lon: number
  ): Promise<Location.LocationGeocodedAddress | null> {
    try {
      const [info] = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lon,
      });

      return info ?? null;
    } catch {
      return null;
    }
  }

  return (
    <MapView
      className="rounded-md mx-3"
      style={{ width: "100%", height: 300 }}
      initialRegion={initialRegion || defaultRegion}
      onPress={async (e) => {
        if (isLoadingPlace) return;
        setIsLoadingPlace(true);

        const { latitude, longitude } = e.nativeEvent.coordinate;
        const place = await getPlaceName(latitude, longitude);

        setSelected({
          latitude,
          longitude,
          place,
        });

        setTripLocation({ latitude, longitude, place });
        setIsLoadingPlace(false);
      }}
    >
      <UserCatchMarkers />
      <UserTripMarkers />

      {selected && (
        <Marker
          coordinate={{
            latitude: selected.latitude,
            longitude: selected.longitude,
          }}
          title={
            selected.place?.name || selected.place?.city || "Selected Location"
          }
          description={
            selected.place?.street ??
            (selected.place?.region && selected.place?.country
              ? `${selected.place.region}, ${selected.place.country}`
              : undefined)
          }
          image={tripIcon}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      )}
    </MapView>
  );
}

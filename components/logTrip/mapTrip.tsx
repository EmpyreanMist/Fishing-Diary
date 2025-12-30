import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { TripLocation, regionType } from "../common/types";
import { UserCatchMarkers } from "../../components/map/UserCatchMarkers";

type TripMapFormProps = {
  setTripLocation: (location: TripLocation) => void;
};

export default function TripMapForm({ setTripLocation }: TripMapFormProps) {
  // for initial region
  const [initialRegion, setInitialRegion] = useState<regionType | null>(null);

  const [selected, setSelected] = useState<TripLocation>(null);
  // to prevent multiple taps
  const [isLoadingPlace, setIsLoadingPlace] = useState<boolean>(false);

  // fallback place for intial region
  const defaultRegion = {
    latitude: 59.3293, // Stockholm
    longitude: 18.0686,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Location Permission Denied",
          "Default location set to Sweden"
        );
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
      } catch (error) {
        console.error("Kunde inte hämta plats:", error);
        setInitialRegion(defaultRegion);
      }
    })();
  }, []);

  async function getPlaceName(lat: number, lon: number) {
    try {
      const [info] = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lon,
      });

      return info;
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return null;
    }
  }

  return (
    <MapView
      className="rounded-md mx-3"
      style={{ width: "100%", height: 300 }}
      initialRegion={initialRegion || defaultRegion}
      onPress={async (e) => {
        if (isLoadingPlace) return; // prevent multiple taps
        setIsLoadingPlace(true);

        const { latitude, longitude } = e.nativeEvent.coordinate;
        const place = await getPlaceName(latitude, longitude);

        setSelected({
          latitude,
          longitude,
          place, // innehåller city, region, street osv.
        });

        setTripLocation({ latitude, longitude, place });
        setIsLoadingPlace(false);
      }}
    >
      <UserCatchMarkers />

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
            selected.place?.street ||
            `${selected.place?.region}, ${selected.place?.country}` ||
            undefined
          }
        />
      )}
    </MapView>
  );
}

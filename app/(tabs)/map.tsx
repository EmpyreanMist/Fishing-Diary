import React, { useEffect, useRef, useState } from "react";
import { MapHeader } from "@/components/map/MapHeader";
import { MapPopularSpots } from "@/components/map/MapPopularSpots";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { useNavigation } from "expo-router";
import { places } from "../utils/places/places";
import { UserCatchMarkers } from "../../components/map/UserCatchMarkers";

const INITIAL_REGION = {
  latitude: 60.1282,
  longitude: 18.6435,
  latitudeDelta: 10,
  longitudeDelta: 10,
};

type LatLng = { latitude: number; longitude: number };

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const navigation = useNavigation();

  // 1) Tillfällig marker (max en)
  const [pendingMarker, setPendingMarker] = useState<LatLng | null>(null);

  // 2) Sparade markers (består efter ”Spara”)
  const [savedMarkers, setSavedMarkers] = useState<LatLng[]>([]);

  // Tryck på kartan: ersätt/uppdatera ENDAST den tillfälliga markern
  const handleMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPendingMarker({ latitude, longitude });
  };

  // Spara: flytta från pending -> saved och töm pending
  const handleSave = () => {
    if (!pendingMarker) return;
    setSavedMarkers((prev) => [...prev, pendingMarker]);
    setPendingMarker(null);
  };

  // Avbryt: ta bort tillfällig marker
  const handleCancel = () => setPendingMarker(null);

  // Fokusknapp: centrera på pending om den finns, annars på senast sparad
  const focusMap = () => {
    const target = pendingMarker ?? savedMarkers[savedMarkers.length - 1];
    if (!target) return;
    mapRef.current?.animateCamera(
      { center: target, zoom: 14 },
      { duration: 700 }
    );
  };

  // Visa ”Focus” alltid och ”Spara”/”Avbryt” när en pending finns
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          {pendingMarker && (
            <>
              <TouchableOpacity onPress={handleSave}>
                <View style={{ padding: 10 }}>
                  <Text>Spara</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel}>
                <View style={{ padding: 10 }}>
                  <Text>Avbryt</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={focusMap}>
            <View style={{ padding: 10 }}>
              <Text>Focus</Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, pendingMarker, savedMarkers.length]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <MapHeader />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={INITIAL_REGION}
            showsUserLocation
            showsMyLocationButton
            ref={mapRef}
            // Välj gärna onLongPress om du vill undvika oavsiktliga klick
            onPress={handleMapPress}
          >
            {/* Here we render pins from users catches in database */}
            <UserCatchMarkers />
            {/* Fördefinierade platser */}
            {places.map((marker, index) => (
              <Marker key={`place-${index}`} coordinate={marker} />
            ))}
            {/* EN tillfällig marker (byts ut vid nytt tryck) */}
            {pendingMarker && (
              <Marker
                coordinate={pendingMarker}
                title="Ej sparad"
                description={`${pendingMarker.latitude.toFixed(
                  5
                )}, ${pendingMarker.longitude.toFixed(5)}`}
                pinColor={"orange"} // valfritt: särskilj tillfällig
              />
            )}
            {/* Sparade markers (ligger kvar även efter ny pending) */}
            {savedMarkers.map((m, i) => (
              <Marker
                key={`saved-${i}`}
                coordinate={m}
                title="Sparad plats"
                description={`${m.latitude.toFixed(5)}, ${m.longitude.toFixed(
                  5
                )}`}
              />
            ))}
          </MapView>
        </View>

        <MapPopularSpots />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 40,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: "hidden",
    maxHeight: 300,
    height: "50%",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});

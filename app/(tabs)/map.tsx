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
import { UserCatchMarkers } from "../../components/map/UserCatchMarkers";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { UserTripMarkers } from "@/components/map/UserTripMarkers";

const fishIcon = require("../../assets/images/fish2.png");

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

  const [pendingMarker, setPendingMarker] = useState<LatLng | null>(null);
  const [savedMarkers, setSavedMarkers] = useState<LatLng[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleMapPress = (e: MapPressEvent) => {
    const coord = e.nativeEvent?.coordinate;
    if (!coord) return;
    setPendingMarker(coord);
  };

  const handleSave = () => {
    if (!pendingMarker) return;
    setSavedMarkers((prev) => [...prev, pendingMarker]);
    setPendingMarker(null);
  };

  const handleCancel = () => setPendingMarker(null);

  const focusMap = () => {
    const target = pendingMarker ?? savedMarkers[savedMarkers.length - 1];
    if (!target) return;
    mapRef.current?.animateCamera(
      { center: target, zoom: 14 },
      { duration: 700 }
    );
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setRefreshKey((k) => k + 1);

      const timeout = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(timeout);
    }, [])
  );

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
          {/* 🔹 DARK OVERLAY */}
          {loading && <View style={styles.dimOverlay} />}

          {/* 🔹 SPINNER + TEXT */}
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#5ACCF2" />
              <Text style={styles.loaderText}>Loading map…</Text>
            </View>
          )}

          <MapView
            style={styles.map}
            initialRegion={INITIAL_REGION}
            showsUserLocation
            showsMyLocationButton
            ref={mapRef}
            onPress={handleMapPress}
          >
            <UserCatchMarkers refreshKey={refreshKey} />
            <UserTripMarkers refreshKey={refreshKey} />

            {pendingMarker && (
              <Marker
                coordinate={pendingMarker}
                icon={fishIcon}
                anchor={{ x: 0.5, y: 0.5 }}
              />
            )}

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

  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: "white",
    opacity: 0.9,
  },

  dimOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: 500,
    elevation: 500,
  },

  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 999,
  },
});

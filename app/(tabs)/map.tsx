import React, { useEffect, useRef } from "react";
import { MapHeader } from "@/components/map/MapHeader";
import { MapPopularSpots } from "@/components/map/MapPopularSpots";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "expo-router";
import { places } from "../utils/places/places";

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  //@ts-ignore
  const mapRef = useRef<any>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity /* onPress={focusMap} */>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  /*   const focusMap = () => {
    const GreenBayStadium = {
      latitude: 44.5013,
      longitude: -88.0622,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
  };

  mapRef.current?.animateToRegion(GreenBayStadium); */

  console.log(mapRef);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MapHeader />

        {/* Map component here */}
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
          ref={mapRef}
        >
          {places.map((marker, index) => {
            return <Marker key={index} coordinate={marker} />;
          })}
        </MapView>

        <MapPopularSpots />

        {/* <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          onRegionChangeComplete={onRegionChange}
        ></MapView> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    width: "100%",
    height: "40%",
  },
});

/* import React, { useEffect, useRef } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { markers } from '../assets/markers';

const INITIAL_REGION = {
	latitude: 37.33,
	longitude: -122,
	latitudeDelta: 2,
	longitudeDelta: 2
};

export default function App() {
	const mapRef = useRef<any>(null);
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={focusMap}>
					<View style={{ padding: 10 }}>
						<Text>Focus</Text>
					</View>
				</TouchableOpacity>
			)
		});
	}, []);

	const focusMap = () => {
		const GreenBayStadium = {
			latitude: 44.5013,
			longitude: -88.0622,
			latitudeDelta: 0.1,
			longitudeDelta: 0.1
		};

		mapRef.current?.animateToRegion(GreenBayStadium);
		// mapRef.current?.animateCamera({ center: GreenBayStadium, zoom: 10 }, { duration: 2000 });
	};

	const onMarkerSelected = (marker: any) => {
		Alert.alert(marker.name);
	};

	const calloutPressed = (ev: any) => {
		console.log(ev);
	};

	const onRegionChange = (region: Region) => {
		console.log(region);
	};

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={StyleSheet.absoluteFillObject}
				initialRegion={INITIAL_REGION}
				showsUserLocation
				showsMyLocationButton
				provider={PROVIDER_GOOGLE}
				ref={mapRef}
				onRegionChangeComplete={onRegionChange}
			>
				{markers.map((marker, index) => (
					<Marker
						key={index}
						title={marker.name}
						coordinate={marker}
						onPress={() => onMarkerSelected(marker)}
					>
						<Callout onPress={calloutPressed}>
							<View style={{ padding: 10 }}>
								<Text style={{ fontSize: 24 }}>Hello</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>
		</View>
	);
}

 */

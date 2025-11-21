import { Modal, View, StyleSheet, Pressable, Text } from "react-native";
import MapView, { Marker, MapPressEvent, LatLng } from "react-native-maps";
import { useState } from "react";
import FishMarker from "./FishMarker";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function CatchMapModal({ visible, onClose }: Props) {
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);

  function handleMapPress(e: MapPressEvent) {
    setMarkerPosition(e.nativeEvent.coordinate);
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>

        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: 60.1282,
            longitude: 18.6435,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }}
          onPress={handleMapPress}
        >
          {markerPosition && (
            <Marker coordinate={markerPosition}>
              <FishMarker />
            </Marker>
          )}
        </MapView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    borderRadius: 30,
  },
  closeText: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
  },
});

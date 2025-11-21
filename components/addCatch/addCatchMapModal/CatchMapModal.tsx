import { Modal, View, StyleSheet, Pressable, Text } from "react-native";
import MapView, { Marker, MapPressEvent, LatLng } from "react-native-maps";
import { useState, useEffect } from "react";
import { UserCatchMarkers } from "@/components/map/UserCatchMarkers";
import ActionButton from "../../ui/ActionButton";

const fishIcon = require("../../../assets/images/fish2.png");

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (coords: LatLng | null) => void;
}

export default function CatchMapModal({ visible, onClose, onSave }: Props) {
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);

  function handleMapPress(e: MapPressEvent) {
    setMarkerPosition(e.nativeEvent.coordinate);
  }

  useEffect(() => {
    if (!visible) {
      setMarkerPosition(null);
    }
  }, [visible]);

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
          showsUserLocation
          showsMyLocationButton
          onPress={handleMapPress}
        >
          {markerPosition && (
            <Marker
              coordinate={markerPosition}
              icon={fishIcon}
              anchor={{ x: 0.5, y: 0.5 }}
            />
          )}
          <UserCatchMarkers />
        </MapView>

        {markerPosition && (
          <View style={styles.saveWrapper}>
            <ActionButton
              label="Save"
              color="blue"
              size="md"
              width={125}
              onPress={() => onSave(markerPosition)}
            />
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  saveWrapper: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -62.5 }],
    zIndex: 10,
  },
});

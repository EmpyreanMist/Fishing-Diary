import { Modal, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function CatchMapModal({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 60.1282,
            longitude: 18.6435,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

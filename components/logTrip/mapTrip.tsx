import MapView from 'react-native-maps';

export default function TripMapForm() {
  return (
    <MapView
      className="rounded-md mx-3"
      style={{ width: '100%', height: 300 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}

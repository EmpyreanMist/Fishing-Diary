import { SafeAreaView } from 'react-native-safe-area-context';

import { ScrollView, StyleSheet, View, Text } from 'react-native';
import TripHeader from '@/components/logTrip/TripHeader';

export default function AddTripScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <TripHeader />
      </View>
      <ScrollView>
        <Text style={{ color: 'white', padding: 20, fontSize: 16, lineHeight: 24 }}>
          Here you can plan and log your fishing trips. Start by adding details about your trip, including location, date, and any notes you'd like to remember. Keep track of the fish you catch and the conditions you encounter to improve your fishing experience over time.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A121A',
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  
});

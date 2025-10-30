import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '@/components/profile/Header';
import { FormControl } from '@/components/ui/form-control';
import { LinearGradient } from 'expo-linear-gradient';
import { Heading } from '@/components/ui/heading';
import TripForm from '@/components/logTrip/TripForm';
import { useState } from 'react';
import TripHeader from '@/components/logTrip/TripHeader';

export default function AddTripScreen() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TripHeader /* title="Add Trip" subtitle="Log your fishing trip details" */ />
      </View>
      <ScrollView>
        <FormControl>
          <LinearGradient
            colors={['#0f172a', '#1e293b', '#0f172a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerContainer}
          >
            <Heading style={styles.heading}>Add Trip</Heading>
            <TripForm date={date} setDate={setDate} handleFocus={handleFocus} />
          </LinearGradient>
        </FormControl>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A121A' },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  heading: { color: '#fff' },
});

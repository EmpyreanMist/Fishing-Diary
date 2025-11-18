import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FormControl } from '@/components/ui/form-control';
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
    <>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View className="mb-5">
          <TripHeader />
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <FormControl className="mx-auto w-full p-2">
            <TripForm
              date={date}
              setDate={setDate}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              handleFocus={handleFocus}
            />
          </FormControl>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A121A',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  container: { flex: 1, backgroundColor: '#0A121A' },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  heading: {
    color: '#fff',
    padding: 10,
  },
});

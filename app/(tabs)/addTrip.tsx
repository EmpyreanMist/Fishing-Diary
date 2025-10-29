import { SafeAreaView } from 'react-native-safe-area-context';

import { ScrollView, StyleSheet, View, Text, Platform } from 'react-native';
/* import TripHeader from '@/components/logTrip/TripHeader'; */
import Header from '@/components/profile/Header';
import { Input, InputField } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import { Calendar } from 'lucide-react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTripScreen() {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');

  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const formatted = date
    ? date.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';


  const handleSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        {/* <TripHeader /> */}
        <Header title="Add Trip" subtitle="Log your fishing trip details" />
      </View>
      <ScrollView>
        <FormControl isInvalid={isInvalid} size="md" isDisabled={false} isReadOnly={false} isRequired={true}>
          <VStack className="gap-4">
            <LinearGradient
              colors={['#0f172a', '#1e293b', '#0f172a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerContainer}
            >
              <Heading style={styles.heading}>Add Trip</Heading>
              <Input
                variant="outline"
                size="md"
                isHovered={true}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField placeholder="Trip name..." />
              </Input>
              <Input
                variant="outline"
                size="md"
                isHovered={true}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              {/* here date begins */}
              <Box>
                <Pressable onPress={() => setShowPicker(true)}>
                  <Box pointerEvents="none">
                    <Input size="md">
                      <Icon as={Calendar} />
                      <InputField editable={false} placeholder="Välj datum" value={formatted} />
                    </Input>
                  </Box>
                </Pressable>

                {showPicker && (
                  <DateTimePicker
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    value={date || new Date()}
                    onChange={(event, selectedDate) => {
                      if (Platform.OS !== 'ios') setShowPicker(false);
                      if (selectedDate) setDate(selectedDate);
                    }}
                  />
                )}
              </Box>
              {/* here date ends */}
              <Input
                variant="outline"
                size="md"
                isHovered={true}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
            </LinearGradient>
          </VStack>
        </FormControl>
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
  heading: {
    color: '#FFFFFF',
  },
});

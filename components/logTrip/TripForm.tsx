import { Input, InputField } from '@/components/ui/input';
import DateInput from './DateInput';
import { Text, StyleSheet, View } from 'react-native';
import { Heading } from '../ui/heading';
import TripDivider from './TripDivider';
import { HStack } from '../ui/hstack';
import { Box } from '@/components/ui/box';
import FishingMethodDropdown from './FishingMethodDropdown';
import { Fish } from 'lucide-react-native';
import ActionButton from '../ui/ActionButton';
import { useState } from 'react';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import TripMapForm from './mapTrip';
import { CatchDraft, TripLocation, TripValues } from '../common/types';
import CatchAdded from './CatchAdded';
import handleTripSubmit from './utils/TripSubmit';

interface TripFormProps {
  date: Date | null;
  setDate: (d: Date) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  handleFocus: (field: string) => void;
  onClose: () => void;
  catches: { [key: string]: CatchDraft };
  onAddCatch: () => void;
  removeCatch: (id: string) => void;
}

export default function TripForm({
  date,
  setDate,
  focusedField,
  setFocusedField,
  handleFocus,
  onClose,
  catches,
  onAddCatch,
  removeCatch,
}: TripFormProps) {
  const [tripValues, setTripValues] = useState<TripValues>({
    trip_name: '',
    startTime: '',
    endTime: '',
    participants: '',
    weather: '',
    temperature: '',
    wind: '',
    water_conditions: '',
    notes: '',
    fishing_method: '',
    trip_location: '',
    trip_longitude: null,
    trip_latitude: null,
  });

  function handleTripLocation(location: TripLocation) {
    if (location === null) return;

    const placeName = location.place?.city 
    ?? location.place?.region 
    ?? location.place?.name 
    ?? 'Unknown location';
   
    setTripValues({
      ...tripValues,
      trip_location: placeName,
      trip_longitude: location.longitude,
      trip_latitude: location.latitude,
    });
  }

  return (
    <>
      <View style={[styles.container, { flexDirection: 'column' }]} className="gap-4">
        <View style={{ flexDirection: 'column' }} className="py-2 w-[90%]">
          <Heading style={styles.heading}>Trip Details</Heading>
          <TripDivider />
          <Text className="text-gray-400 text-md mt-1 pl-2">Basic information about your fishing trip</Text>
        </View>

        <Heading className="py-2" style={styles.heading} size="sm">
          Trip name
        </Heading>
        <Input style={[styles.input, focusedField === 'name' && styles.inputFocused]} size="md">
          <InputField
            onChangeText={(text) => setTripValues({ ...tripValues, trip_name: text })}
            placeholder="e.q., Weekend at Lake Superior"
            onFocus={() => handleFocus('name')}
          />
        </Input>

        <Heading className="py-2" style={styles.heading} size="sm">
          Date
        </Heading>
        <DateInput date={date} setDate={setDate} focusedField={focusedField} setFocusedField={setFocusedField} />

        <HStack className="w-full gap-4 py-2" style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box className="flex-1">
            <Heading className="pb-1" style={styles.heading} size="sm">
              Start time
            </Heading>
            <Input style={[styles.input, focusedField === 'startTime' && styles.inputFocused]}>
              <InputField
                onChangeText={(text) => setTripValues({ ...tripValues, startTime: text })}
                placeholder="e.g., 08:00"
                onFocus={() => handleFocus('startTime')}
              />
            </Input>
          </Box>

          <Box className="flex-1">
            <Heading className="pb-1" style={styles.heading} size="sm">
              End time
            </Heading>
            <Input style={[styles.input, focusedField === 'endTime' && styles.inputFocused]}>
              <InputField
                onChangeText={(text) => setTripValues({ ...tripValues, endTime: text })}
                placeholder="e.g., 14:30"
                onFocus={() => handleFocus('endTime')}
              />
            </Input>
          </Box>
        </HStack>

        <FishingMethodDropdown onSelect={(id) => setTripValues({ ...tripValues, fishing_method: id })} />

        <Heading className="py-2" style={styles.heading} size="sm">
          Participants
        </Heading>
        <Input style={[styles.input, focusedField === 'participants' && styles.inputFocused]}>
          <InputField
            value={tripValues.participants}
            onChangeText={(text) => setTripValues({ ...tripValues, participants: text })}
            placeholder="Participants..."
            onFocus={() => handleFocus('participants')}
          />
        </Input>
      </View>

      <View style={[styles.container, { flexDirection: 'column' }]} className="my-5 mx-auto w-full">
        <View style={{ flexDirection: 'column' }} className="py-2 w-[90%]">
          <Heading style={styles.heading}>Weather & Water Conditions</Heading>
          <TripDivider />
          <Text className="text-gray-400 text-md mt-1 pl-2">Environmental Conditions During your Trip</Text>
        </View>

        <Heading className="py-2" style={styles.heading} size="sm">
          Weather Condition
        </Heading>
        <Input style={[styles.input, focusedField === 'weather' && styles.inputFocused]}>
          <InputField
            value={tripValues.weather}
            onChangeText={(text) => setTripValues({ ...tripValues, weather: text })}
            placeholder="Enter Weather Conditions..."
            onFocus={() => handleFocus('weather')}
          />
        </Input>

        <HStack className="w-full gap-4 py-2" style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box className="flex-1">
            <Heading className="py-2" style={styles.heading} size="sm">
              Temperature
            </Heading>
            <Input style={[styles.input, focusedField === 'temperature' && styles.inputFocused]}>
              <InputField
                value={tripValues.temperature?.toString() ?? ''}
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text === '') {
                    setTripValues({ ...tripValues, temperature: '' });
                    return;
                  }
                  if (/^-?\d*(\.\d*)?$/.test(text)) {
                    const num = parseFloat(text);
                    if (!isNaN(num) && num >= -273) {
                      setTripValues({ ...tripValues, temperature: text });
                    }
                  }
                }}
                onFocus={() => handleFocus('temperature')}
              />
            </Input>
          </Box>

          <Box className="flex-1">
            <Heading className="py-2" style={styles.heading} size="sm">
              Wind Condition
            </Heading>
            <Input style={[styles.input, focusedField === 'wind' && styles.inputFocused]}>
              <InputField
                value={tripValues.wind}
                onChangeText={(text) => setTripValues({ ...tripValues, wind: text })}
                onFocus={() => handleFocus('wind')}
              />
            </Input>
          </Box>
        </HStack>

        <Heading className="py-2" style={styles.heading} size="sm">
          Water Condition
        </Heading>
        <Input style={[styles.input, focusedField === 'water_conditions' && styles.inputFocused]}>
          <InputField
            value={tripValues.water_conditions}
            onChangeText={(text) => setTripValues({ ...tripValues, water_conditions: text })}
            placeholder="Enter Water Conditions..."
            onFocus={() => handleFocus('water_conditions')}
          />
        </Input>
      </View>

      <View style={[styles.container, { flexDirection: 'column' }]} className="my-5 mx-auto w-full">
        <HStack className="gap-10">
          <Box className="flex-1 pl-2">
            <HStack className="items-center space-x-2">
              <Fish size={20} color="#5ACCF2" />
              <Heading style={styles.heading} className="text-xl font-bold">
                Catches
              </Heading>
            </HStack>
            <TripDivider />
            <Text className="text-gray-400 text-sm mt-1">Log all fish caught during this trip</Text>
          </Box>

          <Box className="justify-center pr-2">
            <ActionButton label="Add Catch" icon="add" color="blue" size="sm" onPress={onAddCatch} />
          </Box>
        </HStack>

        {Object.keys(catches).length === 0 ? (
          <View style={{ flexDirection: 'column' }} className="items-center justify-center py-10 mx-auto space-y-2">
            <Fish size={40} color="#6B7280" />
            <Text style={{ color: '#6B7280', fontSize: 16, fontWeight: '600' }}>No catches logged yet</Text>
            <Text style={{ color: '#9CA3AF', fontSize: 14 }}>Click `&quotAdd Catch`` to record your fish</Text>
          </View>
        ) : (
          <>
            {Object.entries(catches).map(([id, catchData]) => (
              <CatchAdded key={id} catchData={catchData} onDelete={() => removeCatch(id)} />
            ))}
          </>
        )}
      </View>

      <View style={[styles.container, { flexDirection: 'column' }]} className="py-2">
        <Heading style={styles.heading} className="pl-2">
          Additional Notes
        </Heading>
        <TripDivider />
        <Text className="text-gray-400 text-md mt-1 pl-2">Any other observations or memorable moments</Text>
        <Textarea style={[styles.input, focusedField === 'other' && styles.inputFocused]}>
          <TextareaInput
            onChangeText={(text) => setTripValues({ ...tripValues, notes: text })}
            onFocus={() => handleFocus('other')}
            placeholder="Your text goes here..."
          />
        </Textarea>
      </View>

      <View style={[styles.container, { flexDirection: 'column' }]} className="mt-5">
        <Heading style={styles.heading}>Select Location</Heading>
        <TripDivider />
        <Text className="text-gray-400 text-md mt-1 pl-2">Tap on the map to select your fishing spot</Text>
        <Box className="pt-2">
          <TripMapForm setTripLocation={handleTripLocation} />
        </Box>
      </View>

      <HStack className="w-full py-4 mt-5" space="lg">
        <Box className="w-1/2 flex-1">
          <ActionButton label="Cancel" color="black" size="md" onPress={onClose} />
        </Box>
        <Box className="w-1/2">
          <ActionButton
            label="Save trip"
            color="blue"
            size="md"
            onPress={async () => {
              await handleTripSubmit(catches, tripValues);
              onClose();
            }}
          />
        </Box>
      </HStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121B22',
    borderColor: '#1F2937',
    borderWidth: 1,
    borderRadius: 16,
  },
  heading: {
    color: '#fff',
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 8,
  },
  inputFocused: {
    borderColor: '#5ACCF2',
  },
});

// TODO: implement validation and error handling for input fields§
// TODO: fix date picker to show selected date
// TODO: fix time inputs to use time picker component
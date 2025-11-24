import { VStack } from '@/components/ui/vstack';
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

import CatchAdded from './CatchAdded';

interface TripFormProps {
  date: Date | null;
  setDate: (d: Date) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  handleFocus: (field: string) => void;
  onClose: () => void;
}

export default function TripForm({
  date,
  setDate,
  focusedField,
  setFocusedField,
  handleFocus,
  onClose,
}: TripFormProps) {
  const [catchesLogged, setCatchesLogged] = useState<number>(0);
  console.log('Catches logged:', catchesLogged);

  return (
    <>
      <VStack style={styles.container} className="gap-4">
        <VStack className="py-2 w-[90%]">
          <Heading style={styles.heading}>Trip Details</Heading>
          <TripDivider />
          <Text className="text-gray-400 text-md mt-1 pl-2">Basic information about your fishing trip</Text>
        </VStack>
        <Heading className="py-2" style={styles.heading} size="sm">
          Trip name
        </Heading>
        <Input style={[styles.input, focusedField === 'name' && styles.inputFocused]} size="md">
          <InputField placeholder="e.q., Weekend at Lake Superior" onFocus={() => handleFocus('name')} />
        </Input>

        <Heading className="py-2" style={styles.heading} size="sm">
          Date
        </Heading>
        <DateInput date={date} setDate={setDate} focusedField={focusedField} setFocusedField={setFocusedField} />

        {/* Choose time row start*/}
        {/* TODO: Should maybe in the future be changed to a time picker */}
        <HStack className="w-full gap-4 py-2" style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box className="flex-1">
            <Heading className="pb-1" style={styles.heading} size="sm">
              Start time
            </Heading>
            <Input style={[styles.input, focusedField === 'startTime' && styles.inputFocused]} size="md">
              <InputField placeholder="e.g., 08:00" onFocus={() => handleFocus('startTime')} />
            </Input>
          </Box>

          <Box className="flex-1">
            <Heading className="pb-1" style={styles.heading} size="sm">
              End time
            </Heading>
            <Input style={[styles.input, focusedField === 'endTime' && styles.inputFocused]} size="md">
              <InputField placeholder="e.g., 14:30" onFocus={() => handleFocus('endTime')} />
            </Input>
          </Box>
        </HStack>
        {/* Choose time row end */}

        <FishingMethodDropdown />

        <Heading className="py-2" style={styles.heading} size="sm">
          Participants
        </Heading>
        <Input style={[styles.input, focusedField === 'participants' && styles.inputFocused]} size="md">
          <InputField placeholder="Participants..." onFocus={() => handleFocus('participants')} />
        </Input>
      </VStack>

      <VStack style={styles.container} className="my-5 mx-auto w-full">
        <VStack className="py-2 w-[90%]">
          <Heading style={styles.heading}>Weather & Water Conditions</Heading>
          <TripDivider />
          <Text className="text-gray-400 text-md mt-1 pl-2">Environmental Conditions During your Trip</Text>
        </VStack>
        <Heading className="py-2" style={styles.heading} size="sm">
          Weather Condition
        </Heading>
        <Input
          style={[styles.input, focusedField === 'weather' && styles.inputFocused]}
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Enter Weather Conditions..." onFocus={() => handleFocus('weather')} />
        </Input>

        <HStack className="w-full gap-4 py-2" style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box className="flex-1">
            <Heading className="py-2" style={styles.heading} size="sm">
              Temperature
            </Heading>
            <Input
              style={[styles.input, focusedField === 'temperature' && styles.inputFocused]}
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField placeholder="Enter Text here..." onFocus={() => handleFocus('temperature')} />
            </Input>
          </Box>
          <Box className="flex-1">
            <Heading className="py-2" style={styles.heading} size="sm">
              Wind Condition
            </Heading>
            <Input
              style={[styles.input, focusedField === 'wind' && styles.inputFocused]}
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField placeholder="Enter Text here..." onFocus={() => handleFocus('wind')} />
            </Input>
          </Box>
        </HStack>

        <Heading className="py-2" style={styles.heading} size="sm">
          Water Condition
        </Heading>
        <Input
          style={[styles.input, focusedField === 'water-conditions' && styles.inputFocused]}
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Enter Text here..." onFocus={() => handleFocus('water-conditions')} />
        </Input>
      </VStack>

      <VStack style={styles.container} className="my-5 mx-auto w-full">
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
            <ActionButton
              label="Add Catch"
              icon="add"
              color="blue"
              size="sm"
              onPress={() => setCatchesLogged(catchesLogged + 1)}
            />
            {/* This should change depending on catches logged or not */}
          </Box>
        </HStack>
        {catchesLogged === 0 ? (
          <VStack className="items-center justify-center py-10 mx-auto space-y-2">
            <Fish size={40} color="#6B7280" /> {/* Grå ikon */}
            <Text style={{ color: '#6B7280', fontSize: 16, fontWeight: '600' }}>No catches logged yet</Text>
            <Text style={{ color: '#9CA3AF', fontSize: 14 }}>Click &quot;Add Catch&quot; to record your fish</Text>
          </VStack>
        ) : (
          /* TODO: Fix catches module */
          <>
            <>
              {Array.from({ length: catchesLogged }).map((_, i) => (
                <CatchAdded key={i} />
              ))}
            </>
          </>
        )}
      </VStack>

      <VStack style={styles.container} className="py-2">
        <Heading style={styles.heading} className="pl-2">
          Additional Notes
        </Heading>
        <TripDivider />
        <Text className="text-gray-400 text-md mt-1 pl-2">Any other observations or memorable moments</Text>
        <Textarea
          style={[styles.input, focusedField === 'other' && styles.inputFocused]}
          className="mt-2 w-full px-2"
          size="md"
          isReadOnly={false}
          isInvalid={false}
          isDisabled={false}
        >
          <TextareaInput onFocus={() => handleFocus('other')} placeholder="Your text goes here..." />
        </Textarea>
      </VStack>
      {/* Map goes here */}
      <View style={styles.container} className="mt-5">
        <Heading style={styles.heading}>Select Location</Heading>
        <TripDivider />
        <Text className="text-gray-400 text-md mt-1 pl-2">Tap on the map to select your fishing spot</Text>
        <Box className="pt-2 border-solid outline-2">
          <TripMapForm />
        </Box>
      </View>
      {/* End of map */}
      <HStack className="w-full py-4 mt-5" space="lg">
        <Box className="w-1/2 flex-1">
          <ActionButton label="Cancel" color="black" size="md" onPress={onClose} /> {/* TODO: THis needs to be fixed */}
        </Box>
        <Box className="w-1/2">
          <ActionButton label="Save trip" color="blue" size="md" />
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
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
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
  fish: {
    paddingLeft: 5,
  },
  catchHeading: {
    padding: 10,
  },
});

import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import { LinearGradient } from 'expo-linear-gradient';
import DateInput from './DateInput';
import { StyleSheet } from 'react-native';
import { Heading } from '../ui/heading';
import TripDivider from './TripDivider';
import { HStack } from '../ui/hstack';
import { Box } from '@/components/ui/box';
import FishingMethodDropdown from './FishingMethodDropdown';
import { B } from '@expo/html-elements';

interface TripFormProps {
  date: Date | null;
  setDate: (d: Date) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  handleFocus: (field: string) => void;
}

export default function TripForm({ date, setDate, focusedField, setFocusedField, handleFocus }: TripFormProps) {
  return (
    <>
      <VStack className="gap-4">
        <LinearGradient
          colors={['#0f172a', '#1e293b', '#0f172a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerContainer}
        >
          <VStack className="py-2 w-[90%]">
            <Heading style={styles.heading}>Trip Details</Heading>
            <TripDivider />
            <Heading style={styles.heading} size="sm">
              Basic information about your fishing trip
            </Heading>
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
        </LinearGradient>
      </VStack>

      <VStack className="my-5 mx-auto w-full">
        <LinearGradient
          colors={['#0f172a', '#1e293b', '#0f172a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerContainer}
        >
          <VStack className="py-2 w-[90%]">
            <Heading style={styles.heading}>Weather & Water Conditions</Heading>
            <TripDivider />
            <Heading style={styles.heading} size="sm">
              Environmental Conditions During your Trip
            </Heading>
          </VStack>
          <Heading className="py-2" style={styles.heading} size="sm">
            Weather Condition
          </Heading>
          <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
            <InputField placeholder="Enter Weather Conditions..." />
          </Input>

          <HStack className="w-full gap-4 py-2" style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box className="flex-1">
              <Heading className="py-2" style={styles.heading} size="sm">
                Temperature
              </Heading>
              <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                <InputField placeholder="Enter Text here..." />
              </Input>
            </Box>
            <Box className="flex-1">
              <Heading className="py-2" style={styles.heading} size="sm">
                Wind Condition
              </Heading>
              <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                <InputField placeholder="Enter Text here..." />
              </Input>
            </Box>
          </HStack>

          <Heading className="py-2" style={styles.heading} size="sm">
            Water Condition
          </Heading>
          <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
            <InputField placeholder="Enter Text here..." />
          </Input>
        </LinearGradient>
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
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
});

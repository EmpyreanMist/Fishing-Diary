import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import DateInput from './DateInput';
import { StyleSheet } from 'react-native';

interface TripFormProps {
  date: Date | null;
  setDate: (d: Date) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  handleFocus: (field: string) => void;
}

export default function TripForm({ date, setDate, focusedField, setFocusedField, handleFocus }: TripFormProps) {
  return (
    <VStack className="gap-4">
      <Input style={[styles.input, focusedField === 'name' && styles.inputFocused]} size="md">
        <InputField placeholder="Trip name..." onFocus={() => handleFocus('name')} />
      </Input>

      <Input style={[styles.input, focusedField === 'notes' && styles.inputFocused]} size="md">
        <InputField placeholder="Notes..." onFocus={() => handleFocus('notes')} />
      </Input>

      <DateInput date={date} setDate={setDate} focusedField={focusedField} setFocusedField={setFocusedField} />

      <Input style={[styles.input, focusedField === 'location' && styles.inputFocused]} size="md">
        <InputField placeholder="Location..." onFocus={() => handleFocus('location')} />
      </Input>
    </VStack>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 8,
  },
  inputFocused: {
    borderColor: '#5ACCF2',
  },
});

import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Input, InputField } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Calendar } from 'lucide-react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface DateInputProps {
  date: Date | null;
  setDate: (d: Date) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

export default function DateInput({ date, setDate, focusedField, setFocusedField }: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);

  const formatted = date
    ? date.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  // close picker if focus changes
  useEffect(() => {
    if (focusedField !== 'date' && showPicker) {
      setShowPicker(false);
    }
  }, [focusedField]);

  // handle date change
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      // Android cancel
      setShowPicker(false);
      setFocusedField(null);
      return;
    }

    if (selectedDate) {
      setDate(selectedDate);
    }

    // if android close picker efter val
    if (Platform.OS === 'android') {
      setShowPicker(false);
      setFocusedField(null);
    }
  };

  return (
    <Box>
      <Pressable
        onPress={() => {
          setShowPicker(true);
          setFocusedField('date');
        }}
      >
        <Box pointerEvents="none">
          <Input style={[styles.input, focusedField === 'date' && styles.inputFocused]} size="md">
            <Icon as={Calendar} />
            <InputField editable={false} placeholder="Välj datum" value={formatted} />
          </Input>
        </Box>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          value={date || new Date()}
          locale="sv-SE"
          onChange={handleChange}
        />
      )}
    </Box>
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

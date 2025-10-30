import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Input, InputField } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateInputProps {
    date: Date | null;
    setDate: (d: Date) => void;
    focusedField: string | null;
    setFocusedField: (field: string | null) => void;
}
export default function DateInput({ date, setDate, focusedField, setFocusedField }: DateInputProps) {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const formatted = date ? date.toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '';

  useEffect(() => {
    if (focusedField !== 'date' && showPicker) {
      setShowPicker(false);
    }
  }, [focusedField]);

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
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          value={date || new Date()}
          onChange={(event, selectedDate) => {
            if (event.type === 'dismissed') {
              setShowPicker(false);
              setFocusedField(null);
              return;
            }
            if (selectedDate) setDate(selectedDate);
            setShowPicker(false);
            setFocusedField(null);
          }}
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

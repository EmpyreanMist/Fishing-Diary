import { useState } from 'react';
import { Platform } from 'react-native';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Input, InputField } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateInput({ date, setDate }: { date: Date | null; setDate: (d: Date) => void }) {
  const [showPicker, setShowPicker] = useState(false);

  const formatted = date ? date.toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '';

  return (
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
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          value={date || new Date()}
          onChange={(event, selectedDate) => {
            if (event.type === 'dismissed') {
              setShowPicker(false);
              return;
            }
            if (selectedDate) setDate(selectedDate);
            setShowPicker(false);
          }}
        />
      )}
    </Box>
  );
}

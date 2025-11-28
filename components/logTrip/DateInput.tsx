import { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Input, InputField } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Calendar } from 'lucide-react-native';
import DatePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

interface DateInputProps {
  date: Date | null;
  setDate: (d: Date) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

export default function DateInput({ date, setDate, focusedField, setFocusedField }: DateInputProps) {
  const [open, setOpen] = useState(false);

  const formatted = date
    ? date.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  // close picker if focus changes
  useEffect(() => {
    if (focusedField !== 'date' && open) {
      setOpen(false);
    }
  }, [focusedField]);

  const handleSelect = (d: any) => {
    if (!d) return;
    const jsDate = d.toDate(); // Dayjs → JS Date
    setDate(jsDate);
  };

  return (
    <Box>
      <Pressable
        onPress={() => {
          setOpen(true);
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

      {/* Overlay + DatePicker modal */}
      {open && (
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <DatePicker
              mode="single"
              date={dayjs(date || new Date())}
              onChange={handleSelect}
              locale="sv"
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setOpen(false);
                setFocusedField(null);
              }}
            >
              <Text style={styles.closeText}>Klar</Text>
            </TouchableOpacity>
          </View>
        </View>
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

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },

  modal: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    width: '85%',
  },

  closeButton: {
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: '#334155',
    borderRadius: 8,
    alignItems: 'center',
  },

  closeText: {
    color: 'white',
    fontSize: 16,
  },
});

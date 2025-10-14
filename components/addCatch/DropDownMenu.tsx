import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function DropDownMenu() {
  const [selected, setSelected] = useState<string>('');

  const data = [
    { key: '1', value: 'UX Research' },
    { key: '2', value: 'Web Development' },
    { key: '3', value: 'Cross Platform Development Process' },
    { key: '4', value: 'UI Designing', disabled: true },
    { key: '5', value: 'Backend Development' },
  ];

  return (
    <SelectList
      data={data}
      setSelected={setSelected}
      search={false}
      placeholder="Select fish Species"
      arrowicon={<FontAwesome name="chevron-down" size={12} color="#444" />}
      boxStyles={styles.box}
      inputStyles={styles.input}
      dropdownStyles={styles.dropdown}
      dropdownTextStyles={styles.dropdownText}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    // Viktigt för lagerordning
    zIndex: 20, // iOS
    elevation: 5, // Android
  },
  input: {
    color: '#222',
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    // Gör att listan lägger sig över omgivningen och inte klipps
    position: 'absolute',
    zIndex: 9999, // iOS
    elevation: 10, // Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  dropdownText: {
    color: '#222',
    fontSize: 14,
  },
});

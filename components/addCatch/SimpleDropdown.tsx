import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface DropdownItem {
  label: string;
  value: string;
}

interface SimpleDropdownProps {
  label: string;
  items: DropdownItem[];
}

export default function SimpleDropdown({ label, items }: SimpleDropdownProps) {
  const [selectedValue, setSelectedValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSelect = (val: string) => {
    setSelectedValue(val);
    if (Platform.OS === "ios") setIsVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.dropdownLabel}>{label}</Text>

      {Platform.OS === "android" ? (
        <View
          style={[styles.dropdownContainer, focused && styles.inputFocused]}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleSelect}
            style={styles.picker}
            dropdownIconColor="#fff"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            {items.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.fakeInput, focused && styles.inputFocused]}
            onPress={() => setIsVisible(true)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <Text style={styles.fakeInputText}>
              {selectedValue || items[0]?.label || "Select..."}
            </Text>
          </TouchableOpacity>

          <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.modalBackdrop}>
              <View style={styles.modalContent}>
                <View style={styles.doneRow}>
                  <TouchableOpacity onPress={() => setIsVisible(false)}>
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>

                <Picker
                  selectedValue={selectedValue}
                  onValueChange={handleSelect}
                  style={styles.iosPicker}
                >
                  {items.map((item) => (
                    <Picker.Item
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginTop: 10,
  },
  dropdownLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 6,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 8,
    backgroundColor: "#0A121A",
    height: 48,
    justifyContent: "center",
  },
  picker: {
    color: "#98A6B3",
    fontSize: 16,
    height: 48,
    width: "100%",
  },
  fakeInput: {
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 8,
    backgroundColor: "#0A121A",
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  fakeInputText: {
    color: "#98A6B3",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#5ACCF2",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1E293B",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 40,
  },
  doneRow: {
    alignItems: "flex-end",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#475569",
  },
  doneText: { color: "#5ACCF2", fontSize: 18, fontWeight: "600" },
  iosPicker: {
    color: "#fff",
    height: 180,
  },
});

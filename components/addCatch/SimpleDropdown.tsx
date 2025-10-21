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

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      {/* Android: riktig dropdown */}
      {Platform.OS === "android" ? (
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(val) => setSelectedValue(val)}
            style={styles.picker}
            dropdownIconColor="#fff"
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
        /* iOS: Fake input + modal */
        <>
          <TouchableOpacity
            style={styles.fakeInput}
            activeOpacity={0.8}
            onPress={() => setIsVisible(true)}
          >
            <Text style={styles.fakeInputText}>
              {selectedValue ? selectedValue : items[0]?.label || "Select..."}
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
                  onValueChange={(val) => setSelectedValue(val)}
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

      {selectedValue ? (
        <Text style={styles.result}>Selected: {selectedValue}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
    alignSelf: "flex-start",
    marginLeft: "10%",
  },
  dropdownContainer: {
    width: "80%",
    backgroundColor: "#1E293B",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#475569",
    overflow: "hidden",
  },
  picker: {
    color: "#fff",
    fontSize: 18,
    height: 60,
    width: "100%",
  },
  fakeInput: {
    width: "80%",
    backgroundColor: "#1E293B",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#475569",
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  fakeInputText: {
    color: "#fff",
    fontSize: 18,
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
  result: {
    color: "#5ACCF2",
    marginTop: 20,
    fontSize: 16,
  },
});

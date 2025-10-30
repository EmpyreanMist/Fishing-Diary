import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from "react-native";

interface DropdownItem {
  label: string;
  value: string;
  image?: string;
}

interface SimpleDropdownProps {
  label: string;
  items: DropdownItem[];
}

export default function SimpleDropdown({ label, items }: SimpleDropdownProps) {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    setIsVisible(false);
    setFocused(false);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.dropdownLabel}>{label}</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.input, focused && styles.inputFocused]}
        onPress={() => {
          setIsVisible(true);
          setFocused(true);
        }}
      >
        <View style={styles.fakeInputRow}>
          <Text style={styles.fakeInputText}>
            {selectedItem ? selectedItem.label : items[0]?.label || "Select..."}
          </Text>
          {selectedItem?.image && (
            <Image
              source={{ uri: selectedItem.image }}
              style={styles.selectedThumb}
            />
          )}
        </View>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsVisible(false);
          setFocused(false);
        }}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.doneRow}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  setFocused(false);
                }}
              >
                <Text style={styles.doneText}>Close</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={styles.optionThumb}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 8,
    backgroundColor: "#0A121A",
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  inputFocused: {
    borderColor: "#5ACCF2",
  },
  fakeInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fakeInputText: {
    color: "#98A6B3",
    fontSize: 16,
  },
  selectedThumb: {
    width: 32,
    height: 32,
    borderRadius: 6,
    resizeMode: "cover",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    width: "85%",
    maxHeight: "70%",
    padding: 10,
  },
  doneRow: {
    alignItems: "flex-end",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#475569",
  },
  doneText: { color: "#5ACCF2", fontSize: 16, fontWeight: "600" },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    flexShrink: 1,
    marginRight: 10,
  },
  optionThumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    resizeMode: "cover",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import LureRowSelectable from "./LureRowSelectable";
import LureRow from "./LureRow";

interface DropdownItem {
  label: string;
  value: string; 
  image?: string;
}

interface SimpleDropdownProps {
  label: string;
  items: DropdownItem[];

  customLures?: any[];
  refresh?: () => void;
  enableSearch?: boolean;
  placeholder?: string;
  onSelect?: (value: string) => void;
  enableAddCustom?: boolean;
  onAddCustom?: () => void;
  forceOpen?: boolean;
  onForceOpenHandled?: () => void;
}

export default function SimpleDropdown({
  label,
  items,
  customLures,
  refresh,
  enableSearch = false,
  placeholder = "Select...",
  onSelect,
  enableAddCustom,
  onAddCustom,
  forceOpen,
  onForceOpenHandled,
}: SimpleDropdownProps) {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (forceOpen) {
      setIsVisible(true);
      onForceOpenHandled?.();
    }
  }, [forceOpen, onForceOpenHandled]);

  const filteredItems = enableSearch
    ? items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    setIsVisible(false);
    setSearchQuery("");
    onSelect?.(item.value);
  };

  const supportsCustomLures = Array.isArray(customLures) && typeof refresh === "function";

  return (
    <View style={styles.wrapper}>
      <Text style={styles.dropdownLabel}>{label}</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.input}
        onPress={() => setIsVisible(true)}
      >
        <View style={styles.fakeInputRow}>
          <Text
            style={[styles.fakeInputText, { flexShrink: 1, marginRight: 8 }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedItem ? selectedItem.label : placeholder}
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
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.doneRow}>
              {enableAddCustom && onAddCustom ? (
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(false);
                    setTimeout(() => onAddCustom(), 10);
                  }}
                >
                  <Text style={styles.doneText}>Add Lure</Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}

              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text style={styles.doneText}>Close</Text>
              </TouchableOpacity>
            </View>

            {enableSearch && (
              <TextInput
                placeholder="Search..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
              />
            )}

            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                if (
                  supportsCustomLures &&
                  typeof item.value === "string" &&
                  item.value.startsWith("custom-")
                ) {
                  const lureId = Number(item.value.replace("custom-", ""));
                  const lure = customLures!.find((l: any) => l.id === lureId);
                  if (!lure) return null;

                  return (
                    <LureRow
                      lure={lure}
                      refresh={refresh!}
                      onPress={() => handleSelect(item)}
                    />
                  );
                }

                return (
                  <LureRowSelectable
                    label={item.label}
                    image={item.image}
                    onPress={() => handleSelect(item)}
                  />
                );
              }}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#475569",
  },
  doneText: { color: "#5ACCF2", fontSize: 16, fontWeight: "600" },
  searchInput: {
    backgroundColor: "#0A121A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    color: "#fff",
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 40,
  },
});

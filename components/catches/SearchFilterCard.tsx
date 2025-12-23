import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Input, InputField } from "@/components/ui/input";
import { Search } from "lucide-react-native";
import SimpleDropdown from "../addCatch/SimpleDropdown";
import { LinearGradient } from "expo-linear-gradient";

type DropdownItem = {
  label: string;
  value: string;
};

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  speciesOptions: DropdownItem[];
  onSpeciesChange: (value: string) => void;
  sortOptions: DropdownItem[];
  onSortChange: (value: string) => void;
};

export default function SearchFilterCard({
  query,
  onQueryChange,
  speciesOptions,
  onSpeciesChange,
  sortOptions,
  onSortChange,
}: Props) {
  return (
    <Card
      style={{
        backgroundColor: "transparent",
        borderColor: "#1F2937",
        borderWidth: 1,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <LinearGradient
        colors={["#1A2732", "#0E141B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.cardHeader}>
        <Icon as={Search} color="#5ACCF2" size="sm" />
        <Text style={styles.cardTitle}>Search & Filter</Text>
      </View>

      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 12 }}>
          <Input
            style={{
              borderColor: "#1F2937",
              borderWidth: 1,
              borderRadius: 12,
              backgroundColor: "#0E141B",
            }}
          >
            <Icon as={Search} color="#9CA3AF" style={{ marginLeft: 12 }} />
            <InputField
              placeholder="Search by species or location..."
              placeholderTextColor="#6B7280"
              value={query}
              onChangeText={onQueryChange}
              style={{
                color: "white",
                paddingVertical: 10,
                paddingHorizontal: 8,
              }}
            />
          </Input>
        </View>

        <View style={styles.dropdownRow}>
          <View style={{ flex: 1 }}>
            <SimpleDropdown
              label="Species"
              items={speciesOptions}
              onSelect={onSpeciesChange}
            />
          </View>

          <View style={{ flex: 1 }}>
            <SimpleDropdown
              label="Sort by"
              items={sortOptions}
              onSelect={onSortChange}
            />
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomColor: "#1F2937",
    borderBottomWidth: 1,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  dropdownRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
});

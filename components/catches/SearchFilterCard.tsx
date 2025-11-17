import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Input, InputField } from "@/components/ui/input";
import { Search } from "lucide-react-native";
import SimpleDropdown from "../addCatch/SimpleDropdown";

export default function SearchFilterCard() {
  return (
    <Card
      style={{
        backgroundColor: "#121B22",
        borderColor: "#1F2937",
        borderWidth: 1,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
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
              backgroundColor: "transparent",
            }}
          >
            <Icon as={Search} color="#9CA3AF" style={{ marginLeft: 12 }} />
            <InputField
              placeholder="Search by species or location..."
              placeholderTextColor="#6B7280"
              style={{ color: "white", paddingVertical: 10, paddingHorizontal: 8 }}
            />
          </Input>
        </View>

  
        <View style={styles.dropdownRow}>
          <View style={{ flex: 1 }}>
            <SimpleDropdown
              label="Species"
              items={[
                { label: "All species", value: "" },  // no value means no filter
                { label: "Pike", value: "pike" },
                { label: "Perch", value: "perch" },
                { label: "Trout", value: "trout" },
              ]}
            />
          </View>

          <View style={{ flex: 1 }}>
            <SimpleDropdown
              label="Sort by"
              items={[
                { label: "Date (newest)", value: "date_desc" },
                { label: "Date (oldest)", value: "date_asc" },
                { label: "Weight (heaviest)", value: "weight_desc" },
                { label: "Weight (lightest)", value: "weight_asc" },
              ]}
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

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Input, InputField } from "@/components/ui/input";
import { Search } from "lucide-react-native";

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

  
        <View style={styles.pillsRow}>
          <TouchableOpacity style={styles.pill}>
            <Text style={styles.pillText}>All Species</Text>
            <Text style={styles.pillCaret}>▾</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pill}>
            <Text style={styles.pillText}>Date (newest)</Text>
            <Text style={styles.pillCaret}>▾</Text>
          </TouchableOpacity>
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
  pillsRow: {
    flexDirection: "row",
    gap: 12,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#121B22",
    flex: 1,
  },
  pillText: {
    color: "#D1D5DB",
    fontSize: 14,
  },
  pillCaret: {
    color: "#9CA3AF",
    marginLeft: 8,
    fontSize: 12,
  },
});

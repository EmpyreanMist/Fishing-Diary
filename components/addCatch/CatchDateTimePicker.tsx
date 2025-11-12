import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "../ui/ActionButton";

interface Props {
  value: Date;
  onChange: (date: Date) => void;
}

export default function CatchDateTimePicker({ value, onChange }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  /* When user picks a date, we only update the date part then open the time picker instead */
  const handleDateChange = (_: any, selectedDate?: Date) => {
    if (!selectedDate) {
      setShowDatePicker(false);
      return;
    }

    const newDate = new Date(value);
    newDate.setFullYear(selectedDate.getFullYear());
    newDate.setMonth(selectedDate.getMonth());
    newDate.setDate(selectedDate.getDate());
    onChange(newDate);

    setShowDatePicker(false);
    // Seems like we need a small delay before opening the time picker on Android, otherwise it becomes a bad loop
    setTimeout(() => setShowTimePicker(true), 150);
  };

  /* When user picks a time we update the hours and minutes part */
  const handleTimeChange = (_: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (!selectedTime) return;

    const newDate = new Date(value);
    newDate.setHours(selectedTime.getHours());
    newDate.setMinutes(selectedTime.getMinutes());
    onChange(newDate);
  };

  /* This is where we set the catch time to "now" */
  const handleUseNow = () => {
    const now = new Date();
    onChange(now);
  };

  return (
    <View style={styles.container}>
      {/* Here we open the date picker */}
      <TouchableOpacity
        style={styles.inputButton}
        activeOpacity={0.8}
        onPress={() => setShowDatePicker(true)}
      >
        <Ionicons name="calendar-outline" size={18} color="white" />
        <Text style={styles.inputText}>
          {value.toLocaleDateString()}{" "}
          {value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </TouchableOpacity>

      <ActionButton
        label="Now"
        icon="time-outline"
        color="blue"
        size="lg"
        onPress={handleUseNow}
      />

      {showDatePicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={value}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#475569",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  inputText: {
    color: "#E5E7EB",
    fontSize: 14,
    marginLeft: 8,
  },
});

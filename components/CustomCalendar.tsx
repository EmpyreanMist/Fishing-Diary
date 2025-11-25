import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  value: Date;
  onSelect: (date: Date) => void;
}

const svMonths = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
];

const svWeekdays = ["må", "ti", "on", "to", "fr", "lö", "sö"];

export default function CustomCalendar({ value, onSelect }: Props) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(value.getFullYear(), value.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // För att generera dagarna i månaden + padding
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Gör måndag = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isSelected = (day: number) =>
    value.getFullYear() === year &&
    value.getMonth() === month &&
    value.getDate() === day;

  return (
    <View style={styles.container}>
      {/* HEADER MED MÅNAD + PILAR */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setCurrentMonth(new Date(year, month - 1, 1))}
        >
          <Text style={styles.navButton}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.monthText}>
          {svMonths[month]} {year}
        </Text>

        <TouchableOpacity
          onPress={() => setCurrentMonth(new Date(year, month + 1, 1))}
        >
          <Text style={styles.navButton}>›</Text>
        </TouchableOpacity>
      </View>

      {/* VECKODAGAR */}
      <View style={styles.weekRow}>
        {svWeekdays.map((d) => (
          <Text key={d} style={styles.weekdayText}>
            {d}
          </Text>
        ))}
      </View>

      {/* DAGAR */}
      <View style={styles.daysGrid}>
        {days.map((day, i) => {
          if (day === null) return <View key={i} style={styles.dayCell} />;

          const selected = isSelected(day);

          return (
            <TouchableOpacity
              key={i}
              style={[styles.dayCell, selected && styles.selectedDay]}
              onPress={() => onSelect(new Date(year, month, day))}
            >
              <Text
                style={[styles.dayText, selected && styles.selectedDayText]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  navButton: {
    color: "white",
    fontSize: 26,
    paddingHorizontal: 10,
  },
  monthText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekdayText: {
    flexBasis: `${100 / 7}%`,
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 14,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    flexBasis: `${100 / 7}%`,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },

  dayText: {
    color: "white",
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: "#5ACCF2",
    borderRadius: 8,
  },
  selectedDayText: {
    color: "#1E293B",
    fontWeight: "700",
  },
});

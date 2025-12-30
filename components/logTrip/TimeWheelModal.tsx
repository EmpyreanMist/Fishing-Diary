// TimeWheelModal.tsx
import React, { useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "../ui/ActionButton";

type Props = {
  title?: string; // t.ex. "Start time" / "End time"
  value: string; // "HH:mm" (eller "" om inget valt än)
  onChange: (time: string) => void;
  open: boolean;
  onClose: () => void;
};

const pad2 = (n: number) => n.toString().padStart(2, "0");

const parseTime = (value: string) => {
  // förväntar "HH:mm"
  const match = /^(\d{1,2}):(\d{1,2})$/.exec(value.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (Number.isNaN(h) || Number.isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59)
    return null;
  return { h, m };
};

export default function TimeWheelModal({
  title = "Select Time",
  value,
  onChange,
  open,
  onClose,
}: Props) {
  const hours = useMemo(() => [...Array(24).keys()], []);
  const minutes = useMemo(() => [...Array(60).keys()], []);

  const parsed = parseTime(value);
  const selectedHour = parsed?.h ?? new Date().getHours();
  const selectedMinute = parsed?.m ?? new Date().getMinutes();

  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalDark}>
          <TouchableOpacity style={styles.closeIconButton} onPress={onClose}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>

          <View style={styles.wheelContainer}>
            {/* HOURS */}
            <View style={styles.wheel}>
              <Text style={styles.wheelLabel}>Hour</Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                snapToInterval={36}
                decelerationRate="fast"
                contentContainerStyle={{ paddingVertical: 40 }}
                style={styles.wheelScroll}
              >
                {hours.map((h) => {
                  const selected = h === selectedHour;
                  return (
                    <TouchableOpacity
                      key={h}
                      onPress={() =>
                        onChange(`${pad2(h)}:${pad2(selectedMinute)}`)
                      }
                      style={[
                        styles.wheelItem,
                        selected && styles.wheelItemSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.wheelText,
                          selected && styles.wheelTextSelected,
                        ]}
                      >
                        {pad2(h)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* MINUTES */}
            <View style={styles.wheel}>
              <Text style={styles.wheelLabel}>Minute</Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                snapToInterval={36}
                decelerationRate="fast"
                contentContainerStyle={{ paddingVertical: 40 }}
                style={styles.wheelScroll}
              >
                {minutes.map((m) => {
                  const selected = m === selectedMinute;
                  return (
                    <TouchableOpacity
                      key={m}
                      onPress={() =>
                        onChange(`${pad2(selectedHour)}:${pad2(m)}`)
                      }
                      style={[
                        styles.wheelItem,
                        selected && styles.wheelItemSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.wheelText,
                          selected && styles.wheelTextSelected,
                        ]}
                      >
                        {pad2(m)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          <ActionButton
            label="Done"
            color="blue"
            size="lg"
            icon="checkmark"
            width="100%"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalDark: {
    width: "85%",
    backgroundColor: "#1E293B",
    padding: 20,
    paddingTop: 30,
    borderRadius: 16,
    alignItems: "center",
    position: "relative",
  },

  closeIconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
    borderRadius: 20,
    zIndex: 999,
  },

  title: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
  },

  wheelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },

  wheel: {
    flex: 1,
    alignItems: "center",
  },

  wheelScroll: {
    height: 180,
    width: "100%",
  },

  wheelLabel: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },

  wheelItem: {
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  wheelItemSelected: {
    backgroundColor: "#475569",
    borderRadius: 8,
  },

  wheelText: {
    color: "white",
    fontSize: 16,
  },

  wheelTextSelected: {
    color: "#5ACCF2",
    fontWeight: "600",
  },
});

import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsCard() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Ionicons name="settings-outline" size={20} color="#f1f5f9" />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.settingRow}>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>Dark Mode</Text>
          <Text style={styles.settingSubtitle}>Switch to dark theme</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? "#00C6FF" : "#f4f4f5"}
          trackColor={{ false: "#334155", true: "#0072FF" }}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.settingRow}>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>Notifications</Text>
          <Text style={styles.settingSubtitle}>
            Get notified about your fishing progress
          </Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          thumbColor={notifications ? "#00C6FF" : "#f4f4f5"}
          trackColor={{ false: "#334155", true: "#0072FF" }}
        />
      </View>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.privacyButton} activeOpacity={0.8}>
        <Ionicons name="shield-checkmark-outline" size={18} color="#f1f5f9" />
        <Text style={styles.privacyText}>Privacy & Security</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "600",
  },
  settingSubtitle: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    marginVertical: 12,
  },
  privacyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: "center",
    marginTop: 8,
  },
  privacyText: {
    color: "#f1f5f9",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});

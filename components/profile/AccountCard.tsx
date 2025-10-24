import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function AccountCard() {
  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <View style={styles.card}>
      {/* Header */}
      <Text style={styles.headerTitle}>Account</Text>

      {/* Sign Out Button */}
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
        activeOpacity={0.85}
      >
        <Ionicons name="log-out-outline" size={18} color="#fff" />
        <Text style={styles.signOutText}>Sign Out</Text>
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
  headerTitle: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc5c5c",
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    gap: 8,
  },
  signOutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

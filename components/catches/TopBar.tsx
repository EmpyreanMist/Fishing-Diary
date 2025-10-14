import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fish } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActionButton from "@/components/ui/ActionButton";

type Props = {
  subtitle?: string;
};

/**
 * Renders the gradient top header for the catches screen, including an icon, title, action button, and subtitle.
 *
 * @param subtitle - Subtitle text displayed below the title; defaults to "4 catches logged"
 * @returns A JSX element containing the gradient top bar with title, icon, action button, and subtitle
 */
export default function TopBar({ subtitle = "4 catches logged"}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#2F7D71", "#2E6F83"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.topbar, { paddingTop: insets.top + 20 }]}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Fish size={28} color="white" />
          <Text style={styles.title}>My Catches</Text>
        </View>

        <ActionButton
          label="Add Catch"
          icon="add"
          color="transparent"
          size="md"
          onPress={() => {}}
        />
      </View>

      <Text style={styles.subtitleTop}>{subtitle}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topbar: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  subtitleTop: {
    marginTop: 6,
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
  },
});
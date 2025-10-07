import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { ComponentProps } from "react";

type Props = {
  label: string;
  icon?: ComponentProps<typeof Ionicons>["name"];
  color?: "blue" | "green" | "black";
  size?: "sm" | "md" | "lg";
  onPress?: () => void;
};

export default function ActionButton({
  label,
  icon,
  color = "blue",
  size = "md",
  onPress,
}: Props) {
  // 🎨 Gradient colors
  const gradients: Record<string, [string, string]> = {
    blue: ["#0072FF", "#00C6FF"],
    green: ["#2E8B57", "#4CAF50"],
    black: ["#1A1A1A", "#1A1A1A"],
  };

  // 📏 Sizes
  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 14, fontSize: 14, icon: 18 },
    md: { paddingVertical: 10, paddingHorizontal: 18, fontSize: 15, icon: 20 },
    lg: { paddingVertical: 12, paddingHorizontal: 22, fontSize: 17, icon: 22 },
  };

  const current = sizes[size] || sizes.md;
  const colors = gradients[color] || gradients.blue;

  const isDark = color === "black";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.button}
    >
      {isDark ? (
        <View
          style={[
            styles.darkButton,
            {
              paddingVertical: current.paddingVertical,
              paddingHorizontal: current.paddingHorizontal,
            },
          ]}
        >
          {icon && (
            <Ionicons
              name={icon}
              size={current.icon}
              color="white"
              style={{ marginBottom: 4 }}
            />
          )}
          <Text style={[styles.text, { fontSize: current.fontSize }]}>
            {label}
          </Text>
        </View>
      ) : (
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradient,
            {
              paddingVertical: current.paddingVertical,
              paddingHorizontal: current.paddingHorizontal,
            },
          ]}
        >
          <View style={styles.content}>
            {icon && (
              <Ionicons
                name={icon}
                size={current.icon}
                color="white"
                style={{ marginRight: 6 }}
              />
            )}
            <Text style={[styles.text, { fontSize: current.fontSize }]}>
              {label}
            </Text>
          </View>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  gradient: {
    borderRadius: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  darkButton: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#333",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});

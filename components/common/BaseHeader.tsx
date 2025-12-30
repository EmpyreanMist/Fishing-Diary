import React from "react";
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { icons } from "lucide-react-native";

export const HEADER_THEMES = {
  dark: ["#0f172a", "#1e293b", "#0f172a"],
  green: ["#2F7D71", "#2E6F83"],
  blue: ["#0072FF", "#00C6FF"],
} as const;

type HeaderTheme = keyof typeof HEADER_THEMES;

type BaseHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: string;
  theme?: HeaderTheme;
  action?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function BaseHeader({
  title,
  subtitle,
  icon,
  theme = "blue",
  action,
  children,
  style,
}: BaseHeaderProps) {
  const insets = useSafeAreaInsets();
  const iconElement = getIconElement(icon);

  return (
    <LinearGradient
      colors={HEADER_THEMES[theme]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.header, { paddingTop: insets.top }, style]}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          {iconElement}
          <Text
            style={[styles.title, iconElement ? styles.titleWithIcon : null]}
          >
            {title}
          </Text>
        </View>
        {action ? <View style={styles.action}>{action}</View> : null}
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </LinearGradient>
  );
}

function getIconElement(icon?: string) {
  if (!icon) return null;

  if (icon in Ionicons.glyphMap) {
    return (
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={26}
        color="#fff"
      />
    );
  }

  const LucideIcon = icons[icon as keyof typeof icons];
  if (LucideIcon) {
    return <LucideIcon size={26} color="#fff" />;
  }

  return null;
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 140,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  titleWithIcon: {
    marginLeft: 8,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
  },
  action: {
    marginLeft: 16,
  },
});

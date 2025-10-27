import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function Header({
  title,
  subtitle,
  icon = "person-circle-outline",
}: HeaderProps) {
  return (
    <LinearGradient
      colors={["#0f172a", "#1e293b", "#0f172a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerContainer}
    >
      <View style={styles.textContainer}>
        <View style={styles.iconTitleRow}>
          <Ionicons name={icon} size={28} color="#38bdf8" style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  textContainer: {
    flexDirection: "column",
  },
  iconTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 4,
  },
});

import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BaseHeader } from "@/components/common/BaseHeader";
import ProfileCard from "@/components/profile/ProfileCard";
import SettingsCard from "@/components/profile/SettingsCard";
import AccountCard from "@/components/profile/AccountCard";
import { useAuth } from "@/providers/AuthProvider";

export default function ProfileScreen() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <BaseHeader
          title="Profile"
          subtitle="Manage your account and preferences"
          icon="person-circle-outline"
          theme="dark"
        />

        <View style={styles.content}>
          <ProfileCard />
          <SettingsCard />
          <AccountCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#0A121A",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});

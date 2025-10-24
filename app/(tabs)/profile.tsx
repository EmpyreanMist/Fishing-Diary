import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import Account from "@/components/Account";
import Auth from "@/components/Auth";
import Header from "@/components/profile/Header";
import ProfileCard from "@/components/profile/ProfileCard";

export default function ProfileScreen() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title="Profile"
          subtitle="Manage your account and preferences"
        />

        <View style={styles.content}>
          {session && session.user ? (
            <>
              <Account session={session} />
              <ProfileCard />
            </>
          ) : (
            <>
              <Text style={styles.title}>Log in to see your profile</Text>
              <Auth />
            </>
          )}
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
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#f1f5f9",
    marginTop: 32,
    textAlign: "center",
  },
});

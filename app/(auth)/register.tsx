import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import ActionButton from "@/components/ui/ActionButton";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleRegister() {
    setMessage(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setMessage(error.message);
    else if (!data.session) setMessage("Check your inbox for verification!");

    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create Account 🎣</Text>
          <Text style={styles.subtitle}>
            Start logging your fishing adventures
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {loading ? (
            <ActivityIndicator color="#38bdf8" style={{ marginTop: 16 }} />
          ) : (
            <ActionButton
              label="Sign Up"
              icon="person-add-outline"
              color="green"
              size="lg"
              onPress={handleRegister}
              width="100%"
              disabled={!email || !password}
            />
          )}

          {message && <Text style={styles.message}>{message}</Text>}

          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.switchText}>
                Already have an account? Log in
              </Text>
            </TouchableOpacity>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  switchText: {
    color: "#38bdf8",
    marginTop: 24,
    textAlign: "center",
    fontSize: 15,
  },
  message: {
    color: "#facc15",
    marginTop: 12,
    textAlign: "center",
  },
});

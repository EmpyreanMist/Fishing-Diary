import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionButton from "../../components/ui/ActionButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
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
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Log in to continue your Fishing Diary
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
              label="Log In"
              icon="log-in-outline"
              color="blue"
              size="lg"
              onPress={handleLogin}
              width="100%"
              disabled={!email.trim() || !password.trim() || loading}
            />
          )}

          {error && <Text style={styles.error}>{error}</Text>}

          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.switchText}>
                Don't have an account? Register
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
  button: {
    backgroundColor: "#38bdf8",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  switchText: {
    color: "#38bdf8",
    marginTop: 24,
    textAlign: "center",
    fontSize: 15,
  },
  error: {
    color: "#ef4444",
    marginTop: 12,
    textAlign: "center",
  },
});

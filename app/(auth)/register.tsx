import { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { supabase } from "@/lib/supabase";
import { Link, router } from "expo-router";
import ActionButton from "@/components/ui/ActionButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const isValid =
    first.trim().length > 1 &&
    last.trim().length > 1 &&
    phone.trim().length >= 6 &&
    email.includes("@") &&
    password.length >= 6;

  async function handleRegister() {
    if (!isValid) return;

    setMessage(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: first.trim(),
          last_name: last.trim(),
          phone_number: phone.trim(),
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created — log in to continue.");

    setTimeout(() => {
      router.push("/(auth)/login");
    }, 800);
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Start logging your fishing adventures
          </Text>

          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor="#94a3b8"
            value={first}
            onChangeText={setFirst}
          />

          <TextInput
            style={styles.input}
            placeholder="Last name"
            placeholderTextColor="#94a3b8"
            value={last}
            onChangeText={setLast}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="#94a3b8"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

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
              disabled={!isValid}
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
    marginTop: 14,
    textAlign: "center",
    color: "#facc15",
  },
});

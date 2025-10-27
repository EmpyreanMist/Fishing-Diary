import React, { useState } from "react";
import {
  View,
  Text,
  AppState,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../lib/supabase";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react-native";

const gradients: Record<string, [string, string]> = {
  blue: ["#0072FF", "#00C6FF"],
  green: ["#2E8B57", "#4CAF50"],
  black: ["#1A1A1A", "#1A1A1A"],
  transparent: ["rgba(255,255,255,0.15)", "rgba(255,255,255,0.15)"],
};

// Hantera Supabase auto-refresh av sessionen
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function signInWithEmail() {
    setMessage(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setMessage(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setMessage(null);
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
    } else if (!session) {
      setMessage("Please check your inbox for email verification!");
    }

    setLoading(false);
  }

  return (
    <View className="w-full bg-[#111827] p-5 rounded-2xl mt-6 border border-slate-800">
      {/* E-postfält */}
      <FormControl className="mb-5">
        <FormControlLabel>
          <FormControlLabelText className="text-slate-300 text-sm mb-2">
            Email
          </FormControlLabelText>
        </FormControlLabel>
        <Input className="h-14 rounded-xl border border-slate-700 bg-slate-900">
          <InputSlot>
            <InputIcon as={Mail} className="text-slate-400" />
          </InputSlot>
          <InputField
            placeholder="email@address.com"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            className="text-slate-100 text-base"
          />
        </Input>
      </FormControl>

      {/* Lösenordfält */}
      <FormControl className="mb-6">
        <FormControlLabel>
          <FormControlLabelText className="text-slate-300 text-sm mb-2">
            Password
          </FormControlLabelText>
        </FormControlLabel>
        <Input className="h-14 rounded-xl border border-slate-700 bg-slate-900">
          <InputSlot>
            <InputIcon as={Lock} className="text-slate-400" />
          </InputSlot>
          <InputField
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            className="text-slate-100 text-base"
          />
        </Input>
      </FormControl>

      {/* Knappar */}
      {loading ? (
        <View className="h-14 mt-4 justify-center items-center rounded-xl bg-slate-700">
          <ActivityIndicator color="white" />
        </View>
      ) : (
        <>
          {/* Sign In Button */}
          <TouchableOpacity onPress={signInWithEmail} activeOpacity={0.9}>
            <LinearGradient
              colors={gradients.blue}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="h-14 rounded-xl mt-4 justify-center items-center shadow-lg shadow-blue-900/30"
            >
              <Text className="text-white text-base font-semibold">
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity onPress={signUpWithEmail} activeOpacity={0.9}>
            <LinearGradient
              colors={gradients.blue}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="h-14 rounded-xl mt-3 justify-center items-center shadow-lg shadow-blue-900/30"
            >
              <Text className="text-white text-base font-semibold">
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}

      {/* Felmeddelande */}
      {message && (
        <View className="mt-4 bg-red-500/20 p-3 rounded-xl border border-red-400/40">
          <Text className="text-red-400 text-center">{message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

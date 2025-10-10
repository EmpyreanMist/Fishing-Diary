import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { AppState, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";

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
  const [message, setMessage] = useState<string | null>(null); // 🔥 för feedback

  async function signInWithEmail() {
    setMessage(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    setMessage(null);
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
    } else if (!session) {
      setMessage("Please check your inbox for email verification!");
    }

    setLoading(false);
  }

  return (
    <View className="flex-1 justify-center px-6 bg-slate-900">
      {/* E-postfält */}
      <FormControl className="mb-5">
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input variant="outline" size="md">
          <InputSlot>
            <InputIcon as={Mail} className="text-slate-400" />
          </InputSlot>
          <InputField
            placeholder="email@address.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </Input>
      </FormControl>

      {/* Lösenordsfält */}
      <FormControl className="mb-6">
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input variant="outline" size="md">
          <InputSlot>
            <InputIcon as={Lock} className="text-slate-400" />
          </InputSlot>
          <InputField
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </Input>
      </FormControl>

      {/* Knappar */}
      {loading ? (
        <Button className="bg-blue-600 mt-4" isDisabled>
          <ButtonSpinner color="white" />
        </Button>
      ) : (
        <>
          <Button className="bg-blue-600 mt-4" onPress={signInWithEmail}>
            <ButtonText>Sign In</ButtonText>
          </Button>

          <Button className="bg-indigo-500 mt-3" onPress={signUpWithEmail}>
            <ButtonText>Sign Up</ButtonText>
          </Button>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

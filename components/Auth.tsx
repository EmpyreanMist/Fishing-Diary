import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
 import { Mail, Lock } from "lucide-react-native";

import React, { useState } from "react";
import { Alert, AppState, StyleSheet, View } from "react-native";
import { supabase } from "../lib/supabase";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
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

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
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
            <InputIcon
            as={Mail} className="text-slate-400" />
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
            <InputIcon
             as={Lock} className="text-slate-400" />
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

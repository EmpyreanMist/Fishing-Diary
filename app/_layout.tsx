// app/_layout.tsx
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { supabase } from '@/lib/supabase';
import Auth from '@/components/Auth';
import Account from '@/components/Account';
import { Session } from '@supabase/supabase-js';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import '@/global.css';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {session && session.user ? (
          <Stack>
            {/* Ditt huvudflöde för inloggade användare */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        ) : (
          // Visa Auth-skärmen om ingen session
          <View style={{ flex: 1 }}>
            <Auth />
          </View>
        )}
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

import React, { useEffect } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { supabase } from '@/lib/supabase';
import { AppState } from 'react-native';
import { useUserSelector } from '@/store/useUser';
import { checkUser } from './(farmer)/db_calls/checkUser';

SplashScreen.preventAutoHideAsync();

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const RootLayout = () => {
  const setUser = useUserSelector((state) => state.setUser);
  const resetUser = useUserSelector((state) => state.resetUser);

  const promiseCheckUser = async () => {
    const hasUser = await checkUser();
    if (hasUser) setUser(hasUser);
    else resetUser();
  };

  useEffect(() => {
    promiseCheckUser();
  }, []);

  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf')
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(update-password)" options={{ headerShown: false }} />
      <Stack.Screen name="(farmer)" options={{ headerShown: false }} />
      <Stack.Screen name="(entrepreneur)" options={{ headerShown: false }} />
      <Stack.Screen name="(rider)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

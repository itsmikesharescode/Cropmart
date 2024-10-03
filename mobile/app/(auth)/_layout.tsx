import { supabase } from '@/lib/supabase';
import { useUserSelector } from '@/store/useUser';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { ToastAndroid } from 'react-native';

const AuthLayout = () => {
  const userState = useUserSelector((state) => state.userState);

  //check roles if has auth
  const checkUser = async () => {
    if (!userState) return;
    if (userState.role) {
      const { role } = userState.user_metadata;
      if (role === 'Rider') router.replace('/(rider)/(tabs)/home');
      if (role === 'Farmer') router.replace('/(farmer)/(tabs)/home');
      if (role === 'Entrepreneur') router.replace('/(entrepreneur)/(tabs)/home');
      if (role === 'Admin') {
        await supabase.auth.signOut();
        ToastAndroid.show('Admin not allowed please use the web.', ToastAndroid.LONG);
        router.replace('/');
      }
      return;
    }
    return;
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;

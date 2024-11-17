import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

const ProfileSettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileSettingsLayout;

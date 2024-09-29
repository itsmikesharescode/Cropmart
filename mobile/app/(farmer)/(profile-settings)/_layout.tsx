import { Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const ProfileSettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="profile-settings" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileSettingsLayout;

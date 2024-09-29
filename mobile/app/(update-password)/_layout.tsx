import { StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const UpdatePasswordScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="verify-code" options={{ headerShown: false }} />
      <Stack.Screen name="update-password" options={{ headerShown: false }} />
    </Stack>
  );
};

export default UpdatePasswordScreen;

const styles = StyleSheet.create({});

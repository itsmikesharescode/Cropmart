import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const ProfileTransactionLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="transactions" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileTransactionLayout;

const styles = StyleSheet.create({});

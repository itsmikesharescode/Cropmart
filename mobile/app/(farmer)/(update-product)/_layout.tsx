import { Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const UpdateProductLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="update-product" options={{ headerShown: false }} />
    </Stack>
  );
};

export default UpdateProductLayout;

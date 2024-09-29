import { Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const ShipmentLayoutScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="shipment" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ShipmentLayoutScreen;

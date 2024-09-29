import { Text, View } from 'react-native';
import { Stack } from 'expo-router';

const CartCheckoutLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CartCheckoutLayout;

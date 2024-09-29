import { Stack } from 'expo-router';

const ShipmentsDetailsLayoutScreen = () => {
	return (
		<Stack>
			<Stack.Screen name="details" options={{ headerShown: false }} />
		</Stack>
	);
};

export default ShipmentsDetailsLayoutScreen;

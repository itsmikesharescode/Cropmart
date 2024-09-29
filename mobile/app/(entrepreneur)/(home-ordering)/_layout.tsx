import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

const OrderingLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="ordering" options={{ headerShown: false }} />
		</Stack>
	);
};

export default OrderingLayout;

const styles = StyleSheet.create({});

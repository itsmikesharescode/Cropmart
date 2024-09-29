import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as ExpoLocation from 'expo-location';

interface AddressType {
	street: string | null;
	city: string | null;
	region: string | null;
	country: string | null;
	postalCode: string | null;
}

const LocationGrabber = () => {
	const [location, setLocation] = useState<ExpoLocation.LocationObject | null>(null);
	const [address, setAddress] = useState<AddressType | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const getLocationAndAddress = async (): Promise<void> => {
		let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		}

		try {
			let location = await ExpoLocation.getCurrentPositionAsync({});
			setLocation(location);

			let addressResponse = await ExpoLocation.reverseGeocodeAsync({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			});

			if (addressResponse.length > 0) {
				setAddress(addressResponse[0] as AddressType);
			}
		} catch (error) {
			setErrorMsg('Error fetching location or address');
		}
	};

	return <View></View>;
};

export default LocationGrabber;

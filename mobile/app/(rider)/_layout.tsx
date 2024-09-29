import { router, Stack } from 'expo-router';
import { useProcessingsSelector } from './_store/processingStore';
import { getRiderLayoutQ } from './db_calls/layoutQ';
import { useUserSelector } from '@/store/useUser';
import { useEffect } from 'react';
import { useStatusSelector } from './_store/statusStore';

const RiderLayoutScreen = () => {
	const userState = useUserSelector((state) => state.userState);

	const setProcessings = useProcessingsSelector((state) => state.setProcessings);
	const resetProcessings = useProcessingsSelector((state) => state.resetProcessings);

	const setStatus = useStatusSelector((state) => state.setStatus);
	const resetStatus = useStatusSelector((state) => state.resetStatus);

	//get rider layout once has auth visited
	const promiseLayoutQ = async () => {
		const res = await getRiderLayoutQ();
		setProcessings(res?.processings ?? []);
		setStatus(res?.status ?? []);
	};

	useEffect(() => {
		if (!userState) {
			resetProcessings();
			resetStatus();
			return router.replace('/');
		}
		promiseLayoutQ();
	}, []);

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="(home-shipment)" options={{ headerShown: false }} />
			<Stack.Screen name="(profile-settings)" options={{ headerShown: false }} />
			<Stack.Screen name="(shipments-details)" options={{ headerShown: false }} />
		</Stack>
	);
};

export default RiderLayoutScreen;

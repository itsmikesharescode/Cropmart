import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useUserSelector } from '@/store/useUser';
import { getEntrepreneurLayoutQ } from './db_calls/layoutQ';
import { useProductsSelector } from './_store/productStore';
import { useCategorySelector } from './_store/categoryStore';
import { useCartSelector } from './_store/cartStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EntrepLayoutQ } from '@/lib/db_types/entrepLayoutQ.types';
import { useBookmarksSelector } from './_store/bookmarkStore';
import { useProcessingsSelector } from './_store/processingStore';
import { UserMetaDataType } from '@/lib/db_types/user.types';

const EntrepreneurLayoutScreen = () => {
	const userState = useUserSelector((state) => state.userState);

	const setProducts = useProductsSelector((state) => state.setProducts);
	const resetProducts = useProductsSelector((state) => state.resetProducts);

	const setCategories = useCategorySelector((state) => state.setCategories);
	const resetCategories = useCategorySelector((state) => state.resetCategories);

	const setBookmarks = useBookmarksSelector((state) => state.setBookmarks);
	const resetBookmarks = useBookmarksSelector((state) => state.resetBookmarks);

	const setProcessings = useProcessingsSelector((state) => state.setProcessings);
	const resetProcessings = useProcessingsSelector((state) => state.resetProcessings);

	const setCart = useCartSelector((state) => state.setCart);
	const resetCart = useCartSelector((state) => state.resetCart);

	const getAsyncStorage = async () => {
		type Cart = EntrepLayoutQ['products'][number] & {
			clientQuantity: number;
			buyer: UserMetaDataType;
		};

		if (!userState) return;

		try {
			const asyncStoreVal = await AsyncStorage.getItem(userState.id);
			if (asyncStoreVal) {
				const parseValue = JSON.parse(asyncStoreVal) as Cart[];
				setCart(parseValue);
			} else setCart([]);
		} catch (error) {
			console.error('Error retrieving data:', error);
		}
	};

	const promiseLayoutQ = async () => {
		const res = await getEntrepreneurLayoutQ();
		setProcessings(res?.processings ?? []);
		setProducts(res?.products ?? []);
		setCategories(res?.categories ?? []);
		setBookmarks(res?.bookmarks ?? []);
	};

	//root loading here
	useEffect(() => {
		if (!userState) {
			resetProcessings();
			resetBookmarks();
			resetProducts();
			resetCategories();
			resetCart();
			return router.replace('/');
		}
		promiseLayoutQ();
		getAsyncStorage();
	}, []);

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="(home-categories)" options={{ headerShown: false }} />
			<Stack.Screen name="(home-ordering)" options={{ headerShown: false }} />
			<Stack.Screen name="(cart-checkout)" options={{ headerShown: false }} />
			<Stack.Screen name="(profile-settings)" options={{ headerShown: false }} />
			<Stack.Screen name="(profile-transactions)" options={{ headerShown: false }} />
		</Stack>
	);
};

export default EntrepreneurLayoutScreen;

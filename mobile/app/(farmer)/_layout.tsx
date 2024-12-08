import { router, Stack } from 'expo-router';
import { useUserSelector } from '@/store/useUser';
import { useProductsSelector } from './_store/productStore';
import { getFarmerLayoutQ } from './db_calls/layoutQ';
import { useEffect } from 'react';
import { useProcessingsSelector } from './_store/processingStore';
import { useCategorySelector } from './_store/categoryStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const FarmerScreenLayout = () => {
  const userState = useUserSelector((state) => state.userState);
  const setProducts = useProductsSelector((state) => state.setProducts);
  const resetProducts = useProductsSelector((state) => state.resetProducts);

  const setProcessings = useProcessingsSelector((state) => state.setProcessings);
  const resetProcessings = useProcessingsSelector((state) => state.resetProcessings);

  const setCategories = useCategorySelector((state) => state.setCategories);
  const resetCategories = useCategorySelector((state) => state.resetCategories);

  //get farmer layout once has auth visited
  const promiseLayoutQ = async () => {
    const res = await getFarmerLayoutQ();
    setProducts(res?.products ?? []);
    setProcessings(res?.processings ?? []);
    setCategories(res?.categories ?? []);
  };

  useEffect(() => {
    if (!userState) {
      resetProcessings();
      resetProducts();
      resetCategories();
      return router.replace('/(auth)/sign-in');
    }
    promiseLayoutQ();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(profile-settings)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default FarmerScreenLayout;

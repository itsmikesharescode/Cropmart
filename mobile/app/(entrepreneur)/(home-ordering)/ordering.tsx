import CustomButton from '@/components/CustomButton';
import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { viewProductSelector } from '../_store/viewingProductStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCartSelector } from '../_store/cartStore';
import { useUserSelector } from '@/store/useUser';
import { UserMetaDataType } from '@/lib/db_types/user.types';

type URLparams = {
  from: string;
  prodId: string;
  product: string;
};

const OrderingScreen = () => {
  const userState = useUserSelector((state) => state.userState);
  const product = viewProductSelector((state) => state.product);
  const urlParams = useLocalSearchParams<URLparams>();

  const pushCart = useCartSelector((state) => state.pushCart);
  const cart = useCartSelector((state) => state.cart);

  const [catName, setCatName] = useState<string | undefined>();
  const [rootHome, setRootHome] = useState(false);

  useEffect(() => {
    const category: string | undefined = urlParams.from.split('/')[0];
    if (category === 'category') {
      setCatName(urlParams.from.split('/')[1]);
      if (urlParams.from.split('/')[2]) setRootHome(true);
    } else setCatName(undefined);
  }, []);

  const handleBack = () => {
    if (urlParams.from === 'home') {
      router.dismissAll();
      router.replace('/(entrepreneur)/(tabs)/home');
    } else {
      router.dismissAll();
      router.replace({
        pathname: '/(home-categories)/search/[category]',
        params: { from: rootHome ? 'home' : 'category', category: catName ?? '', id: product?.id }
      });
    }
  };

  const handleAddCart = () => {
    if (!product || !userState) return;
    pushCart({ ...product, clientQuantity: 1, buyer: userState.user_metadata as UserMetaDataType });
    router.replace('/(entrepreneur)/(tabs)/cart');
  };

  const cartExistenceChecker = () => {
    if (!product || !cart.length) return false;
    const ids = cart.map((item) => item.id);
    if (ids.includes(product.id)) return true;
    else return false;
  };

  return (
    <SafeAreaView className="bg-secondary">
      <View className="p-4 items-start">
        <TouchableOpacity
          onPress={handleBack}
          className="items-center flex-row gap-[5px] justify-center"
        >
          <Feather name="arrow-left" size={18} color="black" />
          <Text className="text-[18px] font-psemibold "> Back To {catName ?? urlParams.from} </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="px-[10px]">
        {product ? (
          <View className="flex flex-col gap-[10px]">
            <View className="relative">
              <Image
                source={{ uri: product.img_link }}
                resizeMode="cover"
                className="w-full h-[60vh]" // Keep this image fixed height
              />
              <View className="absolute top-3 left-3">
                <Text className="font-psemibold text-[20px] px-[10px] bg-primary/80 text-white rounded-lg">
                  {product.category}
                </Text>
              </View>

              <View className="absolute flex-row flex-wrap left-3 bottom-3 gap-[10px]">
                <View>
                  <Text className="font-psemibold text-[20px] px-[10px] bg-secondary/80 rounded-lg">
                    {product.name}
                  </Text>
                </View>

                <View>
                  <Text className="font-psemibold text-[20px] px-[10px] bg-secondary/80 rounded-lg">
                    Available: {product.quantity.toLocaleString()} Kilos
                  </Text>
                </View>

                <View>
                  <Text className="font-psemibold text-[20px] px-[10px] bg-secondary/80 rounded-lg">
                    Price: ₱ {product.price.toLocaleString()} / Kilo
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex flex-row py-5 px-4">
              <View>
                {product.user_meta_data.avatarLink ? (
                  <Image
                    source={{ uri: product.user_meta_data.avatarLink }}
                    resizeMode="cover"
                    className="w-24 rounded-full h-24"
                  />
                ) : (
                  <FontAwesome name="user-circle" size={100} color="black" />
                )}
              </View>
              <View className="flex-1 ml-2">
                <Text className="font-psemibold text-lg">Seller Info</Text>
                <Text className="font-pregular text-xs">
                  {product.user_meta_data.lastName}, {product.user_meta_data.firstName}
                </Text>
                <Text className="font-pregular text-xs">{product.user_meta_data.email}</Text>
              </View>
            </View>

            <View className="mb-20">
              {cartExistenceChecker() ? (
                <View className="bg-primary/50 rounded-xl min-h-[62px] w-full justify-center items-center">
                  <Text className="font-psemibold text-lg text-white">Added</Text>
                </View>
              ) : (
                <CustomButton
                  title="Add to cart"
                  handPress={handleAddCart}
                  containerStyle=""
                  isLoading={false}
                />
              )}
            </View>
          </View>
        ) : (
          <View className="absolute top-0 bottom-0 left-0 right-0  z-10 flex items-center ">
            <ActivityIndicator size="large" className="mt-10" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderingScreen;

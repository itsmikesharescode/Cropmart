import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { Cart, useCartSelector } from '../_store/cartStore';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { ProcessingType } from '@/lib/db_types/processing.types';
import { useProcessingsSelector } from '../_store/processingStore';

const ComputeListingSnippet: React.FC<Cart> = (cart) => {
  return (
    <View className="mt-2 bg-secondary/50 w-full p-[10px] rounded-lg">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row gap-[10px] items-center">
          <View className="">
            <Text className="font-pbold text-[20px]">{cart.name}</Text>
            <Text className="font-pregular text-[15px] text-gray-500">{cart.category}</Text>
            <View className="flex-row">
              <Text className="font-psemibold text-[15px] px-2 bg-secondary/50 text-primary rounded-lg">
                ₱ {cart.price} x {cart.clientQuantity} = ₱{' '}
                {(cart.price * cart.clientQuantity).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const CheckoutScreen = () => {
  const cart = useCartSelector((state) => state.cart);
  const resetCart = useCartSelector((state) => state.resetCart);
  const setProcessings = useProcessingsSelector((state) => state.setProcessings);

  const handleCheckout = async (paymentType: 'direct payment' | 'rider delivery payment') => {
    const { data, error } = (await supabase.rpc('insert_purchase', {
      purchase_obj_input: cart,
      purchase_type_input: paymentType
    })) as PostgrestSingleResponse<ProcessingType[]>;

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      return;
    }
    resetCart();
    setProcessings(data);
    ToastAndroid.show('Purchase Success', ToastAndroid.LONG);
    router.replace('/(entrepreneur)/(profile-transactions)/transactions');
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-100">
      <View className="p-4 items-start mt-10">
        <Link href="/(entrepreneur)/(tabs)/cart" asChild>
          <TouchableOpacity className="flex-row gap-[5px] items-center justify-center">
            <Feather name="arrow-left" size={18} color="black" />
            <Text className="text-[18px] font-psemibold">Back to Cart</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View className="flex flex-1 justify-center gap-[5px] p-[10px] ">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cart}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ComputeListingSnippet {...item} />}
          ListFooterComponent={() => (
            <View className="mt-5 pb-[10px]">
              <Text className="font-psemibold text-[30px]">Total: </Text>
              <Text className="font-psemibold text-[30px]">
                ₱{' '}
                {cart.length
                  ? cart
                      .map((item) => item.price * item.clientQuantity)
                      .reduce((av, cv) => av + cv)
                      .toLocaleString()
                  : ''}{' '}
              </Text>
            </View>
          )}
        />

        <View>
          <CustomButton
            title="Direct Payment"
            handPress={() => handleCheckout('direct payment')}
            containerStyle="mt-2"
            isLoading={false}
          />

          <CustomButton
            title="Rider Delivery Payment"
            handPress={() => handleCheckout('rider delivery payment')}
            containerStyle="mt-2"
            isLoading={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});

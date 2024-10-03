import CustomButton from '@/components/CustomButton';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, Text, TouchableOpacity, View, Image, Alert, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStatusSelector } from '../_store/statusStore';
import { router } from 'expo-router';
import { useUserSelector } from '@/store/useUser';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { ProcessingType } from '@/lib/db_types/processing.types';

const DetailsScreen = () => {
  const userState = useUserSelector((state) => state.userState);

  const setStatus = useStatusSelector((state) => state.setStatus);
  const stat = useStatusSelector((state) => state.stat);
  const resetStat = useStatusSelector((state) => state.resetStat);

  const handleBackHome = () => {
    resetStat();
    router.replace('/(rider)/(tabs)/shipments');
  };

  let [loader, setLoader] = useState(false);

  const handleCompleteDelivery = async () => {
    if (!stat || !userState) return;
    Alert.alert(
      'Take this shipment?',
      'You need to communicate with the seller and buyer if necessary. The required credentials are provided below.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: async () => {
            setLoader(true);

            const { data, error } = (await supabase.rpc('mark_as_delivered', {
              process_id_input: stat.id
            })) as PostgrestSingleResponse<ProcessingType[]>;
            if (error) {
              ToastAndroid.show(error.message, ToastAndroid.LONG);
              setLoader(false);
              return;
            }
            setStatus(data);
            ToastAndroid.show('Shipment updated.', ToastAndroid.LONG);
            setLoader(false);
            router.push('/(rider)/(tabs)/shipments');
            return;
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="bg-secondary h-full">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4 items-start">
          <TouchableOpacity
            onPress={handleBackHome}
            className="items-center flex-row gap-1.5 justify-center"
          >
            <Feather name="arrow-left" size={18} color="black" />
            <Text className="text-[18px] font-psemibold">Back To Shipment</Text>
          </TouchableOpacity>
        </View>

        {stat ? (
          <View className="flex flex-col gap-[10px]">
            <View className="relative">
              <Image
                source={{ uri: stat.product_obj.img_link }}
                resizeMode="cover"
                className="w-full h-[60vh]" // Keep this image fixed height
              />
              <View className="absolute top-3 left-3">
                <Text className="font-psemibold text-[20px] px-[10px] bg-primary/80 text-white rounded-lg">
                  {stat.product_obj.category}
                </Text>
              </View>

              <View className="absolute flex-row flex-wrap left-3 bottom-3 gap-[10px]">
                <Text className="font-psemibold text-[20px] px-[10px] bg-secondary/80 rounded-lg">
                  Total Amount: ₱{' '}
                  {(stat.product_obj.price * stat.product_obj.clientQuantity).toLocaleString()}
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
            >
              <View className="gap-2.5 w-[290px] bg-secondary-200 p-4 rounded-lg">
                <View>
                  {stat?.product_obj.user_meta_data.avatarLink ? (
                    <Image
                      source={{ uri: stat.product_obj.user_meta_data.avatarLink }}
                      resizeMode="cover"
                      className="w-24 rounded-full h-24"
                    />
                  ) : (
                    <FontAwesome name="user-circle" size={100} color="black" />
                  )}
                </View>
                <View className="">
                  <Text className="font-psemibold text-lg">Seller Info</Text>
                  <Text className="font-pregular text-xs">
                    {stat.product_obj.user_meta_data.lastName},{' '}
                    {stat.product_obj.user_meta_data.firstName}
                  </Text>
                  <Text className="font-pregular text-xs">
                    {stat.product_obj.user_meta_data.email}
                  </Text>
                  <Text className="font-pregular text-xs">
                    {stat.product_obj.user_meta_data.mobileNumber}
                  </Text>
                  <Text className="font-pregular text-xs">
                    {stat.product_obj.user_meta_data.address}
                  </Text>
                </View>
              </View>

              <View className="gap-2.5 ml-2.5 w-[290px] bg-secondary-200 p-4 rounded-lg ">
                <View>
                  {stat.product_obj.buyer.avatarLink ? (
                    <Image
                      source={{ uri: stat.product_obj.buyer.avatarLink }}
                      resizeMode="cover"
                      className="w-24 rounded-full h-24"
                    />
                  ) : (
                    <FontAwesome name="user-circle" size={100} color="black" />
                  )}
                </View>
                <View className="">
                  <Text className="font-psemibold text-lg">Buyer Info</Text>
                  <Text className="font-pregular text-xs">
                    {stat.product_obj.buyer.lastName}, {stat.product_obj.buyer.firstName}
                  </Text>
                  <Text className="font-pregular text-xs">{stat.product_obj.buyer.email}</Text>
                  <Text className="font-pregular text-xs">
                    {stat.product_obj.buyer.mobileNumber}
                  </Text>
                  <Text className="font-pregular text-xs">{stat.product_obj.buyer.address}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View></View>
        )}

        {stat?.status === 'Delivered' ? (
          <View className="p-4 ">
            <Text className="text-center">This transaction is done</Text>
          </View>
        ) : (
          <CustomButton
            title="Complete Delivery"
            handPress={handleCompleteDelivery}
            containerStyle="mt-2"
            isLoading={loader}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

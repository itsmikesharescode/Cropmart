import { ScrollView, Text, View, Alert, ToastAndroid, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useUserSelector } from '@/store/useUser';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useProductsSelector } from '../_store/productStore';

const ProfileScreen = () => {
  const userState = useUserSelector((state) => state.userState);
  const resetUser = useUserSelector((state) => state.resetUser);
  const resetProducts = useProductsSelector((state) => state.resetProducts);
  const [loader, setLoader] = useState(false);

  const handleLogout = () => {
    setLoader(true);
    Alert.alert('Are you sure?', `You are about to log out`, [
      {
        text: 'Cancel',
        onPress: () => {
          setLoader(false);
        },
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: async () => {
          const { error } = await supabase.auth.signOut();
          setLoader(false);
          if (error) return ToastAndroid.show(error.message, ToastAndroid.LONG);
          resetProducts();
          resetUser();
          router.replace('/(auth)/sign-in');
        }
      }
    ]);
  };

  return (
    <SafeAreaView className="bg-secondary h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <View className="w-full  items-center p-4">
            {userState?.user_metadata.avatarLink ? (
              <Image
                source={{ uri: userState.user_metadata.avatarLink }}
                resizeMode="cover"
                className="w-[130px] rounded-full h-[130px]"
              />
            ) : (
              <FontAwesome name="user-circle" size={130} color="black" />
            )}

            <Text className="text-[20px]  font-psemibold text-center">
              {userState?.user_metadata.firstName} {userState?.user_metadata.lastName} (
              {userState?.user_metadata.role})
            </Text>
            <Text className="text-[15px]  font-pregular text-center">{userState?.email}</Text>
            <Text className="text-[15px]  font-pregular text-center">
              {userState?.user_metadata.mobileNumber}
            </Text>
            <Text className="text-[15px]  font-pregular text-center">
              {userState?.user_metadata.address}
            </Text>
          </View>

          <View>
            <CustomButton
              handPress={() => {
                router.push('/(farmer)/(profile-settings)/profile-settings');
              }}
              title="Settings"
              containerStyle="mt-2"
              isLoading={false}
            />

            <CustomButton
              handPress={handleLogout}
              title="Log out"
              containerStyle="mt-2 bg-red-500"
              isLoading={loader}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

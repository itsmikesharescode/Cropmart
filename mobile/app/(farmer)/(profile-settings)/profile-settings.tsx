import { ScrollView, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpdatePassword from './_components/UpdatePassword';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import UpdateProfilePhoto from './_components/UpdateProfilePhoto';
import UpdateInfo from './_components/UpdateInfo';

const ProfileSettingsScreen = () => {
  return (
    <SafeAreaView className="bg-secondary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="p-4 items-start">
          <Link
            href={'/(farmer)/(tabs)/profile'}
            className="text-[18px] font-psemibold items-center justify-center"
          >
            <Feather name="arrow-left" size={18} color="black" />
            Back Profile
          </Link>
        </View>

        <View className="p-4 gap-10">
          <View className="">
            <UpdateProfilePhoto />
          </View>
          <View className="">
            <UpdateInfo />
          </View>
          <View className="">
            <UpdatePassword />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSettingsScreen;

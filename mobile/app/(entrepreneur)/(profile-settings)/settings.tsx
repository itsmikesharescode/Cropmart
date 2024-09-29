import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpdatePassword from './_components/UpdatePassword';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import UpdateProfilePhoto from './_components/UpdateProfilePhoto';
import UpdateInfo from './_components/UpdateInfo';

const SettingsScreen = () => {
	return (
		<SafeAreaView className="bg-secondary h-full">
			<View className="p-4 items-start">
				<Link href="/(entrepreneur)/(tabs)/profile" asChild>
					<TouchableOpacity className="items-center justify-center flex-row gap-[5px]">
						<Feather name="arrow-left" size={18} color="black" />
						<Text className="text-[18px] font-psemibold">Back To Profile</Text>
					</TouchableOpacity>
				</Link>
			</View>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
				<View className="px-4 pb-4 gap-10">
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

export default SettingsScreen;

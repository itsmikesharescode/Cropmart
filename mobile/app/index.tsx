import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const RootIndex = () => {
	return (
		<SafeAreaView className="bg-secondary h-full">
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className="flex-1 items-center justify-center p-[15px]">
					<View className="flex flex-col gap-[20px] items-center justify-center">
						<Text className="text-primary font-pbold text-[30px] text-center">CropMart</Text>
						<Image source={images.cropmart} resizeMode="cover" className="w-[250px] h-[250px]" />
						<Text className=" font-psemibold text-[15px] text-center">
							Buy and Sell farm produce
						</Text>
						<Text className="font-pregular text-[15px] text-center">
							Buying/Selling fresh and organic farm produce made easy
						</Text>
					</View>
					<CustomButton
						title="Get Started"
						handPress={() => {
							router.push('/sign-in');
						}}
						containerStyle="mt-10"
						isLoading={false}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default RootIndex;

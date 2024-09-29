import { ScrollView, Text, TouchableOpacity, View, Image, Alert, ToastAndroid } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { useProcessingsSelector } from '../_store/processingStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomButton from '@/components/CustomButton';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserSelector } from '@/store/useUser';

const ShipmentScreen = () => {
	const userState = useUserSelector((state) => state.userState);

	const processing = useProcessingsSelector((state) => state.processing);
	const resetProcessing = useProcessingsSelector((state) => state.resetProcessing);
	const deleteProcessing = useProcessingsSelector((state) => state.deleteProcessing);

	const handleBackHome = () => {
		resetProcessing();
		router.replace('/(rider)/(tabs)/home');
	};

	let [loader, setLoader] = useState(false);

	const handleShipment = async () => {
		if (!processing || !userState) return;
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

						const { error } = await supabase
							.from('processing_list_tb')
							.update([
								{
									status: 'On-going',
									rider_user_id: userState.id
								}
							])
							.eq('id', processing.id);
						if (error) {
							ToastAndroid.show(error.message, ToastAndroid.LONG);
							setLoader(false);
							return;
						}
						ToastAndroid.show('Shipment saved.', ToastAndroid.LONG);
						deleteProcessing(processing.id);
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
						<Text className="text-[18px] font-psemibold">Back To Home</Text>
					</TouchableOpacity>
				</View>

				{processing ? (
					<View className="flex flex-col gap-[10px]">
						<View className="relative">
							<Image
								source={{ uri: processing.product_obj.img_link }}
								resizeMode="cover"
								className="w-full h-[60vh]" // Keep this image fixed height
							/>
							<View className="absolute top-3 left-3">
								<Text className="font-psemibold text-[20px] px-[10px] bg-primary/80 text-white rounded-lg">
									{processing.product_obj.category}
								</Text>
							</View>

							<View className="absolute flex-row flex-wrap left-3 bottom-3 gap-[10px]">
								<Text className="font-psemibold text-[20px] px-[10px] bg-secondary/80 rounded-lg">
									Total Amount: ₱{' '}
									{(
										processing.product_obj.price * processing.product_obj.clientQuantity
									).toLocaleString()}
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
									{processing?.product_obj.user_meta_data.avatarLink ? (
										<Image
											source={{ uri: processing.product_obj.user_meta_data.avatarLink }}
											resizeMode="cover"
											className="w-24 rounded-full h-24"
										/>
									) : (
										<FontAwesome name="user-circle" size={100} color="black" />
									)}
								</View>
								<View className="">
									<Text className="font-psemibold text-lg">Seller Info</Text>
									<Text className="font-pregular text-base">
										{processing.product_obj.user_meta_data.lastName},{' '}
										{processing.product_obj.user_meta_data.firstName}
									</Text>
									<Text className="font-pregular text-base">
										{processing.product_obj.user_meta_data.email}
									</Text>
									<Text className="font-pregular text-base">
										{processing.product_obj.user_meta_data.mobileNumber}
									</Text>
									<Text className="font-pregular text-base">
										{processing.product_obj.user_meta_data.address}
									</Text>
								</View>
							</View>

							<View className="gap-2.5 ml-2.5 w-[290px] bg-secondary-200 p-4 rounded-lg ">
								<View>
									{processing?.product_obj.buyer.avatarLink ? (
										<Image
											source={{ uri: processing.product_obj.buyer.avatarLink }}
											resizeMode="cover"
											className="w-24 rounded-full h-24"
										/>
									) : (
										<FontAwesome name="user-circle" size={100} color="black" />
									)}
								</View>
								<View className="">
									<Text className="font-psemibold text-lg">Buyer Info</Text>
									<Text className="font-pregular text-base">
										{processing.product_obj.buyer.lastName}, {processing.product_obj.buyer.lastName}
									</Text>
									<Text className="font-pregular text-base">
										{processing.product_obj.buyer.email}
									</Text>
									<Text className="font-pregular text-base">
										{processing.product_obj.buyer.mobileNumber}
									</Text>
									<Text className="font-pregular text-base">
										{processing.product_obj.buyer.address}
									</Text>
								</View>
							</View>
						</ScrollView>
					</View>
				) : (
					<View></View>
				)}

				<CustomButton
					title="Take Shipment"
					handPress={handleShipment}
					containerStyle="mt-2"
					isLoading={loader}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ShipmentScreen;

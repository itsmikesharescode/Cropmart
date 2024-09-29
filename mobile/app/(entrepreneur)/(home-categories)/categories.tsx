import Feather from '@expo/vector-icons/Feather';
import { Link, router } from 'expo-router';
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCategorySelector } from '../_store/categoryStore';

const CategoriesScreen = () => {
	const categories = useCategorySelector((state) => state.categories);

	const handleBack = (item: (typeof categories)[number]) => {
		router.replace({
			pathname: '/(home-categories)/search/[category]',
			params: { from: 'category', category: item.name, id: item.id }
		});
	};

	return (
		<SafeAreaView className="bg-secondary h-full">
			<View className="p-4 items-start">
				<Link href="/(entrepreneur)/(tabs)/home" asChild>
					<TouchableOpacity className="items-center flex-row gap-[5px] justify-center">
						<Feather name="arrow-left" size={18} color="black" />
						<Text className="text-[18px] font-psemibold">Back To Home</Text>
					</TouchableOpacity>
				</Link>
			</View>

			<View className="p-[10px] flex-row">
				<Text className="font-pregular text-[15px] px-2 bg-primary/50 rounded-lg">Categories</Text>
			</View>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={categories}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => (
					<View className="p-2">
						<TouchableOpacity onPress={() => handleBack(item)}>
							<View className="relative items-center justify-center  w-full">
								{item.img_link ? (
									<Image source={{ uri: item.img_link }} className="w-full h-[200px] rounded-lg" />
								) : (
									<View className="bg-red-500 w-full h-[200px] rounded-lg"></View>
								)}

								<Text
									numberOfLines={1}
									className="font-psemibold px-2 bg-secondary/80 absolute mt-2 overflow-hidden"
								>
									{item.name}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default CategoriesScreen;

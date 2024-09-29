import CustomButton from '@/components/CustomButton';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View, Image } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import { Cart, useCartSelector } from '../_store/cartStore';
import { useEffect, useState } from 'react';
import { useUserSelector } from '@/store/useUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CounterSnippet: React.FC<Cart> = (cartObj) => {
	const increment = useCartSelector((state) => state.increment);
	const deleteCart = useCartSelector((state) => state.deleteCart);

	const userState = useUserSelector((state) => state.userState);
	const cart = useCartSelector((state) => state.cart);

	let [count, setCount] = useState(cartObj.clientQuantity);

	const saveToLocalStore = async () => {
		if (!userState) return;
		try {
			await AsyncStorage.setItem(userState.id, JSON.stringify(cart));
		} catch (error) {
			console.error('Error storing data:', error);
		}
	};

	const handleIncrement = async () => {
		setCount(count + 1);
		increment(cartObj.id, count);
		await saveToLocalStore();
	};

	const handleDecrement = async () => {
		if (count < 1) {
			deleteCart(cartObj.id);
		}
		setCount(count - 1);
		increment(cartObj.id, count);
		await saveToLocalStore();
	};

	return (
		<View className="flex-row gap-[10px] ">
			<View className="absolute right-3 -top-10">
				{cartObj.clientQuantity > 1 ? (
					<TouchableOpacity
						onPress={() => {
							deleteCart(cartObj.id);
						}}
						className=""
					>
						<FontAwesome5 name="window-close" size={24} color="red" />
					</TouchableOpacity>
				) : (
					''
				)}
			</View>
			<View className="flex-row items-center">
				<TouchableOpacity onPress={handleDecrement} className="rounded-lg  p-2">
					<FontAwesome5 name="minus" size={30} color="black" />
				</TouchableOpacity>
				<View>
					<Text className="text-[20px] font-psemibold px-2 bg-secondary/50 rounded-lg">
						{cartObj.clientQuantity}
					</Text>
				</View>
				<TouchableOpacity onPress={handleIncrement} className="rounded-lg  p-2">
					<FontAwesome5 name="plus" size={30} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const CartSnippet: React.FC<Cart> = (cart) => {
	return (
		<View className="mt-5 bg-secondary/50 p-2 rounded-lg ">
			<View className="flex flex-row justify-between items-center">
				<View className="flex flex-row gap-[10px] items-center">
					<Image source={{ uri: cart.img_link }} className="h-[80px] w-[100px] rounded-lg" />
					<View className="">
						<Text className="font-pregular text-[15px]">{cart.name}</Text>
						<Text className="font-pregular text-[15px] text-gray-500">{cart.category}</Text>
						<Text className="font-psemibold text-[15px] px-2 bg-secondary/50 text-primary rounded-lg">
							₱ {(cart.price * cart.clientQuantity).toLocaleString()}
						</Text>
					</View>
				</View>
				<View className="">
					<CounterSnippet {...cart} />
				</View>
			</View>
		</View>
	);
};

const CartScreen = () => {
	const userState = useUserSelector((state) => state.userState);
	const cart = useCartSelector((state) => state.cart);
	const resetCart = useCartSelector((state) => state.resetCart);

	const saveToLocalStore = async () => {
		if (!userState) return;
		try {
			await AsyncStorage.setItem(userState.id, JSON.stringify(cart));
		} catch (error) {
			console.error('Error storing data:', error);
		}
	};

	useEffect(() => {
		saveToLocalStore();
	}, [cart.length]);

	return (
		<SafeAreaView className="flex-1 bg-secondary-100">
			<View className="flex flex-1 h-full justify-center gap-[5px] p-[10px] mt-16">
				<View className="flex-row items-center justify-between">
					{cart.length > 1 ? (
						<TouchableOpacity onPress={() => resetCart()}>
							<Text className="font-pbold px-2 bg-red-500 text-white rounded-lg">Clear All</Text>
						</TouchableOpacity>
					) : (
						''
					)}
				</View>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={cart}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => <CartSnippet {...item} />}
					ListEmptyComponent={() => (
						<View className="h-[30vh] justify-center items-center">
							<Text className="font-psemibold text-[18px] text-primary/60">Your cart is empty</Text>
						</View>
					)}
				/>

				<View>
					{cart.length ? (
						<View>
							<View>
								{cart ? (
									<Text className="font-pbold text-[20px]">
										Total: ₱{' '}
										{cart
											.map((item) => item.clientQuantity * item.price)
											.reduce((cv, ac) => cv + ac)
											.toLocaleString()}
									</Text>
								) : (
									''
								)}
							</View>
							<CustomButton
								title="Check out"
								handPress={() => {
									router.push('/(cart-checkout)/checkout');
								}}
								containerStyle="mt-2"
								isLoading={false}
							/>
						</View>
					) : (
						<CustomButton
							title="Purchase now"
							handPress={() => {
								router.replace('/(entrepreneur)/(tabs)/home');
							}}
							containerStyle="mt-2"
							isLoading={false}
						/>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default CartScreen;

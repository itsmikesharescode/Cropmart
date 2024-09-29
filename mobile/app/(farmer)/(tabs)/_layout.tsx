import { Text, View } from 'react-native';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#5A9933',
				tabBarInactiveTintColor: '#232533',
				tabBarStyle: {
					backgroundColor: '#E6D4C7',
					borderTopWidth: 1,
					borderTopColor: '#EEE2D9',
					height: 84
				}
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<View className="items-center justify-center gap-[10px] ">
							<FontAwesome name="home" size={24} color="black" />
							<Text
								className={`${focused ? 'font-pbold' : 'font-pregular'} text-xs`}
								style={{ color: color }}
							>
								Home
							</Text>
						</View>
					)
				}}
			/>

			<Tabs.Screen
				name="status"
				options={{
					title: 'Status',
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<View className="items-center justify-center gap-[10px] ">
							<MaterialCommunityIcons name="list-status" size={24} color="black" />
							<Text
								className={`${focused ? 'font-pbold' : 'font-pregular'} text-xs`}
								style={{ color: color }}
							>
								Status
							</Text>
						</View>
					)
				}}
			/>

			<Tabs.Screen
				name="create"
				options={{
					title: 'Create',
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<View className="items-center justify-center gap-[10px] ">
							<Ionicons name="add-circle-sharp" size={24} color="black" />
							<Text
								className={`${focused ? 'font-pbold' : 'font-pregular'} text-xs`}
								style={{ color: color }}
							>
								Create
							</Text>
						</View>
					)
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<View className="items-center justify-center gap-[10px] ">
							<FontAwesome name="user-circle" size={24} color="black" />
							<Text
								className={`${focused ? 'font-pbold' : 'font-pregular'} text-xs`}
								style={{ color: color }}
							>
								Profile
							</Text>
						</View>
					)
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;

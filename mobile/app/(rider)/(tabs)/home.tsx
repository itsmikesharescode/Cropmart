import { RiderLayoutQ } from '@/lib/db_types/riderLayoutQ.types';
import { router } from 'expo-router';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProcessingsSelector } from '../_store/processingStore';

const ProcessingSnippet: React.FC<RiderLayoutQ['processings'][number]> = (transaction) => {
  const setProcessing = useProcessingsSelector((state) => state.setProcessing);

  const checkStatusName = (name: string) => {
    if (name === 'Delivered') return 'bg-green-500 text-white';
    if (name === 'Direct Paid') return 'bg-green-500 text-white';
    if (name === 'Looking for rider') return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const handleSelect = () => {
    setProcessing(transaction);
    router.push('/(rider)/(home-shipment)/shipment');
  };

  return (
    <TouchableOpacity onPress={handleSelect}>
      <View className="relative mt-2  ">
        <Image
          source={{ uri: transaction.product_obj.img_link }}
          resizeMode="cover"
          className="h-[200px] w-full rounded-lg"
        />
        <View className="absolute left-0 right-0 top-0 bottom-0 bg-black/60 rounded-lg"></View>
        <View className="flex-row gap-[10px] flex-wrap absolute top-3 left-3">
          <Text
            className={`${checkStatusName(transaction.status)} font-psemibold text-[15px] px-5`}
          >
            {transaction.status}
          </Text>
        </View>

        <View className="flex-row gap-[10px] flex-wrap absolute bottom-[82px] left-3">
          <Text className="font-psemibold text-[15px] px-5 bg-secondary/80">
            Created At: {new Date(transaction.created_at).toLocaleDateString()} @{' '}
            {new Date(transaction.created_at).toLocaleTimeString()}
          </Text>
        </View>

        <View className="flex-row gap-[10px] flex-wrap absolute bottom-3 left-3">
          <Text className="font-psemibold text-[15px] px-5 bg-secondary/80">
            Price: ₱ {transaction.product_obj.price.toLocaleString()}
          </Text>

          <Text className="font-psemibold text-[15px] px-5 bg-secondary/80">
            Order: {transaction.product_obj.clientQuantity.toLocaleString()} Kg
          </Text>

          <Text className="font-psemibold text-[15px] px-5 bg-secondary/80">
            Total Amount: ₱{' '}
            {(
              transaction.product_obj.price * transaction.product_obj.clientQuantity
            ).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const processings = useProcessingsSelector((state) => state.processings);

  return (
    <SafeAreaView className="bg-secondary flex-1">
      <View className="px-4 pt-4 items-start">
        <Text className="text-[18px] font-psemibold">Shipment Request</Text>
      </View>

      <FlatList
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}
        className="flex-col w-full"
        showsVerticalScrollIndicator={false}
        data={processings}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProcessingSnippet {...item} />}
        ListEmptyComponent={() => (
          <View className="p-[15px]">
            <Text className="font-pregular text-base text-center ">
              No shipment request at the moment.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

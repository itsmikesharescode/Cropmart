import { RiderLayoutQ } from '@/lib/db_types/riderLayoutQ.types';
import { Text, View, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useStatusSelector } from '../_store/statusStore';
import { router } from 'expo-router';

const StatusSnippet: React.FC<RiderLayoutQ['status'][number]> = (transaction) => {
  const setStat = useStatusSelector((state) => state.setStat);

  const checkStatusName = (name: string) => {
    if (name === 'Delivered') return 'bg-green-500 text-white';
    if (name === 'Direct Paid') return 'bg-green-500 text-white';
    if (name === 'Looking for rider') return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const handleRedirect = () => {
    setStat(transaction);
    router.push('/(rider)/(shipments-details)/details');
  };

  return (
    <TouchableOpacity onPress={handleRedirect} className="relative mt-2">
      <Image
        source={{ uri: transaction.product_obj.img_link }}
        resizeMode="cover"
        className="h-[200px] w-full rounded-lg"
      />
      <View className="absolute left-0 right-0 top-0 bottom-0 bg-black/60 rounded-lg"></View>
      <View className="flex-row gap-[10px] flex-wrap absolute top-3 left-3">
        <Text className={`${checkStatusName(transaction.status)} font-psemibold text-[15px] px-5`}>
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
    </TouchableOpacity>
  );
};

const StatusScreen = () => {
  const status = useStatusSelector((state) => state.status);

  return (
    <SafeAreaView className="bg-secondary-200/50 h-full">
      <View className="pt-10 px-[10px] items-start">
        <Text className="text-[18px] font-psemibold">Shipments</Text>
      </View>

      <FlatList
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}
        className="flex-col w-full"
        showsVerticalScrollIndicator={false}
        data={status}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <StatusSnippet {...item} />}
        ListEmptyComponent={() => (
          <View className="p-[15px]">
            <Text className="font-pregular text-base text-center ">No records</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default StatusScreen;

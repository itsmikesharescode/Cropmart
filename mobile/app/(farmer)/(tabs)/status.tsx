import { FlatList, Text, View, Image, ToastAndroid, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProcessingsSelector } from '../_store/processingStore';
import { EntrepLayoutQ } from '@/lib/db_types/entrepLayoutQ.types';
import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useUserSelector } from '@/store/useUser';

const StatusSnippet: React.FC<EntrepLayoutQ['processings'][number]> = (transaction) => {
  const checkStatusName = (name: string) => {
    if (name === 'Delivered') return 'bg-green-500 text-white';
    if (name === 'Direct Paid') return 'bg-green-500 text-white';
    if (name === 'Looking for rider') return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <View className="relative mt-2  ">
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
    </View>
  );
};

const TransactionsScreen = () => {
  const processings = useProcessingsSelector((state) => state.processings);
  const setProcessings = useProcessingsSelector((state) => state.setProcessings);
  const [refreshing, setRefreshing] = useState(false);
  const user = useUserSelector((state) => state.userState);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    const { data, error } = (await supabase
      .from('processing_list_tb')
      .select('*')
      .eq('farmer_user_id', user?.id)) as PostgrestSingleResponse<EntrepLayoutQ['processings']>;

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      setRefreshing(false);
      return;
    }

    setProcessings(data);

    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="bg-secondary flex-1">
      <FlatList
        className="flex-col w-full"
        showsVerticalScrollIndicator={false}
        data={processings}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <StatusSnippet {...item} />}
        ListEmptyComponent={() => (
          <View className="p-[15px]">
            <Text className="font-pregular text-base text-center ">
              You have no pending status.
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default TransactionsScreen;

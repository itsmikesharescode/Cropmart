import { Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/SearchInput';
import { useEffect, useState } from 'react';

import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const { query } = useLocalSearchParams();

  const data = [
    {
      id: '123',
      name: 'wew'
    }
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <Text>Hello</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
            <Text className="font-pmedium text-2xl text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery="" placeholder="Search for a product name" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

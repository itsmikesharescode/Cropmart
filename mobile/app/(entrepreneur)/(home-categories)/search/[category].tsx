import { ProductLJUser } from '@/lib/db_types/entrepLayoutQ.types';
import { supabase } from '@/lib/supabase';
import Feather from '@expo/vector-icons/Feather';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { viewProductSelector } from '../../_store/viewingProductStore';

const Search = () => {
  const urlParams = useLocalSearchParams() as { catId: string; category: string; from: string };
  const setProduct = viewProductSelector((state) => state.setProduct);
  const resetProduct = viewProductSelector((state) => state.resetProduct);

  const [products, setProducts] = useState<ProductLJUser[]>([]);
  const [loader, setLoader] = useState(true);

  const supabaseProductSearch = async () => {
    const { data, error } = (await supabase.rpc('query_products', {
      category_client: urlParams.category,
    })) as PostgrestSingleResponse<ProductLJUser[]>;
    if (data) setProducts(data);
    else if (error) setProducts([]);
    setLoader(false);
  };

  const handlePress = () => {
    resetProduct();
    if (urlParams.from === 'home') {
      router.replace('/(entrepreneur)/(tabs)/home');
    } else if (urlParams.from === 'category') {
      router.replace('/(home-categories)/categories');
    }
  };

  const handleRedirectOrdering = (product: ProductLJUser) => {
    if (urlParams.from === 'home') {
      setProduct(product);
      router.replace({
        pathname: '/(entrepreneur)/(home-ordering)/ordering',
        params: {
          from: `category/${urlParams.category}/home`,
          catId: urlParams.catId,
          product: product.name,
          prodId: product.id,
        },
      });
    } else if (urlParams.from === 'category') {
      setProduct(product);
      router.replace({
        pathname: '/(entrepreneur)/(home-ordering)/ordering',
        params: {
          from: `category/${urlParams.category}`,
          catId: urlParams.catId,
          product: product.name,
          prodId: product.id,
        },
      });
    }
  };

  useEffect(() => {
    supabaseProductSearch();
  }, []);
  return (
    <SafeAreaView className="bg-secondary h-full">
      <View className="p-4 items-start">
        <TouchableOpacity
          onPress={handlePress}
          className="items-center flex-row gap-[5px] justify-center"
        >
          <Feather name="arrow-left" size={18} color="black" />
          <Text className="text-[18px] font-psemibold">Back To {urlParams.from}</Text>
        </TouchableOpacity>
      </View>

      <View className="p-[10px] flex-row">
        <Text className="font-pregular text-[15px] px-2 bg-primary/50 rounded-lg">
          Available for {urlParams.category}
        </Text>
      </View>
      {loader ? (
        <View className="absolute  left-0 right-0 top-0 bottom-0 flex justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View className="p-2">
              <TouchableOpacity
                onPress={() => handleRedirectOrdering(item)}
                className="gap-2 relative rounded-lg"
              >
                <View>
                  <Image
                    source={{ uri: item.img_link }}
                    resizeMode="cover"
                    className="w-full h-[200px]"
                  />
                </View>
                <View className="top-3 left-3 absolute flex-row">
                  <Text className="font-psemibold text-[15px] px-2 bg-secondary/50">
                    {item.name}
                  </Text>
                </View>
                <View className="absolute top-3 right-3">
                  <Text className="font-psemibold text-[15px] px-2 bg-primary/80 text-white ">
                    ₱ {item.price.toLocaleString()} / Kg
                  </Text>
                </View>

                <View className="absolute bottom-3 left-3">
                  <Text className="font-psemibold text-[15px] px-2 bg-primary/80 text-white ">
                    Available: {item.quantity.toLocaleString()} Kilos
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex flex-1 h-[20vh] items-center justify-center">
              <Text className="font-pregular">No available products for this category.</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

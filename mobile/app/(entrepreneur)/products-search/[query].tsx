import SearchInput from '@/components/SearchInput';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  View,
  Image,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBookmarksSelector } from '../_store/bookmarkStore';
import { viewProductSelector } from '../_store/viewingProductStore';
import { EntrepLayoutQ } from '@/lib/db_types/entrepLayoutQ.types';
import Feather from '@expo/vector-icons/Feather';

const ProductSnippet: React.FC<EntrepLayoutQ['products'][number]> = (product) => {
  const setProduct = viewProductSelector((state) => state.setProduct);
  const setBookmarks = useBookmarksSelector((state) => state.setBookmarks);

  let [loader, setLoader] = useState(false);

  const handleRedirect = () => {
    setProduct(product);
    router.push({
      pathname: '/(entrepreneur)/(home-ordering)/ordering',
      params: { from: 'home', product: product.name, prodId: product.id }
    });
  };

  const handleBookMark = () => {
    Alert.alert('Are you sure?', `You are about to add ${product.name} in your bookmark`, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: async () => {
          setLoader(true);
          const { data, error } = (await supabase.rpc('insert_bookmark', {
            product_id_client: product.id
          })) as PostgrestSingleResponse<EntrepLayoutQ['bookmarks'][number][]>;

          if (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG);
            setLoader(false);
            return;
          }
          setBookmarks(data);
          ToastAndroid.show(`${product.name} bookmarked`, ToastAndroid.LONG);
          setLoader(false);
          router.replace('/(entrepreneur)/(tabs)/bookmark');
        }
      }
    ]);
  };
  return (
    <View className="px-2">
      <View className="mt-2">
        <Text className="p-2 bg-primary/80 font-pregular text-white">{product.category}</Text>
      </View>

      <TouchableOpacity
        onPress={handleRedirect}
        onLongPress={handleBookMark}
        className="gap-2 relative rounded-lg"
      >
        {loader ? (
          <View className="absolute bg-black/70 left-0 right-0 top-0 bottom-0 z-10 justify-center">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          ''
        )}

        <View>
          <Image
            source={{ uri: product.img_link }}
            resizeMode="cover"
            className="w-full h-[200px]"
          />
        </View>
        <View className="top-3 left-3 absolute flex-row">
          <Text className="font-psemibold text-[15px] px-2 bg-secondary/50">{product.name}</Text>
        </View>
        <View className="absolute top-3 right-3">
          <Text className="font-psemibold text-[15px] px-2 bg-primary/80 text-white ">
            ₱ {product.price.toLocaleString()} / Kg
          </Text>
        </View>

        <View className="absolute bottom-3 left-3">
          <Text className="font-psemibold text-[15px] px-2 bg-primary/80 text-white ">
            Available: {product.quantity.toLocaleString()} Kilos
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ProductSearch = () => {
  const { query } = useLocalSearchParams();

  let q = Array.isArray(query) ? query[0] : (query ?? '');

  let [products, setProducts] = useState<EntrepLayoutQ['products'][number][] | null>(null);

  const getSearchProducts = async () => {
    const { data, error } = (await supabase.rpc('search_products', {
      query_input: q
    })) as PostgrestSingleResponse<EntrepLayoutQ['products'][number][]>;

    setProducts(data);
  };

  useEffect(() => {
    getSearchProducts();
  }, []);

  return (
    <SafeAreaView className="bg-secondary-200/50 h-full">
      <View className="pt-6 px-[10px] items-start">
        <Link href="/(entrepreneur)/(tabs)/home" asChild>
          <TouchableOpacity className="items-center flex-row gap-[5px] justify-center">
            <Feather name="arrow-left" size={18} color="black" />
            <Text className="text-[18px] font-psemibold">Back To Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductSnippet {...item} />}
        ListHeaderComponent={() => (
          <View className="mb-6 px-[10px]">
            <Text className="font-pmedium text-sm text-primary">Search Results for</Text>
            <Text className="font-pmedium text-2xl text-primary">{query}</Text>

            <SearchInput initialQuery="" placeholder="Search for a product name" />
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="">
            <Text className="text-[20px] text-center font-pregular text-primary/50">
              No results
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ProductSearch;

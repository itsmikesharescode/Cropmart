import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  TextInput
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link, router } from 'expo-router';
import { EntrepLayoutQ } from '@/lib/db_types/entrepLayoutQ.types';
import { useProductsSelector } from '../_store/productStore';
import { useCategorySelector } from '../_store/categoryStore';
import { viewProductSelector } from '../_store/viewingProductStore';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useState } from 'react';
import { useBookmarksSelector } from '../_store/bookmarkStore';

const SearchSnippet = () => {
  return (
    <View className="px-2">
      <View className="w-full flex-row h-16 px-4 bg-secondary-200  rounded-2xl focus:border-primary focus:border-2 items-center">
        <TextInput
          className="flex-1 font-psemibold text-base"
          placeholder="Search product name"
          placeholderTextColor="#7b7b8b"
        />
        <TouchableOpacity className="p-2 rounded-full">
          <FontAwesome5 name="search" size={24} color="#91B43F" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CategorySnippet = () => {
  const categories = useCategorySelector((state) => state.categories);
  return (
    <View className="px-2 mt-5">
      <View className="">
        <Text className="font-psemibold text-[20px] text-primary">Categories</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View className="pl-2">
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: '/(home-categories)/search/[category]',
                  params: { from: 'home', category: item.name, id: item.id }
                });
              }}
              className="relative w-[150px] rounded-lg"
            >
              {item.img_link ? (
                <Image source={{ uri: item.img_link }} className="h-[100px] rounded-lg" />
              ) : (
                <View className="bg-red-500 w-full h-[100px] rounded-lg"></View>
              )}

              <View className="absolute top-2 left-3">
                <Text
                  numberOfLines={1}
                  className="bg-secondary/90 px-2 font-psemibold text-xs mt-2 overflow-hidden"
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <View className="items-end">
        <Link
          push
          asChild
          href="/(entrepreneur)/(home-categories)/categories"
          className="font-pregular"
        >
          <TouchableOpacity className="flex-row items-center gap-[5px]">
            <Text className="text-primary font-pregular">See more</Text>
            <Feather name="arrow-right" size={16} color="#5A9933" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

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
    <View>
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

const HomeScreen = () => {
  const products = useProductsSelector((state) => state.products);

  return (
    <SafeAreaView className="flex-1 bg-secondary-100">
      <View className="flex flex-1 h-full justify-center px-[10px] gap-[20px]">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProductSnippet {...item} />}
          ListHeaderComponent={() => (
            <View className="gap-2 mt-16">
              <SearchSnippet />
              <CategorySnippet />
              <Text className="font-psemibold text-[20px] text-primary">Products</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

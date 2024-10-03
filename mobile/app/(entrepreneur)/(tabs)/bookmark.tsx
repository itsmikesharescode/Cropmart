import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ToastAndroid
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { EntrepLayoutQ } from '@/lib/db_types/entrepLayoutQ.types';
import { useBookmarksSelector } from '../_store/bookmarkStore';
import { useProductsSelector } from '../_store/productStore';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

const ProductSnippet: React.FC<EntrepLayoutQ['bookmarks'][number]> = (bookmark) => {
  const setBookmarks = useBookmarksSelector((state) => state.setBookmarks);
  let [loader, setLoader] = useState(false);

  const handleDeleteBookmark = async () => {
    Alert.alert('Are you sure?', `You are about to remove ${bookmark.name} in your bookmark`, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: async () => {
          setLoader(true);
          const { data, error } = (await supabase.rpc('delete_bookmark', {
            bookmark_id_client: bookmark.id
          })) as PostgrestSingleResponse<EntrepLayoutQ['bookmarks'][number][]>;

          if (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG);
            setLoader(false);
            return;
          }
          setBookmarks(data);
          ToastAndroid.show(`${bookmark.name} removed`, ToastAndroid.LONG);
          setLoader(false);
        }
      }
    ]);
  };

  return (
    <View>
      <View className="mt-2">
        <Text className="p-2 bg-primary/80 font-pregular text-white">{bookmark.category}</Text>
      </View>

      <TouchableOpacity onLongPress={handleDeleteBookmark} className="gap-2 relative rounded-lg">
        {loader ? (
          <View className="absolute bg-black/70 left-0 right-0 top-0 bottom-0 z-10 justify-center">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          ''
        )}

        <View>
          <Image
            source={{ uri: bookmark.img_link }}
            resizeMode="cover"
            className="w-full h-[200px]"
          />
        </View>
        <View className="top-3 left-3 absolute flex-row">
          <Text className="font-psemibold text-[15px] px-2 bg-secondary/50">{bookmark.name}</Text>
        </View>
        <View className="absolute top-3 right-3">
          <Text className="font-psemibold text-[15px] px-2 bg-primary/80 text-white ">
            ₱ {bookmark.price.toLocaleString()} / Kg
          </Text>
        </View>

        <View className="absolute bottom-3 left-3">
          <Text className="font-psemibold text-[15px] px-2 bg-primary/80 text-white ">
            Available: {bookmark.quantity.toLocaleString()} Kilos
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const BookmarkScreen = () => {
  const bookmarks = useBookmarksSelector((state) => state.bookmarks);

  return (
    <SafeAreaView className="flex-1 bg-secondary-100">
      <View className="flex flex-1 h-full justify-center px-[10px] gap-[20px]">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookmarks}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProductSnippet {...item} />}
          ListEmptyComponent={() => (
            <View className="h-[30vh] justify-center items-center">
              <Text className="font-psemibold text-[18px] text-primary/60">
                Your bookmark is empty
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({});

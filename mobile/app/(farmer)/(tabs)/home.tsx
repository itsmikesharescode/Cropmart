import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Alert } from 'react-native';
import { useProductsSelector } from '../_store/productStore';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { ProductType } from '@/lib/db_types/product.types';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ProductSnippet: React.FC<ProductType> = (product) => {
  const deleteProduct = useProductsSelector((state) => state.deleteProduct);
  let [loader, setLoader] = useState<'delete' | 'update' | null>(null);

  const renderRightActions = (dragX: any) => {
    return (
      <View className="flex-row gap-1 pt-2">
        <TouchableOpacity
          onPress={() => handleUpdate()}
          className="bg-blue-500 w-[70] h-full justify-center items-center"
        >
          {loader === 'update' ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="create-outline" size={24} color="white" />
              <Text className="text-white font-psemibold text-xs mt-1">Update</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          className="bg-red-500 w-[70] h-full justify-center items-center "
        >
          {loader === 'delete' ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="trash-outline" size={24} color="white" />
              <Text className="text-white font-psemibold text-xs mt-1">Delete</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const handleUpdate = async () => {
    setLoader('update');
    router.push({
      pathname: '/(farmer)/(update-product)/update-product',
      params: { from: 'home', product: product.name, prodId: product.id }
    });
    setLoader(null);
  };

  const handleDelete = async () => {
    Alert.alert('Delete Product', `Are you sure you want to delete "${product.name}"?`, [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setLoader('delete');
          try {
            await supabase.storage.from('product_bucket').remove([product.img_link.slice(81)]);
            const { error } = await supabase.from('product_list_tb').delete().eq('id', product.id);

            if (error) throw error;

            deleteProduct(product.id);
            ToastAndroid.show('Product deleted successfully', ToastAndroid.SHORT);
          } catch (error: any) {
            ToastAndroid.show(error.message || 'Failed to delete product', ToastAndroid.LONG);
          } finally {
            setLoader(null);
          }
        }
      }
    ]);
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View>
        <View className="mt-2">
          <Text className="p-2 bg-primary font-pregular text-white">{product.category}</Text>
        </View>
        <TouchableOpacity className="gap-2 relative rounded-lg">
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

          {loader ? (
            <View className="absolute left-0 right-0 top-0 bottom-0 flex justify-center bg-slate-900/50">
              <ActivityIndicator size="large" />
            </View>
          ) : (
            ''
          )}
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const HomeScreen = () => {
  const products = useProductsSelector((state) => state.products);

  return (
    <SafeAreaView className="bg-secondary flex-1">
      <FlatList
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductSnippet {...item} />}
        ListEmptyComponent={() => (
          <View className="p-[15px] text-center">
            <Text className="font-pregular text-center text-base ">You have no products.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

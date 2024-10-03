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

const ProductSnippet: React.FC<ProductType> = (product) => {
  const deleteProduct = useProductsSelector((state) => state.deleteProduct);
  let [loader, setLoader] = useState(false);

  const handleDelete = async () => {
    Alert.alert('Are you sure?', `You are about to delete this product ${product.name}`, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: async () => {
          setLoader(true);
          await supabase.storage.from('product_bucket').remove([product.img_link.slice(81)]);
          const { error } = await supabase.from('product_list_tb').delete().eq('id', product.id);
          if (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG);
            setLoader(false);
            return;
          }
          ToastAndroid.show('Product deleted.', ToastAndroid.LONG);
          setLoader(false);
          deleteProduct(product.id);
          return;
        }
      }
    ]);
  };

  return (
    <View>
      <View className="mt-2">
        <Text className="p-2 bg-primary/80 font-pregular text-white">{product.category}</Text>
      </View>
      <TouchableOpacity onLongPress={handleDelete} className="gap-2 relative rounded-lg">
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

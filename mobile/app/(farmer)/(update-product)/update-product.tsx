import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Ionicons from '@expo/vector-icons/Ionicons';
import FormField from '@/components/FormField';
import CustomSelect from '@/components/CustomSelect';
import CustomButton from '@/components/CustomButton';
import { supabase } from '@/lib/supabase';
import { useUserSelector } from '@/store/useUser';
import * as Crypto from 'expo-crypto';
import { Link, router } from 'expo-router';
import { useProductsSelector } from '../_store/productStore';
import { getFarmerLayoutQ } from '../db_calls/layoutQ';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { ProductType } from '@/lib/db_types/product.types';
import { useCategorySelector } from '../_store/categoryStore';
import { prodUpDateSchema, ProdUpDateSchema } from './schema';
import { Feather } from '@expo/vector-icons';

const CartScreen = () => {
  const userState = useUserSelector((state) => state.userState);
  const setProducts = useProductsSelector((state) => state.setProducts);
  const categories = useCategorySelector((state) => state.categories);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ProdUpDateSchema>({ resolver: zodResolver(prodUpDateSchema) });

  const formValues = useWatch({ control });

  const openPicker = async (selectType: 'Video' | 'Image') => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === 'Image'
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      const file = result.assets[0];

      const asset = {
        name: file.fileName ?? '',
        type: file.mimeType ?? '',
        size: file.fileSize ?? 0,
        uri: file.uri ?? '',
        arrayBuffer: undefined,
        slice: undefined,
        stream: undefined,
        text: undefined
      };

      if (selectType === 'Image') setValue('prodImage', asset);
    }
  };

  const onSubmit = async (formData: ProdUpDateSchema) => {
    if (!userState) return;

    const publicEndpoint =
      'https://sxubqviccwgfscizytkv.supabase.co/storage/v1/object/public/product_bucket/';
    const uuid = Crypto.randomUUID();
    const { data, error } = await supabase.storage
      .from('product_bucket')
      .upload(`${userState.id}/${uuid}`, formData.prodImage as Blob, {
        contentType: formData.prodImage.type,
        cacheControl: '1000',
        upsert: true
      });

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      reset();
      return;
    } else if (data) {
      const { data: products, error: insertErr } = (await supabase.rpc('insert_product', {
        name_client: formData.prodName,
        price_client: Number(formData.price),
        quantity_client: Number(formData.quantity),
        category_client: formData.cat,
        img_link: publicEndpoint + data.path
      })) as PostgrestSingleResponse<ProductType[]>;
      if (insertErr) {
        ToastAndroid.show(insertErr.message, ToastAndroid.LONG);
        reset();
        return;
      } else if (products) {
        setProducts(products);
        ToastAndroid.show('Product Uploaded', ToastAndroid.LONG);
        reset();
        router.replace('/(farmer)/(tabs)/home');
      }
      return;
    }

    return;
  };
  return (
    <SafeAreaView className="bg-secondary h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4 items-start">
          <Link
            href={'/(farmer)/(tabs)/home'}
            className="text-[18px] font-psemibold items-center justify-center"
          >
            <Feather name="arrow-left" size={18} color="black" />
            Back Home
          </Link>
        </View>
        <View className="px-4  gap-2">
          <View>
            <Text className="text-[25px] font-semibold font-pregular mt-5">
              Update your product
            </Text>
          </View>

          <View className="product-image mt-2">
            <Text className="text-base font-pmedium pb-2">Product Image</Text>

            <TouchableOpacity onPress={() => openPicker('Image')}>
              {formValues.prodImage?.uri ? (
                <Image
                  source={{ uri: formValues.prodImage.uri }}
                  resizeMode="contain"
                  className="w-full h-64 rounded-2xl"
                />
              ) : (
                <View className="w-full h-16 px-4 bg-secondary-200 rounded-2xl justify-center items-center flex-row space-x-2">
                  <Ionicons name="cloud-upload" size={24} color="#5A9933" />
                  <Text className="text-sm text-primary font-pmedium">Choose a photo.</Text>
                </View>
              )}
            </TouchableOpacity>

            {errors.prodImage && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.prodImage?.message}
              </Text>
            )}
          </View>

          <View className="category">
            <Controller
              control={control}
              name="cat"
              render={({ field: { value, onBlur, onChange } }) => (
                <CustomSelect
                  title="Catergory"
                  value={value}
                  otherStyles="mt-2"
                  onSelect={(item) => onChange(item.value)}
                  selection={categories.map((item) => ({ id: item.id, value: item.name }))}
                />
              )}
            />

            {errors.cat && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.cat.message}
              </Text>
            )}
          </View>

          <View className="product-name">
            <Controller
              control={control}
              name="prodName"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="Product Name"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  placeholder="Enter your product name"
                />
              )}
            />

            {errors.prodName && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.prodName.message}
              </Text>
            )}
          </View>

          <View className="quantity">
            <Controller
              control={control}
              name="quantity"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="Product Quantity / Kg"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles=""
                  placeholder="Enter your product quantity"
                />
              )}
            />

            {errors.quantity && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.quantity.message}
              </Text>
            )}
          </View>

          <View className="price">
            <Controller
              control={control}
              name="price"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="Product Price / Kg"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles=""
                  placeholder="Enter your product price"
                />
              )}
            />

            {errors.price && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.price.message}
              </Text>
            )}
          </View>

          <CustomButton
            title="Upload Product"
            handPress={handleSubmit(onSubmit)}
            containerStyle="mt-2"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});

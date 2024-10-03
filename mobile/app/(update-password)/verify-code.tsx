import { ScrollView, Text, View, Image, ToastAndroid } from 'react-native';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifySchema, verifySchema } from '../(update-password)/schema';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import { useUserSelector } from '@/store/useUser';
import { supabase } from '@/lib/supabase';

const VerifyCodeScreen = () => {
  const setUser = useUserSelector((state) => state.setUser);
  const { email } = useLocalSearchParams<{ email?: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<VerifySchema>({ resolver: zodResolver(verifySchema) });

  const onSubmit = async (formData: VerifySchema) => {
    if (!email) return;
    const {
      data: { user },
      error
    } = await supabase.auth.verifyOtp({
      email: email,
      token: formData.code,
      type: 'email'
    });

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      return;
    } else if (user) {
      setUser(user);
      router.replace('/(update-password)/update-password');
    }
  };

  return (
    <SafeAreaView className="bg-secondary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex-1 flex-col justify-center items-center p-[20px]">
          <Image
            source={images.cropmart_logo}
            resizeMode="contain"
            className="w-[100px] h-[100px]"
          />
          <Text className="text-primary font-pbold text-[30px] text-center">CropMart Security</Text>
          <Text className="font-pregular text-primary text-center">
            We have sent a code to{' '}
            <Text className="text-black font-psemibold underline">{email}</Text> kindly check it.
          </Text>

          <View className="code w-full">
            <Controller
              control={control}
              name="code"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="Code"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  placeholder="Enter the code"
                />
              )}
            />

            {errors.code && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.code.message}
              </Text>
            )}
          </View>

          <CustomButton
            title="Verify Code"
            handPress={handleSubmit(onSubmit)}
            containerStyle="mt-2"
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyCodeScreen;

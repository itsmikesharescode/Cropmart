import { ScrollView, Text, View, Image, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPwdSchema, forgotPwdSchema } from './schema';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { supabase } from '@/lib/supabase';

const ForgotPasswordScreen = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPwdSchema>({ resolver: zodResolver(forgotPwdSchema) });

  const onSubmit = async (formData: ForgotPwdSchema) => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(formData.email);

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      setLoading(false);
      return;
    }
    router.dismissAll();
    router.replace(`/(update-password)/verify-code?email=${formData.email}`);
    setLoading(false);
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
          <Text className="text-primary font-pbold text-[30px] text-center">Forgot Password</Text>

          <View className="email w-full">
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="Email"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  keyboardType="email-address"
                  placeholder="Enter your email"
                />
              )}
            />

            {errors.email && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.email.message}
              </Text>
            )}
          </View>

          <CustomButton
            title="Send Reset Code"
            handPress={handleSubmit(onSubmit)}
            containerStyle="mt-2"
            isLoading={loading}
          />

          <View className="mt-10 flex items-center">
            <Text className="text-base font-pmedium">Already recover your account?</Text>
            <Link href="/sign-in" className="text-base font-pmedium underline p-2">
              Log in Here!
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

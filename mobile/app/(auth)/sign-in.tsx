import { ScrollView, ToastAndroid, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema, signInSchema } from './schema';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { useUserSelector } from '@/store/useUser';
import { supabase } from '@/lib/supabase';

const SignInScreen = () => {
  const setUser = useUserSelector((state) => state.setUser);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInSchema>({ resolver: zodResolver(signInSchema) });

  const [loader, setLoader] = useState(false);

  const onSubmit = async (formData: SignInSchema) => {
    setLoader(true);
    const {
      data: { user },
      error
    } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.pwd
    });

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      setLoader(false);
      return;
    } else if (user) {
      setUser(user);
      ToastAndroid.show(`Welcome back! ${user.user_metadata.firstName}`, ToastAndroid.LONG);
      const { role } = user.user_metadata;
      if (role === 'Rider') router.replace('/(rider)/(tabs)/home');
      if (role === 'Farmer') router.replace('/(farmer)/(tabs)/home');
      if (role === 'Entrepreneur') router.replace('/(entrepreneur)/(tabs)/home');
      setLoader(false);
    }
    return;
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
          <Text className="text-primary font-pbold text-[30px] text-center">CropMart Log in</Text>

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

          <View className="pwd w-full">
            <Controller
              control={control}
              name="pwd"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="Password"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  placeholder="Enter your password"
                  secureTextEntry={true}
                />
              )}
            />

            {errors.pwd && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.pwd.message}
              </Text>
            )}
          </View>

          <CustomButton
            title="Log in"
            handPress={handleSubmit(onSubmit)}
            containerStyle="mt-2"
            isLoading={loader}
          />

          <View className="mt-10">
            <Link href="/forgot-password" className="text-base font-pmedium underline">
              Forgot Password
            </Link>
          </View>

          <View className="mt-10 flex items-center">
            <Text className="text-base font-pmedium">Don't have an account yet?</Text>
            <Link href="/sign-up" className="text-base font-pmedium underline p-2">
              Create Here!
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

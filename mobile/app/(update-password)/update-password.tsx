import { ScrollView, Text, View, Image, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdatePwdSchema, updatePwdSchema } from '../(update-password)/schema';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { useUserSelector } from '@/store/useUser';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

const UpdatePasswordScreen = () => {
  const setUser = useUserSelector((state) => state.setUser);

  const [loader, setLoader] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdatePwdSchema>({ resolver: zodResolver(updatePwdSchema) });

  const onSubmit = async (formData: UpdatePwdSchema) => {
    setLoader(true);
    const {
      data: { user },
      error
    } = await supabase.auth.updateUser({
      password: formData.newPwd
    });

    if (error) ToastAndroid.show(error.message, ToastAndroid.LONG);
    else if (user) {
      ToastAndroid.show('Password updated', ToastAndroid.LONG);
      setUser(user);
      const { role } = user.user_metadata;
      if (role === 'Rider') router.replace('/(rider)/(tabs)/home');
      if (role === 'Farmer') router.replace('/(farmer)/(tabs)/home');
      if (role === 'Entrepreneur') router.replace('/(entrepreneur)/(tabs)/home');
    }
    setLoader(false);
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
          <Text className="text-primary font-pbold text-[30px] text-center">CropMart Security</Text>

          <View className="new-password w-full">
            <Controller
              control={control}
              name="newPwd"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="New Password"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  placeholder="Enter your new password"
                  secureTextEntry={true}
                />
              )}
            />

            {errors.newPwd && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.newPwd.message}
              </Text>
            )}
          </View>

          <View className="confirm-new-password w-full">
            <Controller
              control={control}
              name="confirmNewPwd"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="Confirm New Password"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  placeholder="Confirm your password"
                  secureTextEntry={true}
                />
              )}
            />

            {errors.confirmNewPwd && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.confirmNewPwd.message}
              </Text>
            )}
          </View>

          <CustomButton
            title="Update Password"
            handPress={handleSubmit(onSubmit)}
            containerStyle="mt-2"
            isLoading={loader}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdatePasswordScreen;

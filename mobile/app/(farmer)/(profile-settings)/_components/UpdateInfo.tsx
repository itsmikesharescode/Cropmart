import { Text, ToastAndroid, View } from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateInfoSchema, UpdateInfoSchema } from './schema';
import CustomButton from '@/components/CustomButton';
import { useUserSelector } from '@/store/useUser';
import { supabase } from '@/lib/supabase';

const UpdateInfo = () => {
  const setUser = useUserSelector((state) => state.setUser);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateInfoSchema>({ resolver: zodResolver(updateInfoSchema) });

  const onSubmit = async (formData: UpdateInfoSchema) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        mobileNumber: formData.mobileNum,
      },
    });

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      reset();
      return;
    } else if (user) {
      setUser(user);
      ToastAndroid.show('Profile Information Updated.', ToastAndroid.LONG);
      reset();
      return;
    }
  };

  return (
    <View>
      <View className="firstname w-full">
        <Controller
          control={control}
          name="firstName"
          render={({ field: { value, onBlur, onChange } }) => (
            <FormField
              title="New First Name"
              value={value}
              onBlur={onBlur}
              handleChangeText={onChange}
              otherStyles="mt-2"
              placeholder="Enter your new firstname"
            />
          )}
        />

        {errors.firstName && (
          <Text className="text-sm font-pregular text-red-500 mt-[10px]">
            {errors.firstName.message}
          </Text>
        )}
      </View>

      <View className="lastname w-full">
        <Controller
          control={control}
          name="lastName"
          render={({ field: { value, onBlur, onChange } }) => (
            <FormField
              title="New Last Name"
              value={value}
              onBlur={onBlur}
              handleChangeText={onChange}
              otherStyles="mt-2"
              placeholder="Enter your new lastname"
            />
          )}
        />

        {errors.lastName && (
          <Text className="text-sm font-pregular text-red-500 mt-[10px]">
            {errors.lastName.message}
          </Text>
        )}
      </View>

      <View className="address w-full">
        <Controller
          control={control}
          name="address"
          render={({ field: { value, onBlur, onChange } }) => (
            <FormField
              title="New Home Address"
              value={value}
              onBlur={onBlur}
              handleChangeText={onChange}
              otherStyles="mt-2"
              placeholder="Enter your new home address"
            />
          )}
        />

        {errors.address && (
          <Text className="text-sm font-pregular text-red-500 mt-[10px]">
            {errors.address.message}
          </Text>
        )}
      </View>

      <View className="mobileNum w-full">
        <Controller
          control={control}
          name="mobileNum"
          render={({ field: { value, onBlur, onChange } }) => (
            <FormField
              title="New Mobile Number"
              value={value}
              onBlur={onBlur}
              handleChangeText={onChange}
              otherStyles="mt-2"
              placeholder="Enter your new mobile number"
            />
          )}
        />

        {errors.mobileNum && (
          <Text className="text-sm font-pregular text-red-500 mt-[10px]">
            {errors.mobileNum.message}
          </Text>
        )}
      </View>

      <CustomButton
        title="Update Information"
        handPress={handleSubmit(onSubmit)}
        containerStyle="mt-2"
        isLoading={isSubmitting}
      />
    </View>
  );
};

export default UpdateInfo;

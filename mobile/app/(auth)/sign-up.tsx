import { ScrollView, Text, View, Image, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, signUpSchema } from './schema';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import CustomSelect from '@/components/CustomSelect';
import { useUserSelector } from '@/store/useUser';
import { supabase } from '@/lib/supabase';

const SignUpScreen = () => {
  const setUser = useUserSelector((state) => state.setUser);

  const [loader, setLoader] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (formData: SignUpSchema) => {
    setLoader(true);
    const {
      data: { user },
      error
    } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.pwd,
      options: {
        data: {
          role: formData.role,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          mobileNumber: formData.mobileNum
        }
      }
    });
    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      setLoader(false);
      return;
    } else if (user) {
      setUser(user);
      ToastAndroid.show('Account created', ToastAndroid.LONG);
      const { role } = user.user_metadata;
      if (role === 'Rider') router.replace('/(rider)/(tabs)/home');
      if (role === 'Farmer') router.replace('/(farmer)/(tabs)/home');
      if (role === 'Entrepreneur') router.replace('/(entrepreneur)/(tabs)/home');
      setLoader(false);
    }
  };

  return (
    <SafeAreaView className="bg-secondary">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-col justify-center items-center p-[20px]">
          <Image
            source={images.cropmart_logo}
            resizeMode="contain"
            className="w-[100px] h-[100px]"
          />
          <Text className="text-primary font-pbold text-[30px] text-center">Registration</Text>

          <View className="role w-full">
            <Controller
              control={control}
              name="role"
              render={({ field: { value, onBlur, onChange } }) => (
                <CustomSelect
                  title="Role"
                  value={value}
                  otherStyles="mt-2"
                  onSelect={(item) => onChange(item.value)}
                  selection={[
                    { id: 0, value: 'Farmer' },
                    { id: 1, value: 'Entrepreneur' },
                    { id: 2, value: 'Rider' }
                  ]}
                />
              )}
            />

            {errors.role && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.role.message}
              </Text>
            )}
          </View>

          <View className="firstname w-full">
            <Controller
              control={control}
              name="firstName"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="First Name"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  placeholder="Enter your first name"
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
                  title="Last Name"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  placeholder="Enter your last name"
                />
              )}
            />

            {errors.lastName && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.lastName.message}
              </Text>
            )}
          </View>

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

          <View className="address w-full">
            <Controller
              control={control}
              name="address"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="Home Address"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  placeholder="Enter your address"
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
                  title="Mobile Number"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  placeholder="Enter your mobile number"
                />
              )}
            />

            {errors.mobileNum && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.mobileNum.message}
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

          <View className="confirm-pwd w-full">
            <Controller
              control={control}
              name="confirmPwd"
              render={({ field: { value, onBlur, onChange } }) => (
                <FormField
                  title="Confirm Password"
                  value={value}
                  onBlur={onBlur}
                  handleChangeText={onChange}
                  otherStyles="mt-2"
                  placeholder="Confirm your password"
                  secureTextEntry={true}
                />
              )}
            />

            {errors.confirmPwd && (
              <Text className="text-sm font-pregular text-red-500 mt-[10px]">
                {errors.confirmPwd.message}
              </Text>
            )}
          </View>

          <CustomButton
            title="Register"
            handPress={handleSubmit(onSubmit)}
            containerStyle="mt-2"
            isLoading={loader}
          />

          <View className="mt-10 flex items-center">
            <Text className="text-base font-pmedium">Already have an account?</Text>
            <Link href="/sign-in" className="text-base font-pmedium underline p-2">
              Log in Here!
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

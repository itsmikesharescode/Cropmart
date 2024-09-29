import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePhotoSchema, UpdatePhotoSchema } from './schema';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '@/components/CustomButton';
import { supabase } from '@/lib/supabase';
import { useUserSelector } from '@/store/useUser';
import { useState } from 'react';

const UpdateProfilePhoto = () => {
  const userState = useUserSelector((state) => state.userState);
  const setUser = useUserSelector((state) => state.setUser);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePhotoSchema>({ resolver: zodResolver(updatePhotoSchema) });

  const formValues = useWatch({ control });

  const openPicker = async (selectType: 'Video' | 'Image') => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === 'Image'
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
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
        text: undefined,
      };

      if (selectType === 'Image') setValue('profilePhoto', asset);
    }
  };

  const onSubmit = async (formData: UpdatePhotoSchema) => {
    const publicEndpoint = 'https://sxubqviccwgfscizytkv.supabase.co/storage/v1/object/public/';

    const { data, error } = await supabase.storage
      .from('profile_photo_bucket')
      .upload(userState.id, formData.profilePhoto as Blob, {
        contentType: formData.profilePhoto.type,
        cacheControl: '1000',
        upsert: true,
      });

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      reset();
      return;
    } else if (data) {
      const {
        data: { user },
        error: updateErr,
      } = await supabase.auth.updateUser({
        data: {
          avatarLink: publicEndpoint + data.fullPath,
        },
      });

      if (updateErr) {
        ToastAndroid.show(updateErr.message, ToastAndroid.LONG);
        reset();
        return;
      } else if (user) {
        ToastAndroid.show('Profile Photo Uploaded.', ToastAndroid.LONG);
        setUser(user);
        reset();
        return;
      }
    }
  };
  return (
    <View className="profile-photo mt-2">
      <Text className="text-base font-pmedium pb-2">Profile Photo</Text>

      <TouchableOpacity onPress={() => openPicker('Image')}>
        {formValues.profilePhoto?.uri ? (
          <Image
            source={{ uri: formValues.profilePhoto.uri }}
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

      {errors.profilePhoto && (
        <Text className="text-sm font-pregular text-red-500 mt-[10px]">
          {errors.profilePhoto?.message}
        </Text>
      )}

      <CustomButton
        title="Upload Profile Photo"
        handPress={handleSubmit(onSubmit)}
        containerStyle="mt-2"
        isLoading={isSubmitting}
      />
    </View>
  );
};

export default UpdateProfilePhoto;

const styles = StyleSheet.create({});

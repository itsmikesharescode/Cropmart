import { Text, ToastAndroid, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePwdSchema, UpdatePwdSchema } from './schema';
import CustomButton from '@/components/CustomButton';
import { useUserSelector } from '@/store/useUser';
import { supabase } from '@/lib/supabase';

const UpdatePassword = () => {
	const setUser = useUserSelector((state) => state.setUser);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<UpdatePwdSchema>({ resolver: zodResolver(updatePwdSchema) });

	const onSubmit = async (formData: UpdatePwdSchema) => {
		const {
			data: { user },
			error
		} = await supabase.auth.updateUser({
			password: formData.newPwd
		});

		if (error) {
			ToastAndroid.show(error.message, ToastAndroid.LONG);
			reset();
			return;
		} else if (user) {
			setUser(user);
			ToastAndroid.show('Profile Information Updated.', ToastAndroid.LONG);
			reset();
		}
	};

	return (
		<View>
			<View className="newPwd w-full">
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

			<View className="confirmNewPwd w-full">
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
							placeholder="Confirm your new password"
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
				isLoading={isSubmitting}
			/>
		</View>
	);
};

export default UpdatePassword;

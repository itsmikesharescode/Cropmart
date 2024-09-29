import { z } from 'zod';

export const updatePwdSchema = z
	.object({
		newPwd: z.string().min(1, { message: 'Must choose a strong password.' }),
		confirmNewPwd: z.string()
	})
	.superRefine(({ newPwd, confirmNewPwd }, ctx) => {
		if (newPwd !== confirmNewPwd) {
			ctx.addIssue({
				code: 'custom',
				message: 'Must confirm your new password.',
				path: ['confirmNewPwd']
			});
		}
	});

export type UpdatePwdSchema = z.infer<typeof updatePwdSchema>;

const fileAssetSchema = z.object({
	name: z.string().min(1, { message: 'File name is required.' }),
	type: z.string().min(1, { message: 'File type is required.' }),
	size: z.number().min(1, { message: 'File size must be greater than 0.' }),
	uri: z.string().min(1, { message: 'File URI is required.' }),
	arrayBuffer: z.any().optional(),
	slice: z.any().optional(),
	stream: z.any().optional(),
	text: z.any().optional()
});

const imageFileSchema = fileAssetSchema.refine((data) => data.size <= 700 * 1024, {
	// 700KB
	message: 'Image file size must be less than or equal to 700KB.'
});

export const updatePhotoSchema = z.object({
	profilePhoto: imageFileSchema
});

export type UpdatePhotoSchema = z.infer<typeof updatePhotoSchema>;

export const updateInfoSchema = z.object({
	firstName: z.string().min(1, { message: 'Must enter a first name.' }),
	lastName: z.string().min(1, { message: 'Must enter last name.' }),
	address: z.string().min(2, { message: 'Must enter address.' }),
	mobileNum: z.string().regex(/^\+63\d{10}$/, {
		message: 'Mobile number must be in the format +631234567890.'
	})
});

export type UpdateInfoSchema = z.infer<typeof updateInfoSchema>;

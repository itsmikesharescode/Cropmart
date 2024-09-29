import { z } from 'zod';

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

const imageFileSchema = fileAssetSchema.refine((data) => data.size <= 5000 * 1024, {
	// 700KB
	message: 'Image file size must be less than or equal to 5mb.'
});

const numberRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

export const prodUpSchema = z.object({
	prodImage: imageFileSchema,
	cat: z.string().min(1, { message: 'Must enter category.' }),
	prodName: z.string().min(1, { message: 'Must enter product name.' }),
	quantity: z.string().refine((value) => numberRegex.test(value), {
		message: 'Must enter a valid quantity. Only numbers allowed.'
	}),
	price: z.string().refine((value) => numberRegex.test(value), {
		message: 'Must enter a valid price. Only numbers allowed.'
	})
});

export type ProdUpSchema = z.infer<typeof prodUpSchema>;

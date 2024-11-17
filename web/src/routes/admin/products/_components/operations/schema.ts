import { z } from 'zod';

export const updateProductSchema = z.object({
  productId: z.number(),
  price: z.number().positive({ message: 'Must enter a valid price greater than zero.' })
});

export type UpdateProductSchema = typeof updateProductSchema;

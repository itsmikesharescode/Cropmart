import { z } from 'zod';

export const createCatSchema = z.object({
  catName: z.string().min(1, { message: 'Must enter category name.' }),
  catPhoto: z
    .instanceof(File, { message: 'Please upload a file.' })
    .refine((f) => f.size < 2_000_000, 'Max 2 MB upload size.')
});

export type CreateCatSchema = typeof createCatSchema;

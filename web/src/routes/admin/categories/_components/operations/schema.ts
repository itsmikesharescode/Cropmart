import { z } from 'zod';

export const createCatSchema = z.object({
  name: z.string().min(1, { message: 'Must enter category name.' }),
  imgLink: z.string()
});

export type CreateCatSchema = typeof createCatSchema;

import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createCatSchema } from './_components/operations/schema';

export const load: PageServerLoad = async () => {
  return {
    createCatForm: await superValidate(zod(createCatSchema))
  };
};

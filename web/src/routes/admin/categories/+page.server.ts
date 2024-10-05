import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createCatSchema, updateCatSchema } from './_components/operations/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    createCatForm: await superValidate(zod(createCatSchema)),
    upateCatForm: await superValidate(zod(updateCatSchema))
  };
};

export const actions: Actions = {
  createCategoryEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(createCatSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  },

  updateCategoryEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateCatSchema));

    if (!form.valid) return fail(400, { form });
    console.log(form.data);
  }
};

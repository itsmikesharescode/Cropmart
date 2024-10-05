import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
  createUserSchema,
  updateUserEmailSchema,
  updateUserInfoSchema,
  updateUserPwdSchema
} from './_components/operations/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    createUserForm: await superValidate(zod(createUserSchema)),
    updateUserInfoForm: await superValidate(zod(updateUserInfoSchema)),
    updateUserEmailForm: await superValidate(zod(updateUserEmailSchema)),
    updateUserPwdForm: await superValidate(zod(updateUserPwdSchema))
  };
};

export const actions: Actions = {
  createUserEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(createUserSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  },

  updateUserInfoEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateUserInfoSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  },

  updateUserEmailEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateUserEmailSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  },

  updateUserPwdEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateUserPwdSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  }
};

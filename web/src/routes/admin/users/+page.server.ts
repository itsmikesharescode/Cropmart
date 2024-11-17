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
  createUserEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const form = await superValidate(request, zod(createUserSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabaseAdmin.auth.admin.createUser({
      email_confirm: true,
      email: form.data.email,
      password: form.data.pwd,
      user_metadata: {
        role: form.data.role,
        email: form.data.email,
        address: form.data.address,
        lastName: form.data.lName,
        firstName: form.data.fName,
        mobileNumber: form.data.mobileNum
      }
    });

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Account created.' };
  },

  updateUserInfoEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const form = await superValidate(request, zod(updateUserInfoSchema));

    if (!form.valid) return fail(400, { form });
    const { error } = await supabaseAdmin.auth.admin.updateUserById(form.data.userId, {
      user_metadata: {
        address: form.data.newAddress,
        lastName: form.data.newLname,
        firstName: form.data.newFname,
        mobileNumber: form.data.newMobileNum
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Account information updated.' };
  },

  updateUserEmailEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const form = await superValidate(request, zod(updateUserEmailSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabaseAdmin.auth.admin.updateUserById(form.data.userId, {
      email: form.data.newEmail,
      user_metadata: {
        email: form.data.newEmail
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Account email updated.' };
  },

  updateUserPwdEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const form = await superValidate(request, zod(updateUserPwdSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabaseAdmin.auth.admin.updateUserById(form.data.userId, {
      password: form.data.newPwd
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Account password updated.' };
  },

  deleteUserEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const formData = await request.formData();
    const userId = formData.get('userId') as string;

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) return fail(401, { msg: error.message });
    return { msg: 'Account deleted.' };
  }
};

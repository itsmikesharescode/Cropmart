import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { adminLoginSchema } from './_components/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    adminLoginForm: await superValidate(zod(adminLoginSchema))
  };
};

export const actions: Actions = {
  adminLoginEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const form = await superValidate(request, zod(adminLoginSchema));

    if (!form.valid) return fail(400, { form });

    const {
      data: { user },
      error
    } = await supabaseAdmin.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.pwd
    });

    if (error) return fail(401, { form, msg: error.message });
    else if (user) {
      const { role } = user.user_metadata;
      if (role !== 'Admin') {
        await supabaseAdmin.auth.signOut();
        return fail(401, { form, msg: 'Invalid login credentials.' });
      }

      return { form, msg: 'Welcome back!' };
    }
  }
};

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
	adminLoginEvent: async ({ locals: { supabase, supabaseAdmin }, request }) => {
		const form = await superValidate(request, zod(adminLoginSchema));

		if (!form.valid) return fail(400, { form });
	}
};

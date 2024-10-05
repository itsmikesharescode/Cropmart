import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { updateProductSchema } from './_components/operations/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    updateProductForm: await superValidate(zod(updateProductSchema))
  };
};

export const actions: Actions = {
  updateProductEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateProductSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase
      .from('product_list_tb')
      .update([{ price: form.data.price }])
      .eq('id', form.data.productId);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Price updated.' };
  },

  deleteProductEvent: async ({ locals: { supabase }, request }) => {
    const formData = await request.formData();
    const productId = formData.get('productId') as string;
    const userId = formData.get('userId') as string;

    const { error } = await supabase
      .from('product_list_tb')
      .delete()
      .match({ id: Number(productId), user_id: userId });

    if (error) return fail(401, { msg: error.message });
    return { msg: 'Product deleted.' };
  }
};

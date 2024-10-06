import { superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createCatSchema, updateCatSchema } from './_components/operations/schema';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    createCatForm: await superValidate(zod(createCatSchema)),
    upateCatForm: await superValidate(zod(updateCatSchema))
  };
};
const publicAPI = 'https://sxubqviccwgfscizytkv.supabase.co/storage/v1/object/public/';
export const actions: Actions = {
  createCategoryEvent: async ({ locals: { supabase, user }, request }) => {
    const form = await superValidate(request, zod(createCatSchema));

    if (!form.valid) return fail(400, { form });
    if (!user) return;

    const { data: storageRes, error: uploadErr } = await supabase.storage
      .from('category_bucket')
      .upload(user.id, form.data.catPhoto, {
        contentType: form.data.catPhoto.type
      });

    if (uploadErr) return fail(401, withFiles({ form, msg: uploadErr.message }));

    const { error: insertRowErr } = await supabase.from('category_list_tb').insert([
      {
        name: form.data.catName,
        img_link: `${publicAPI + storageRes.fullPath}?${crypto.randomUUID()}`
      }
    ]);

    if (insertRowErr) return fail(401, withFiles({ form, msg: insertRowErr.message }));

    return withFiles({ form, msg: 'Uploaded' });
  },

  updateCategoryEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateCatSchema));

    if (!form.valid) return fail(400, { form });

    const { data: storageRes, error: upsertErr } = await supabase.storage
      .from('category_bucket')
      .update(form.data.imgPath, form.data.newCatPhoto, { upsert: true });
    if (upsertErr) return fail(401, withFiles({ form, msg: upsertErr.message }));

    const { error: updateErr } = await supabase
      .from('category_list_tb')
      .update([
        {
          name: form.data.newCatName,
          img_link: `${publicAPI + storageRes.fullPath}?${crypto.randomUUID()}`
        }
      ])
      .eq('id', form.data.catId);

    if (updateErr) return fail(401, withFiles({ form, msg: updateErr.message }));

    return withFiles({ form, msg: 'Category updated.' });
  }
};

import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { AdminLayoutQ } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
  const { data, error } = await supabase.rpc('get_monthly_status_counts');

  console.log(data, error?.message);

  return {
    adminLayoutQ: (await supabase.rpc('admin_layout_q')) as PostgrestSingleResponse<AdminLayoutQ>
  };
};

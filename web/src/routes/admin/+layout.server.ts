import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { AdminLayoutQ } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
  return {
    adminLayoutQ: (await supabase.rpc('admin_layout_q')) as PostgrestSingleResponse<AdminLayoutQ>
  };
};

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
  return {
    adminLayoutQ: await supabase.rpc('admin_layout_q')
  };
};

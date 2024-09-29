import { EntrepLayoutQ } from '@/lib/db_types/entrepLayoutQ.types';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const getEntrepreneurLayoutQ = async () => {
  const { data, error } = (await supabase.rpc(
    'entrepreneur_layout_q',
  )) as PostgrestSingleResponse<EntrepLayoutQ>;

  return data;
};

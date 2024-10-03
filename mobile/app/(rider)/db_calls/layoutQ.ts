import { RiderLayoutQ } from '@/lib/db_types/riderLayoutQ.types';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const getRiderLayoutQ = async () => {
  const { data, error } = (await supabase.rpc(
    'rider_layout_q'
  )) as PostgrestSingleResponse<RiderLayoutQ>;

  return data;
};

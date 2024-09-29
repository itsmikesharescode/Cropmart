import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { FarmerLayoutQ } from '@/lib/db_types/farmerLayoutQ.types';

export const getFarmerLayoutQ = async () => {
  const { data, error } = (await supabase.rpc(
    'farmer_layout_q',
  )) as PostgrestSingleResponse<FarmerLayoutQ>;

  return data;
};

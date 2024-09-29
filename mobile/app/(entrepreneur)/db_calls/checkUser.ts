import { supabase } from '@/lib/supabase';

export const checkUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;
  else if (data) return data.user;
  return null;
};

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const getAllRatings = async () => {
    if (!supabase) return null;

    const { data, error } = await supabase.rpc('get_ratings_with_averages');
    console.log(data, error?.message);
    if (error) return null;
    return data;
  };

  return {
    getAllRatings: await getAllRatings()
  };
};

import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';

type RatingView = {
  farmer_id: string;
  average_rating: number;
};

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const getAllRatings = async () => {
    if (!supabase) return null;

    const { data, error } = (await supabase
      .from('farmer_ratings_average')
      .select('*')
      .order('average_rating')) as PostgrestSingleResponse<RatingView[]>;
    if (error) return null;
    return data;
  };

  return {
    getAllRatings: await getAllRatings()
  };
};

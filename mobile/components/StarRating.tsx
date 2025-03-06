import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import StarRating from 'react-native-star-rating-widget';
import { useUserSelector } from '@/store/useUser';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
interface StarRatingProps {
  farmerId: string;
}

const StarRatingComponent = ({ farmerId }: StarRatingProps) => {
  const userState = useUserSelector((state) => state.userState);

  const [count, setCount] = useState(0);
  const [currentRating, setCurrentRating] = useState(1);

  const [hasRated, setHasRated] = useState(false);

  const checkRatings = async () => {
    //overall count
    const { count: overallCount, error: overallError } = await supabase
      .from('ratings_tb')
      .select('*', { count: 'exact', head: true });

    if (overallError) return null;

    //total ratings
    const { count, error } = await supabase
      .from('ratings_tb')
      .select('*', { count: 'exact', head: true })
      .eq('farmer_id', farmerId);

    if (error) return null;
    if (!count || !overallCount) return null;

    return count / overallCount;
  };

  const hasUserRated = async () => {
    const { data, error } = (await supabase.rpc('has_user_rated', {
      farmer_id_client: farmerId
    })) as PostgrestSingleResponse<boolean>;

    if (error) return false;
    return data;
  };

  useEffect(() => {
    console.log(userState?.id);

    checkRatings().then((v) => {
      if (v) {
        setCount(v);
      }
    });

    hasUserRated().then((v) => {
      if (v) {
        setHasRated(v);
      }
    });
  }, []);

  return (
    <View className="flex-row items-center gap-2">
      <StarRating
        rating={currentRating}
        onChange={setCurrentRating}
        starSize={20}
        color="#FFD700"
        emptyColor="#FFD700"
      />
      <Text className="text-sm font-psemibold">{count.toFixed(2)} Ratings</Text>
    </View>
  );
};

export default StarRatingComponent;

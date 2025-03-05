import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import StarRating from 'react-native-star-rating-widget';
import { useUserSelector } from '@/store/useUser';
import { supabase } from '@/lib/supabase';
interface StarRatingProps {
  farmerId: string;
}
//TODO: implement an postgres function to check if a uid is already rated a farmer
const StarRatingComponent = ({ farmerId }: StarRatingProps) => {
  const userState = useUserSelector((state) => state.userState);
  const [count, setCount] = useState(0);
  const [currentRating, setCurrentRating] = useState(1);

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

  useEffect(() => {
    console.log(userState?.id);

    checkRatings().then((v) => {
      if (v) {
        setCount(v);
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

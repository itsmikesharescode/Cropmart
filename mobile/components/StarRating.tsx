import { View, Text, ActivityIndicator, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import StarRating from 'react-native-star-rating-widget';
import { useUserSelector } from '@/store/useUser';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { TouchableOpacity } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
interface StarRatingProps {
  farmerId: string;
}

const StarRatingComponent = ({ farmerId }: StarRatingProps) => {
  const userState = useUserSelector((state) => state.userState);

  const [count, setCount] = useState(0);
  const [currentRating, setCurrentRating] = useState(1);
  const [loader, setLoader] = useState(false);

  const [hasRated, setHasRated] = useState(false);

  const checkRatings = async () => {
    const { data, error } = (await supabase.rpc('calculate_rating', {
      farmer_id_client: farmerId
    })) as PostgrestSingleResponse<number>;

    if (error) return null;
    return data;
  };

  const hasUserRated = async () => {
    const { data, error } = (await supabase.rpc('has_user_rated', {
      farmer_id_client: farmerId
    })) as PostgrestSingleResponse<boolean>;

    if (error) return false;
    return data;
  };

  const submitRatingHandler = async () => {
    setLoader(true);
    const { error } = await supabase.from('ratings_tb').insert({
      entrep_id: userState?.id,
      farmer_id: farmerId,
      rating: currentRating
    });

    if (error) {
      setLoader(false);
      return;
    }

    ToastAndroid.show('Thank you for rating!', ToastAndroid.SHORT);

    setLoader(false);
  };

  useEffect(() => {
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
  }, [submitRatingHandler]);

  return (
    <View className="flex-row items-center gap-2 mb-10">
      {hasRated ? (
        <View className="gap-2 flex-row items-center">
          <StarRatingDisplay rating={count} starSize={30} color="#FFD700" emptyColor="#FFD700" />

          <Text className="text-sm font-psemibold">{count.toFixed(2)} Ratings</Text>
        </View>
      ) : (
        <View className="gap-2 flex-row items-center">
          <View>
            <TouchableOpacity
              onPress={submitRatingHandler}
              className={`${loader ? 'opacity-50' : ''} bg-primary rounded-lg items-center justify-center`}
            >
              <Text className="text-secondary-100 text-xs py-1">
                {loader ? 'Rating...' : 'Rate'}
              </Text>
            </TouchableOpacity>
            <StarRating
              rating={currentRating}
              onChange={setCurrentRating}
              starSize={30}
              color="#FFD700"
              emptyColor="#FFD700"
            />
          </View>
          <Text className="text-sm font-psemibold">Current {count.toFixed(2)} Ratings</Text>
        </View>
      )}
    </View>
  );
};

export default StarRatingComponent;

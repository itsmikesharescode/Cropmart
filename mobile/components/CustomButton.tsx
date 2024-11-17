import { useCounterSelectors } from '@/store/counter';
import { TouchableOpacity, Text } from 'react-native';
import type { GestureResponderEvent } from 'react-native';

interface CustomBotton {
  title: string;
  handPress: (event: GestureResponderEvent) => void;
  containerStyle: string;
  textStyle?: string;
  isLoading: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomBotton> = ({
  title,
  handPress,
  containerStyle,
  textStyle,
  isLoading,
  disabled
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      onPress={handPress}
      className={`bg-primary rounded-xl min-h-[62px] w-full justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
    >
      <Text
        className={`${isLoading ? 'text-black' : 'text-secondary-200'}  font-psemibold text-lg ${textStyle}`}
      >
        {isLoading ? 'Please wait...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

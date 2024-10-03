import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router, usePathname } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View
} from 'react-native';

interface SearchInput {
  placeholder: string;
  handleChangeText?: ((text: string) => void) | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  initialQuery: string;
}

const SearchInput: React.FC<SearchInput> = ({ initialQuery, placeholder, onBlur }) => {
  const pathName = usePathname();
  const [query, setQuery] = useState(initialQuery || '');
  return (
    <View className="px-2">
      <View className="w-full flex-row h-16 px-4 bg-secondary-200  rounded-2xl focus:border-primary focus:border-2 items-center">
        <TextInput
          value={query}
          className="flex-1 font-psemibold text-base"
          placeholder="Search product name"
          placeholderTextColor="#7b7b8b"
          onChangeText={(e) => setQuery(e)}
        />
        <TouchableOpacity
          onPress={() => {
            if (!query)
              return Alert.alert(
                'Missing Inputs',
                'Please input something to search results products.'
              );

            if (pathName.startsWith('/(entrepreneur)/products-search')) router.setParams({ query });
            else router.push(`/(entrepreneur)/products-search/${query}`);
          }}
          className="p-2 rounded-full"
        >
          <FontAwesome5 name="search" size={24} color="#91B43F" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;

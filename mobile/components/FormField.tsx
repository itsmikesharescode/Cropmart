import { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  KeyboardTypeOptions,
} from 'react-native';

import { icons } from '../constants';

interface FormField {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: ((text: string) => void) | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

const FormField: React.FC<FormField> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  onBlur,
  keyboardType,
  secureTextEntry,
}) => {
  const [showPwd, setShowPwd] = useState(true);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-pmedium">{title}</Text>
      <View className="w-full flex-row h-16 px-4 bg-secondary-200  rounded-2xl focus:border-primary focus:border-2 items-center">
        <TextInput
          keyboardType={keyboardType}
          onBlur={onBlur}
          className="flex-1 font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry && showPwd}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
            <Image
              source={!showPwd ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

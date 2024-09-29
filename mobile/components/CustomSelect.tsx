import React, { useState } from 'react';
import { TouchableOpacity, Text, View, FlatList, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Selection {
  id: number;
  value: string;
}

interface CustomSelectProps {
  title: string;
  otherStyles: string;
  value: string;
  selection: Array<Selection>;
  onSelect: (item: Selection) => void;
}

const SelectionSnippet: React.FC<Selection & { onSelect: (item: Selection) => void }> = ({
  id,
  value,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect({ id, value })}
      className="p-4 border-b border-gray-200"
    >
      <Text className="text-[25px] text-center">{value}</Text>
    </TouchableOpacity>
  );
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  title,
  otherStyles,
  value,
  selection,
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: Selection) => {
    onSelect(item);
    setModalVisible(false);
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-pmedium">{title}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="w-full flex-row h-16 px-4 bg-secondary-200 rounded-2xl focus:border-primary focus:border-2 items-center"
      >
        <Text
          className={`flex-1 font-psemibold text-base ${value ? 'text-black' : 'text-gray-500'}`}
        >
          {value || `Select ${title}`}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-lg font-bold">{title}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text className="text-blue-500">Close</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={selection}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <SelectionSnippet id={item.id} value={item.value} onSelect={handleSelect} />
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default CustomSelect;

import React from 'react';
import {FlatList, View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';

export type MultiSelectProps = {
  options: string[];
  checkedItems?: string[];
  onChange: (value: string[]) => void;
};

export const MultiSelect = ({
  options,
  onChange,
  checkedItems,
}: MultiSelectProps) => {
  //   const [visible, setVisible] = useState(false);
  const handlCheckPress = (item: string) => {
    if (checkedItems?.includes(item)) {
      const newCheckedItems = checkedItems.filter(i => i !== item);
      //   setCheckedItems(newCheckedItems);
      onChange(newCheckedItems);
    } else {
      const newCheckedItems = checkedItems ? [...checkedItems, item] : [item];
      //   setCheckedItems(newCheckedItems);
      onChange(newCheckedItems);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        maxHeight: 200,
      }}>
      <FlatList
        data={options}
        renderItem={item => (
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Checkbox
              status={
                checkedItems?.includes(item.item) ? 'checked' : 'unchecked'
              }
              onPress={() => handlCheckPress(item.item)}
            />
            <Text>{item.item}</Text>
          </View>
        )}
      />
    </View>
  );
};

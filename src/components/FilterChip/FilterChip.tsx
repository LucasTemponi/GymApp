import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {DefaultTheme, Modal, Portal, Text} from 'react-native-paper';
import {MultiSelect, MultiSelectProps} from '../MultiSelect/MultiSelect';

type Props = {
  title: string;
  activeFilters?: string[];
} & MultiSelectProps;
export const FilterChip = ({
  activeFilters,
  title,
  options,
  onChange,
}: Props) => {
  const [openSelect, setOpenSelect] = useState(false);

  return (
    <>
      <Pressable onPress={() => setOpenSelect(!openSelect)}>
        <View style={styles.chip}>
          <Text variant="labelLarge">{title}</Text>
          <Text variant="labelSmall" style={styles.badge}>
            {activeFilters?.length || 'All'}
          </Text>
        </View>
      </Pressable>
      <Portal>
        <Modal
          contentContainerStyle={styles.modalContainer}
          visible={openSelect}
          onDismiss={() => setOpenSelect(false)}>
          <MultiSelect
            checkedItems={activeFilters}
            onChange={onChange}
            options={options}
          />
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: DefaultTheme.colors.primary,
    // backgroundColor: DefaultTheme.colors.secondary,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  badge: {
    backgroundColor: DefaultTheme.colors.secondary,
    borderRadius: 60,
    padding: 2,
    width: 20,
    // fontSize: DefaultTheme.fonts.labelSmall.fontSize,
    position: 'absolute',
    top: -5,
    right: -5,
    textAlign: 'center',
  },
});

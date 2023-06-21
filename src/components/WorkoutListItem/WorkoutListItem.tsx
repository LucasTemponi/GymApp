import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {WorkoutRoutineType} from '../../types/types';
import {DefaultTheme, IconButton, Menu} from 'react-native-paper';

export type Props = {
  item: WorkoutRoutineType;
  id: number;
  onEdit?: () => void;
  onSelect?: () => void;
  onRemove?: () => void;
};

export const WorkoutListItem = ({
  item,
  onEdit,
  onSelect,
  id,
  onRemove,
}: Props) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={styles.container}>
        <Text style={styles.text} key={item.name}>
          {item.name || `Treino ${id + 1}`}
        </Text>
        <Menu
          anchor={
            <IconButton
              style={styles.menuButton}
              icon={'dots-vertical'}
              onPress={() => setVisible(!visible)}
            />
          }
          visible={visible}
          onDismiss={() => setVisible(false)}>
          {!!onEdit && <Menu.Item onPress={onEdit} title="Edit" />}
          {!!onSelect && <Menu.Item onPress={onSelect} title="View" />}
          {!!onRemove && (
            <Menu.Item
              onPress={onRemove}
              titleStyle={{color: 'red'}}
              title="Remove"
            />
          )}
        </Menu>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 75,
    backgroundColor: DefaultTheme.colors.backdrop,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  menuButton: {
    display: 'flex',
    marginTop: 17,
  },
});

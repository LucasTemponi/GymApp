import React from 'react';
import {IconButton, Menu, Text} from 'react-native-paper';
import {View, Image} from 'react-native';
import {WorkoutExerciseType} from '../../types/types';
import {styles} from './styles';
import {SetInfo} from '../SetInfo/SetInfo';

type Props = {
  workoutExercise: WorkoutExerciseType;
  onEdit: () => void;
  onRemove: () => void;
};

export const WorkoutExercise = ({workoutExercise, onEdit, onRemove}: Props) => {
  const [visible, setVisible] = React.useState(false);

  const handleEdit = () => {
    setVisible(false);
    onEdit();
  };
  const handleRemove = () => {
    setVisible(false);
    onRemove();
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={{
          uri: workoutExercise.exercise.gifUrl,
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {workoutExercise.exercise.name.charAt(0).toUpperCase() +
            workoutExercise.exercise.name.slice(1)}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 1}}>
          {workoutExercise.sets?.map(set => (
            <SetInfo set={set} />
          ))}
        </View>
      </View>
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
        <Menu.Item onPress={handleEdit} title="Edit" />
        <Menu.Item onPress={handleRemove} title="Remove" />
      </Menu>
    </View>
  );
};

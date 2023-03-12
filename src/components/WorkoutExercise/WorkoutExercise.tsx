import React from 'react';
import {Text} from 'react-native-paper';
import {View, Image} from 'react-native';
import {WorkoutExerciseType} from '../../types/types';
import {styles} from './styles';

type Props = {
  workoutExercise: WorkoutExerciseType;
};

export const WorkoutExercise = ({workoutExercise}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: workoutExercise.exercise.gifUrl,
        }}
      />
      <View>
        <Text>
          {workoutExercise.exercise.name.charAt(0).toUpperCase() +
            workoutExercise.exercise.name.slice(1)}
        </Text>
      </View>
      <View>
        <Text>Sets</Text>
      </View>
    </View>
  );
};

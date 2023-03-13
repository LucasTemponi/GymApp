import React from 'react';
import {Text} from 'react-native-paper';
import {View, Image} from 'react-native';
import {WorkoutExerciseType} from '../../types/types';
import {styles} from './styles';

type Props = {
  workoutExercise: WorkoutExerciseType;
};

export const WorktouSet = ({workoutExercise}: Props) => {
  return (
    <View style={styles.container}>
      <Image
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
        <Text>{workoutExercise.sets?.map(set => set.reps)}</Text>
      </View>
    </View>
  );
};

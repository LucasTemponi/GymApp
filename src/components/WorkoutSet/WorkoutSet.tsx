import React from 'react';
import {Text} from 'react-native-paper';
import {View, Image} from 'react-native';
import {WorkoutExerciseType} from '../../types/types';

type Props = {
  workoutExercise: WorkoutExerciseType;
};

export const WorktouSet = ({workoutExercise}: Props) => {
  return (
    <View>
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
        <Text>Sets</Text>
      </View>
    </View>
  );
};

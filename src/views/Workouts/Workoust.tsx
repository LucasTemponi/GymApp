import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreensStackList, WorkoutRoutine} from '../../types/types';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<ScreensStackList, 'Workout routine'>;

export default function Workouts({navigation}: Props) {
  const [workouts, setWorkouts] = useState<WorkoutRoutine[]>([]);

  useEffect(() => {
    AsyncStorage.getAllKeys().then(keys => {
      keys.forEach(key => {
        AsyncStorage.getItem(key).then(workout => {
          if (workout) {
            setWorkouts(workoutsState => [
              ...workoutsState,
              JSON.parse(workout),
            ]);
          }
        });
      });
    });
  }, []);
  return (
    <>
      {workouts.map(workout => (
        <Text
          onPress={() =>
            navigation.navigate('Workout routine', {
              routine: workout,
              routineId: workout.id,
            })
          }>
          {workout.name}
        </Text>
      ))}
    </>
  );
}

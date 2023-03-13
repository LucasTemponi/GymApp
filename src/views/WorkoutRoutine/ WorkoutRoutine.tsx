import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {FAB} from 'react-native-paper';
import {WorkoutExercise} from '../../components/WorkoutExercise/WorkoutExercise';
import {ScreensStackList} from '../../types/types';
import {styles} from './styles';

type Props = NativeStackScreenProps<ScreensStackList, 'Workout routine'>;

export const WorkoutRoutine = ({navigation, route}: Props) => {
  const {routine, routineId} = route.params;

  const [routineState, setRoutineState] = useState(routine);

  useEffect(() => {
    navigation.setOptions({
      title: routine ? routine?.name : 'New workout',
    });
  }, [routine, navigation]);

  const handleAdd = () => {
    navigation.navigate('Home', {
      state: 'addingToRoutine',
      routineId: routineId,
    });
  };

  console.log(routineId);
  useEffect(() => {
    async function getRoutineFromStorage() {
      const data = await AsyncStorage.getItem(routineId.toString());

      if (data) {
        setRoutineState(JSON.parse(data));
      }
    }

    getRoutineFromStorage();
  }, [routineId]);

  console.log(routineState);
  return (
    <View style={styles.container}>
      {routineState?.exercises &&
        routineState?.exercises?.map((exercise, index) => (
          <WorkoutExercise
            key={exercise.exercise.name + index}
            workoutExercise={exercise}
          />
        ))}
      <FAB icon="plus" style={styles.fab} onPress={handleAdd} />
    </View>
  );
};

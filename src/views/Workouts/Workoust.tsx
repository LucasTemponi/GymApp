import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreensStackList, WorkoutRoutineType} from '../../types/types';
import {ActivityIndicator, Button, FAB, Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';

type Props = NativeStackScreenProps<ScreensStackList, 'Workout routine'>;

export default function Workouts({navigation}: Props) {
  const [workouts, setWorkouts] = useState<WorkoutRoutineType[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAdd = () => {
    navigation.navigate('Workout routine', {
      routine: undefined,
      routineId: new Date().getSeconds(),
      edit: true,
    });
  };

  useFocusEffect(
    useCallback(() => {
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
      setLoading(false);

      return () => setWorkouts([]);
    }, []),
  );

  return loading ? (
    <ActivityIndicator />
  ) : (
    <>
      {workouts.map((workout, index) => (
        <Text
          style={styles.text}
          key={workout.name + index}
          onLongPress={() =>
            navigation.navigate('Workout routine', {
              routine: workout,
              routineId: workout.id,
              edit: true,
            })
          }
          onPress={() =>
            navigation.navigate('Workout routine', {
              routine: workout,
              routineId: workout.id,
            })
          }>
          {workout.name || `Treino ${index + 1}`}
        </Text>
      ))}
      <FAB icon="plus" style={styles.fab} onPress={handleAdd} />
      <Button mode="elevated" onPress={() => AsyncStorage.clear()}>
        Clear storage
      </Button>
    </>
  );
}

import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainStackList, WorkoutRoutineType} from '../../types/types';
import {ActivityIndicator, FAB, Text} from 'react-native-paper';
import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useActiveWorkout} from '../../contexts/ActiveWorkoutContext/ActiveWorkoutContext';

type Props = MaterialBottomTabScreenProps<MainStackList, 'Workout routine'>;

export default function Workouts({navigation}: Props) {
  const [workouts, setWorkouts] = useState<WorkoutRoutineType[]>([]);
  const [loading, setLoading] = useState(true);
  const {activeWorkout} = useActiveWorkout();

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
      <FlatList
        data={workouts}
        renderItem={({item, index}) => (
          <Text
            style={styles.text}
            key={item.name + index}
            onLongPress={() =>
              navigation.navigate('Workout routine', {
                routine: item,
                routineId: item.id,
                edit: true,
              })
            }
            onPress={() =>
              activeWorkout?.id === item.id
                ? navigation.navigate('Working out')
                : navigation.navigate('Workout routine', {
                    routine: item,
                    routineId: item.id,
                  })
            }>
            {item.name || `Treino ${index + 1}`}
          </Text>
        )}
      />
      <FAB icon="plus" style={styles.fab} onPress={handleAdd} />
      {/* <Button mode="elevated" onPress={() => AsyncStorage.clear()}>
        Clear storage
      </Button> */}
    </>
  );
}

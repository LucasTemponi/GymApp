import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainStackList, WorkoutRoutineType} from '../../types/types';
import {ActivityIndicator, FAB} from 'react-native-paper';
import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useActiveWorkout} from '../../contexts/ActiveWorkoutContext/ActiveWorkoutContext';
import {WorkoutListItem} from '../../components/WorkoutListItem/WorkoutListItem';

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

  const handleRemoveWorkout = useCallback(
    async (workoutId: Number) => {
      const newWorkoutList = workouts?.filter(item => item.id !== workoutId);
      setWorkouts(newWorkoutList);
      try {
        await AsyncStorage.removeItem(workoutId.toString());
      } catch (e) {
        console.log(e);
      }
    },
    [workouts],
  );

  useFocusEffect(
    useCallback(() => {
      const workoutsList: WorkoutRoutineType[] = [];
      AsyncStorage.getAllKeys().then(keys => {
        keys.forEach(key => {
          AsyncStorage.getItem(key)
            .then(workout => {
              if (workout) {
                workoutsList.push(JSON.parse(workout));
              }
            })
            .then(() => {
              setWorkouts(workoutsList);
            });
        });
      });
      setLoading(false);

      return () => {
        setWorkouts([]);
        setLoading(true);
      };
    }, []),
  );
  return loading ? (
    <ActivityIndicator />
  ) : (
    <>
      <FlatList
        data={workouts}
        style={styles.flatList}
        renderItem={({item, index}) => (
          <WorkoutListItem
            item={item}
            id={index}
            onEdit={() =>
              navigation.navigate('Workout routine', {
                routine: item,
                routineId: item.id,
                edit: true,
              })
            }
            onSelect={() =>
              activeWorkout?.id === item.id
                ? navigation.navigate('Working out')
                : navigation.navigate('Workout routine', {
                    routine: item,
                    routineId: item.id,
                  })
            }
            onRemove={() => handleRemoveWorkout(item.id)}
          />
        )}
      />
      <FAB icon="plus" style={styles.fab} onPress={handleAdd} />
      {/* <Button mode="elevated" onPress={() => AsyncStorage.clear()}>
        Clear storage
      </Button> */}
    </>
  );
}

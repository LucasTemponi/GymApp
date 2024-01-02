import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {FAB, TextInput} from 'react-native-paper';
import {WorkoutExercise} from '../../components/WorkoutExercise/WorkoutExercise';
import {MainStackList, WorkoutRoutineType} from '../../types/types';
import {styles} from './styles';
import {useActiveWorkout} from '../../contexts/ActiveWorkoutContext/ActiveWorkoutContext';

type Props = NativeStackScreenProps<MainStackList, 'Workout routine'>;

export const WorkoutRoutine = ({navigation, route}: Props) => {
  const {routine, routineId, edit} = route.params;
  const [routineState, setRoutineState] = useState<WorkoutRoutineType>({
    ...routine,
    id: routineId,
    name: routine ? routine?.name : 'New workout',
  });
  useEffect(() => {
    navigation.setOptions({
      title: routineState.name,
    });
  }, [routineState, navigation]);

  const {setActiveWorkout} = useActiveWorkout();

  const handleFAB = useCallback(() => {
    if (edit) {
      navigation.navigate('Exercises', {
        state: 'addingToRoutine',
        routineId: routineId,
      });
    } else {
      setActiveWorkout(routineState);
      navigation.navigate('Working out');
    }
  }, [navigation, routineId, edit, setActiveWorkout, routineState]);

  const handleRemoveExercise = useCallback(
    async (exerciseId: string) => {
      const newRoutineExercises = routineState.exercises?.filter(
        item => item.exercise.id !== exerciseId,
      );
      const newRoutine = {
        ...routineState,
        exercises: newRoutineExercises,
      };

      setRoutineState(newRoutine);
      try {
        await AsyncStorage.setItem(
          routineId.toString(),
          JSON.stringify(newRoutine),
        );
      } catch (e) {
        console.log(e);
      }
    },
    [routineState, routineId],
  );

  async function handleSaveNewName() {
    try {
      await AsyncStorage.setItem(
        routineId.toString(),
        JSON.stringify(routineState),
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (routine) {
      setRoutineState(oldState => ({...oldState, ...routine}));
    }
  }, [routine]);

  useEffect(() => {
    async function getRoutineFromStorage() {
      const data = await AsyncStorage.getItem(routineId.toString());

      if (data) {
        setRoutineState(JSON.parse(data));
      }
    }

    getRoutineFromStorage();
  }, [routineId]);

  return (
    <View style={styles.container}>
      {edit && (
        <TextInput
          style={{
            width: '100%',
            marginBottom: 5,
          }}
          label="Workout name"
          value={routineState?.name}
          onChangeText={text =>
            setRoutineState(oldState => ({...oldState, name: text}))
          }
          onBlur={handleSaveNewName}
        />
      )}
      <FlatList
        style={{height: '100%', width: '100%'}}
        data={routineState?.exercises}
        renderItem={({item, index}) => (
          <WorkoutExercise
            showMenu={!!edit}
            key={item.exercise.name + index}
            onRemove={() => handleRemoveExercise(item.exercise.id)}
            onEdit={() =>
              navigation.navigate('Add to routine', {
                workoutExercise: item,
                routineId,
              })
            }
            workoutExercise={item}
          />
        )}
      />

      <FAB
        icon={edit ? 'plus' : 'play'}
        style={styles.fab}
        onPress={handleFAB}
      />
    </View>
  );
};

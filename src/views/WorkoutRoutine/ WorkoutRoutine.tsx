import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FAB, IconButton, TextInput} from 'react-native-paper';
import {WorkoutExercise} from '../../components/WorkoutExercise/WorkoutExercise';
import {ScreensStackList, WorkoutRoutineType} from '../../types/types';
import {styles} from './styles';
import {useActiveWorkout} from '../../contexts/ActiveWorkoutContext/ActiveWorkoutContext';

type Props = NativeStackScreenProps<ScreensStackList, 'Workout routine'>;

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

  const {setActiveWorkout, handlePause} = useActiveWorkout();

  const handleFAB = useCallback(() => {
    if (edit) {
      navigation.navigate('Exercises', {
        state: 'addingToRoutine',
        routineId: routineId,
      });
    } else {
      setActiveWorkout(routineState);
      navigation.navigate('Workig out');
      // if (activeWorkout) {
      //   handleStartTimer();
      // }
      // if (routineState && !activeWorkout) {
      //   setActiveWorkout(routineState);
      // }
    }
  }, [
    navigation,
    routineId,
    edit,
    setActiveWorkout,
    routineState,
    // activeWorkout,
    // handleStartTimer,
  ]);

  async function handleSaveNewName() {
    try {
      await AsyncStorage.setItem(
        routineId.toString(),
        JSON.stringify({...routineState}),
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
      <FlatList
        style={{height: '100%', width: '100%'}}
        data={routineState?.exercises}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Add to routine', {
                workoutExercise: item,
                routineId,
              })
            }>
            <WorkoutExercise
              key={item.exercise.name + index}
              workoutExercise={item}
            />
          </TouchableOpacity>
        )}
      />

      <FAB
        icon={edit ? 'plus' : 'play'}
        style={styles.fab}
        onPress={handleFAB}
      />
      <IconButton onPress={handlePause} icon={'pause'} />
    </View>
  );
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Image, View, Text, KeyboardAvoidingView} from 'react-native';
import {FAB, IconButton, TextInput} from 'react-native-paper';
import {
  ExerciseSet,
  MainStackList,
  WorkoutExerciseType,
  WorkoutRoutineType,
} from '../../types/types';
import {styles} from './styles';
import {FlatList} from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<MainStackList, 'Add to routine'>;

export const AddExerciseToRoutine = ({route, navigation}: Props) => {
  const {workoutExercise, routineId} = route.params;

  const [sets, setSets] = useState<ExerciseSet[]>(
    workoutExercise.sets
      ? workoutExercise.sets
      : [{load: 0, reps: 0, restTime: 0}],
  );

  const handleSetChange = (
    setIndex: number,
    setObjectKey: keyof ExerciseSet,
    text: number,
  ) => {
    const newSetsValue = [...sets];
    newSetsValue[setIndex][setObjectKey] = text;
    setSets(newSetsValue);
  };

  const handleAddSet = () => {
    setSets(oldValue => [...oldValue, oldValue[oldValue.length - 1]]);
  };

  async function handleSaveExerciseToRoutine() {
    const newExercise: WorkoutExerciseType = {
      exercise: workoutExercise.exercise,
      sets: sets,
    };
    try {
      const data = await AsyncStorage.getItem(routineId.toString());
      const routine: WorkoutRoutineType = data
        ? JSON.parse(data)
        : {exercises: []};

      const exerciseIndex = routine.exercises?.findIndex(item => {
        return item.exercise.id === newExercise.exercise.id;
      });

      if (
        typeof exerciseIndex !== 'undefined' &&
        exerciseIndex >= 0 &&
        !!routine?.exercises
      ) {
        routine.exercises[exerciseIndex] = newExercise;
      } else if (routine.exercises && routine.exercises.length > 0) {
        routine.exercises.push(newExercise);
      } else {
        routine.exercises = [newExercise];
      }

      await AsyncStorage.setItem(routineId.toString(), JSON.stringify(routine));
      navigation.navigate('Workout routine', {
        routineId: routineId,
        routine: routine,
        edit: true,
      });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (workoutExercise) {
      navigation.setOptions({
        title:
          workoutExercise?.exercise.name.charAt(0).toUpperCase() +
          workoutExercise?.exercise.name.slice(1),
      });
    }
  }, [workoutExercise, navigation]);

  console.log('estou aqui');

  return (
    <View style={styles?.container}>
      <Image
        style={styles.imageContainer}
        source={{uri: workoutExercise?.exercise?.gifUrl}}
      />

      <FlatList
        data={sets}
        renderItem={({item, index}) => {
          return (
            <KeyboardAvoidingView style={styles.setContainer}>
              <Text>Reps:</Text>
              <TextInput
                onChangeText={text =>
                  handleSetChange(index, 'reps', Number(text))
                }
                style={styles.input}
                keyboardType="numeric"
                value={item.reps.toString()}
              />
              <Text>Load:</Text>
              <TextInput
                onChangeText={text =>
                  handleSetChange(index, 'load', Number(text))
                }
                style={styles.input}
                keyboardType="numeric"
                value={item.load.toString()}
              />
              <Text>Interval:</Text>
              <TextInput
                onChangeText={text =>
                  handleSetChange(index, 'restTime', Number(text))
                }
                style={styles.input}
                keyboardType="numeric"
                value={item.restTime.toString()}
              />
            </KeyboardAvoidingView>
          );
        }}
      />

      <View
        style={{
          width: '100%',
          gap: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <IconButton onPress={handleAddSet} icon={'plus'} />
        <FAB onPress={handleSaveExerciseToRoutine} label="Save" />
      </View>
    </View>
  );
};

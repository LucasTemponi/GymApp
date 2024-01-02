import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Image, View, Text, KeyboardAvoidingView, FlatList} from 'react-native';
import {FAB, TextInput} from 'react-native-paper';
import {
  ExerciseSet,
  MainStackList,
  WorkoutExerciseType,
  WorkoutRoutineType,
} from '../../types/types';
import {styles} from './styles';

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
    const oldSets = JSON.parse(JSON.stringify(sets));
    const lastSet = JSON.parse(JSON.stringify(sets[sets.length - 1]));
    setSets([...oldSets, lastSet]);
  };

  useEffect(() => {
    navigation.addListener('blur', () => {
      const newExercise: WorkoutExerciseType = {
        exercise: workoutExercise.exercise,
        sets: sets,
      };
      AsyncStorage.getItem(routineId.toString())
        .then(data => {
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
          AsyncStorage.setItem(routineId.toString(), JSON.stringify(routine))
            .then(() => {
              navigation.navigate('Workout routine', {
                routineId: routineId,
                routine: routine,
                edit: true,
              });
            })
            .catch(error => {
              console.log('error', error);
            });
        })
        .catch(error => {
          console.log('error', error);
        });
    });
  }, [navigation, routineId, sets, workoutExercise.exercise]);

  useEffect(() => {
    if (workoutExercise?.exercise?.name) {
      navigation.setOptions({
        title:
          workoutExercise?.exercise.name.charAt(0).toUpperCase() +
          workoutExercise?.exercise.name.slice(1),
      });
    }
  }, [workoutExercise?.exercise?.name, navigation]);

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
      <FAB style={styles.fab} onPress={handleAddSet} icon="plus" />
    </View>
  );
};

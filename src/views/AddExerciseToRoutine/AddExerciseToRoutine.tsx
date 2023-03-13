import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Image, View, Text} from 'react-native';
import {FAB, IconButton, TextInput} from 'react-native-paper';
import {
  ExerciseSet,
  ScreensStackList,
  WorkoutExerciseType,
  WorkoutRoutine,
} from '../../types/types';
import {styles} from './styles';

type Props = NativeStackScreenProps<ScreensStackList, 'Add to routine'>;

export const AddExerciseToRoutine = ({route, navigation}: Props) => {
  const {exercise, routineId} = route.params;

  const [sets, setSets] = useState<ExerciseSet[]>([]);

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
    setSets(oldValue => [...oldValue, {load: 0, reps: 0, restTime: 0}]);
  };

  async function handleSaveExerciseToRoutine() {
    const newExercise: WorkoutExerciseType = {
      exercise: exercise,
      sets: sets,
    };
    try {
      const data = await AsyncStorage.getItem(routineId.toString());
      const routine: WorkoutRoutine = data && JSON.parse(data);

      const newRoutineData: WorkoutRoutine = {
        ...routine,
        exercises: routine?.exercises
          ? [...routine?.exercises, newExercise]
          : [newExercise],
      };
      await AsyncStorage.mergeItem(
        routineId.toString(),
        JSON.stringify(newRoutineData),
      );
      navigation.navigate('Workout routine', {routineId: routineId});
    } catch (e) {
      console.log(e);
    }
  }
  console.log(routineId);
  console.log(sets);
  // useEffect(() => {
  //     if (exercise) {
  //       navigation.setOptions({
  //         title: exercise?.name.charAt(0).toUpperCase() + exercise?.name.slice(1),
  //       });
  //     }
  //   }, [exercise, navigation]);

  return (
    <View style={styles?.container}>
      <Image style={styles.imageContainer} source={{uri: exercise?.gifUrl}} />

      {sets.map((set, index) => (
        <View key={index} style={styles.setContainer}>
          <Text>Reps:</Text>
          <TextInput
            onChangeText={text => handleSetChange(index, 'reps', Number(text))}
            style={styles.input}
            keyboardType="numeric"
          />
          <Text>Load:</Text>
          <TextInput
            onChangeText={text => handleSetChange(index, 'load', Number(text))}
            style={styles.input}
            keyboardType="numeric"
          />
          <Text>Interval:</Text>
          <TextInput
            onChangeText={text =>
              handleSetChange(index, 'restTime', Number(text))
            }
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
      ))}
      <IconButton onPress={handleAddSet} icon={'plus'} />
      <FAB onPress={handleSaveExerciseToRoutine} label="Save" />
    </View>
  );
};

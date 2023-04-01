import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FAB, TextInput} from 'react-native-paper';
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
      <FAB icon="plus" style={styles.fab} onPress={handleAdd} />
    </View>
  );
};

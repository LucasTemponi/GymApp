import React, {useCallback} from 'react';
import {FlatList, Image, View} from 'react-native';

import {Text, TextInput} from 'react-native-paper';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';

import {styles} from './styles';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Exercise, ScreensStackList} from '../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com/exercises',
  timeout: 1000,
  headers: {
    'X-RapidAPI-Key': '16aebbac70msh81aa02278bca4ddp179321jsncc2788d06127',
    'X-RapidAPI': 'Host:exercisedb.p.rapidapi.com',
  },
});

type Props = NativeStackScreenProps<ScreensStackList, 'Home'>;

export const Home = ({route, navigation}: Props) => {
  const [exercices, setExercices] = useState<Exercise[]>();
  const [workouts, setWorkouts] = useState<readonly string[]>([]);
  const [query, setQuery] = useState('');
  const {state, routineId} = route.params;

  const handleSearch = (text: string) => {
    setQuery(text);
  };

  const handleExercisePress = useCallback(
    (exercise: Exercise) => {
      if (state === 'viewing') {
        navigation.navigate('Exercise Details', {exercise});
      } else if (state === 'addingToRoutine') {
        navigation.navigate('Add to routine', {
          workoutExercise: {exercise},
          routineId: routineId || new Date().getSeconds(),
        });
      }
    },
    [state, navigation, routineId],
  );

  useEffect(() => {
    instance
      .get('')
      .then(result => setExercices(result.data))
      .catch(error => console.log(error));
    AsyncStorage.getAllKeys().then(result => {
      console.log(result);
      setWorkouts(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        label="Busca"
        onChangeText={handleSearch}
        right={<TextInput.Icon icon="magnify" />}
      />
      <FlatList
        data={exercices?.filter(exercice =>
          exercice.name.includes(query.toLowerCase()),
        )}
        renderItem={({item}) => (
          <View style={styles.exerciceContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.gifUrl,
              }}
            />
            <Text onPress={() => handleExercisePress(item)}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
          </View>
        )}
      />
      <Button
        mode="elevated"
        onPress={() =>
          navigation.navigate('Workout routine', {
            routine: undefined,
            routineId: new Date().getSeconds(),
          })
        }>
        New workout
      </Button>
      <Button mode="elevated" onPress={() => AsyncStorage.clear()}>
        Clear storage
      </Button>
      {workouts.map((workout, index) => {
        return (
          <Button
            key={index}
            mode="elevated"
            onPress={() =>
              navigation.navigate('Workout routine', {
                routine: undefined,
                routineId: Number(workout),
              })
            }>
            {workout}
          </Button>
        );
      })}
    </View>
  );
};

export default Home;

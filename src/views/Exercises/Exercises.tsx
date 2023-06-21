import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';

import {ActivityIndicator, TextInput} from 'react-native-paper';
import axios from 'axios';
import {useEffect, useState} from 'react';

import {styles} from './styles';
import {Exercise, MainStackList, TabStackList} from '../../types/types';
import {ExerciseCard} from '../../components/ExerciseCard/ExerciseCard';
import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const instance = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com/exercises',
  timeout: 1000,
  headers: {
    'X-RapidAPI-Key': '16aebbac70msh81aa02278bca4ddp179321jsncc2788d06127',
    'X-RapidAPI': 'Host:exercisedb.p.rapidapi.com',
  },
});

type Props = CompositeScreenProps<
  NativeStackScreenProps<MainStackList, 'Exercises'>,
  MaterialBottomTabScreenProps<TabStackList, 'Exercices'>
>;

export const Exercises = ({route, navigation}: Props) => {
  const [exercices, setExercices] = useState<Exercise[]>();
  const [query, setQuery] = useState('');
  const {state, routineId} = route.params;
  const [loading, setLoading] = useState(true);

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
      .then(result => {
        setExercices(result.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TextInput
            style={styles.searchBox}
            label="Busca"
            onChangeText={handleSearch}
            right={<TextInput.Icon icon="magnify" />}
          />
          <FlatList
            numColumns={2}
            style={{width: '100%'}}
            data={exercices?.filter(exercice =>
              exercice.name.includes(query.toLowerCase()),
            )}
            renderItem={({item}) => (
              <ExerciseCard
                exercise={item}
                onPress={() => handleExercisePress(item)}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

export default Exercises;

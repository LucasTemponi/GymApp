import React, {useCallback, useMemo} from 'react';
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
import {FilterChip} from '../../components/FilterChip/FilterChip';
import {
  getBodyParts,
  getEquipments,
  getExercises,
} from '../../services/exercises-db';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MainStackList, 'Exercises'>,
  MaterialBottomTabScreenProps<TabStackList, 'Exercices'>
>;

const getUniqueItems = <T, U extends keyof T>(arr?: T[], key?: U) => {
  if (!arr) {
    return [];
  }
  const uniqueItems: string[] = [];

  if (typeof arr[0] === 'string') {
    for (let i = 0; i < arr.length; i++) {
      if (!uniqueItems.includes(arr[i] as string)) {
        uniqueItems.push(arr[i] as string);
      }
    }
  } else if (key) {
    for (let i = 0; i < arr.length; i++) {
      if (!uniqueItems.includes(arr[i][key] as string)) {
        uniqueItems.push(arr[i][key] as string);
      }
    }
  }
  return uniqueItems;
};

export const Exercises = ({route, navigation}: Props) => {
  // const [exercices, setExercices] = useState<Exercise[]>();
  const [query, setQuery] = useState<RegExp>();
  const [equipmentQuery, setEquipmentQuery] = useState<string[]>();
  const [targetQuery, setTargetQuery] = useState<string[]>();
  const {state, routineId} = route.params;
  const [loading, setLoading] = useState(true);

  const handleSearch = (text: string) => {
    const regexQuery = new RegExp(text.replace(' ', '|'), 'i');
    setQuery(regexQuery);
  };

  const {data, isLoading, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    {
      queryKey: ['exercises'],
      initialPageParam: 1,
      queryFn: async ({pageParam}) => {
        console.log('Chamou getExercises', pageParam);
        const response = await getExercises(pageParam);
        return response.data;
      },
      getNextPageParam: (lastPage, _, lastPageParams) => {
        if (lastPage.length < 10) {
          return undefined;
        }
        return lastPageParams + 1;
      },
      gcTime: Infinity,
      staleTime: Infinity,
    },
  );
  const {data: bodyParts} = useQuery({
    queryKey: ['bodyParts'],
    queryFn: async () => {
      const response = await getBodyParts();
      return response.data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const {data: equipments} = useQuery({
    queryKey: ['equipments'],
    queryFn: async () => {
      const response = await getEquipments();
      return response.data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const exercices = useMemo(() => data?.pages.flat(), [data]);

  // const equipments = useMemo(
  //   () => getUniqueItems(exercices, 'equipment'),
  //   [exercices],
  // );
  // const bodyParts = useMemo(
  //   () => getUniqueItems(exercices, 'target'),
  //   [exercices],
  // );

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

  const filteredExercices = useMemo(() => {
    setLoading(true);
    const filteredList = exercices
      ?.filter(exercice => {
        if (!equipmentQuery?.length) {
          return true;
        }
        return equipmentQuery?.includes(exercice.equipment.toLowerCase());
      })
      ?.filter(exercice => {
        if (!targetQuery?.length) {
          return true;
        }
        return targetQuery?.includes(exercice.target.toLowerCase());
      })
      .filter(exercice => (query ? exercice.name.match(query) : true));
    setLoading(false);
    return filteredList;
  }, [equipmentQuery, exercices, query, targetQuery]);

  // useEffect(() => {
  //   getExercises()
  //     .then(result => {
  //       setExercices(result.data);
  //       setLoading(false);
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  return (
    <View style={styles.container}>
      {isLoading || loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TextInput
            style={styles.searchBox}
            label="Busca"
            onChangeText={handleSearch}
            right={<TextInput.Icon icon="magnify" />}
          />
          <View style={styles.filterContainer}>
            <FilterChip
              title="Muscle group"
              activeFilters={targetQuery}
              options={bodyParts || []}
              onChange={selectedItems => setTargetQuery(selectedItems)}
            />
            <FilterChip
              title="Equipment"
              activeFilters={equipmentQuery}
              options={equipments || []}
              onChange={selectedItems => setEquipmentQuery(selectedItems)}
            />
          </View>
          <FlatList
            onRefresh={() => {}}
            refreshing={isLoading}
            numColumns={2}
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator /> : null
            }
            style={{width: '100%'}}
            data={filteredExercices}
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={0.5}
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

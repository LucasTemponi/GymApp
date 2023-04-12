import React from 'react';
import {useEffect} from 'react';
import {useActiveWorkout} from '../../contexts/ActiveWorkoutContext/ActiveWorkoutContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScreensStackList} from '../../types/types';
import {Button, IconButton, Text} from 'react-native-paper';
import {View} from 'react-native';

type Props = NativeStackScreenProps<ScreensStackList, 'Workig out'>;

export const ActiveWorkoutView = ({navigation}: Props) => {
  const {
    activeWorkout,
    activeSet,
    activeExercise,
    handleNextExercise,
    handlePause,
    handleStartTimer,
    elapsedTime,
  } = useActiveWorkout();

  useEffect(() => {
    navigation.setOptions({
      title: activeWorkout ? activeWorkout.name : 'Workig out',
    });
  }, [navigation, activeWorkout]);

  return (
    activeWorkout && (
      <View>
        <Text>{activeWorkout?.name}</Text>
        <Text>{activeWorkout?.exercises![activeExercise].exercise.name}</Text>
        <Text>{activeSet}</Text>
        <Text>
          {activeWorkout?.exercises![activeExercise].sets![activeSet].restTime}
        </Text>
        <Text>{elapsedTime}</Text>
        <Button icon="play" onPress={handleStartTimer}>
          Descansar
        </Button>
        <Button icon="pause" onPress={handlePause}>
          Pausar
        </Button>
        <IconButton icon="camera" onPress={handleNextExercise} />
      </View>
    )
  );
};

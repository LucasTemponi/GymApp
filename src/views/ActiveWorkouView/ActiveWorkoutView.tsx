import React from 'react';
import {useEffect} from 'react';
import {useActiveWorkout} from '../../contexts/ActiveWorkoutContext/ActiveWorkoutContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScreensStackList} from '../../types/types';
import {Button, IconButton, Text} from 'react-native-paper';
import {View} from 'react-native';
import notifee from '@notifee/react-native';

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
  notifee.displayNotification({
    title:
      '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
    subtitle: '&#129395;',
    body: `${elapsedTime} segundos`,
    android: {
      channelId: '123',
      color: '#4caf50',
      actions: [
        {
          title: '<b>Dance</b> &#128111;',
          pressAction: {id: 'dance'},
        },
        {
          title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
          pressAction: {id: 'cry'},
        },
      ],
    },
  });

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

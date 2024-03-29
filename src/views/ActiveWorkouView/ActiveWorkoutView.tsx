import React from 'react';
import {useEffect} from 'react';
import {useActiveWorkout} from '../../contexts/ActiveWorkoutContext/ActiveWorkoutContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackList} from '../../types/types';
import {Button, DefaultTheme, Text} from 'react-native-paper';
import {Image, View} from 'react-native';
import {
  ColorFormat,
  CountdownCircleTimer,
} from 'react-native-countdown-circle-timer';
import {styles} from './styles';

type Props = NativeStackScreenProps<MainStackList, 'Working out'>;

export const ActiveWorkoutView = ({navigation}: Props) => {
  const {
    activeWorkout,
    activeSet,
    lastSet,
    activeExercise,
    exerciseName,
    handleStartTimer,
    setRestTime,
    elapsedTime,
    isTimerRunning,
  } = useActiveWorkout();

  useEffect(() => {
    navigation.setOptions({
      title: activeWorkout ? activeWorkout.name : 'Workig out',
    });
  }, [navigation, activeWorkout]);

  return (
    activeWorkout && (
      <View style={styles.container}>
        <Image
          style={styles.imageContainer}
          source={{
            uri: activeWorkout?.exercises![activeExercise].exercise?.gifUrl,
          }}
        />
        <View style={styles.timerContainer}>
          <Text style={styles.exerciseName}>{exerciseName}</Text>
          <Text>{`Set ${activeSet + 1} of ${lastSet + 1} `}</Text>

          <CountdownCircleTimer
            key={`${activeExercise}-${activeSet}`}
            colors={DefaultTheme.colors.primary as ColorFormat}
            initialRemainingTime={setRestTime - elapsedTime}
            duration={setRestTime}
            isPlaying={isTimerRunning}>
            {() => <Text>{setRestTime - elapsedTime}</Text>}
          </CountdownCircleTimer>
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleStartTimer}>
            Rest
          </Button>
        </View>
      </View>
    )
  );
};

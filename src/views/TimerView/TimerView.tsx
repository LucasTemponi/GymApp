import React, {useState} from 'react';
import {useEffect} from 'react';
import {useActiveWorkout} from '../../contexts/ActiveWorkoutContext/ActiveWorkoutContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackList} from '../../types/types';
import {Button, DefaultTheme, FAB, Text} from 'react-native-paper';
import {Image, View} from 'react-native';
import {
  ColorFormat,
  CountdownCircleTimer,
} from 'react-native-countdown-circle-timer';
import {styles} from './styles';
import {useTimer} from '../../contexts/TimerContext/TimerContext';
import {TimerPickerModal} from 'react-native-timer-picker';

type Props = NativeStackScreenProps<MainStackList, 'Working out'>;

export const TimerView = ({navigation}: Props) => {
  const {
    startTimer,
    timerTime,
    isTimerRunning,
    pauseTimer,
    setTime,
    remainingTime,
  } = useTimer();
  const [visibleTimerPicker, setVisibleTimerPicker] = useState(false);

  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingSeconds = Math.floor(remainingTime % 60);

  return (
    <View style={styles.timerContainer}>
      <CountdownCircleTimer
        key={remainingTime}
        colors={DefaultTheme.colors.primary as ColorFormat}
        duration={timerTime}
        isPlaying={isTimerRunning}
        initialRemainingTime={remainingTime}>
        {() => (
          <Text onPress={() => setVisibleTimerPicker(true)}>
            {!(remainingMinutes || remainingSeconds)
              ? 'Click to set timer'
              : remainingMinutes
                ? `${remainingMinutes}'${remainingSeconds
                    .toString()
                    .padStart(2, '0')}"`
                : `${remainingSeconds.toString().padStart(2, '0')}"`}
          </Text>
        )}
      </CountdownCircleTimer>
      <FAB
        icon={'play'}
        disabled={!timerTime || isTimerRunning}
        style={styles.fab}
        onPress={startTimer}
      />
      <TimerPickerModal
        visible={visibleTimerPicker}
        setIsVisible={setVisibleTimerPicker}
        closeOnOverlayPress
        onConfirm={({hours, minutes, seconds}) => {
          setTime(hours * 3600 + minutes * 60 + seconds);
          setVisibleTimerPicker(false);
        }}
      />
    </View>
  );
};

export default TimerView;

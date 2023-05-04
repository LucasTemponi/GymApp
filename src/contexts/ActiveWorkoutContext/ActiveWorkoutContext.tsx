import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {WorkoutRoutineType} from '../../types/types';
import notifee, {EventType} from '@notifee/react-native';
import {Vibration} from 'react-native';

type ActiveWorkoutProps = {
  activeWorkout: WorkoutRoutineType | null;
  setActiveWorkout: React.Dispatch<
    React.SetStateAction<WorkoutRoutineType | null>
  >;
  handlePause: () => void;
  handleStartTimer: () => void;
  handleNextExercise: () => void;
  handleNextSet: () => void;
  activeSet: number;
  setRestTime: number;
  activeExercise: number;
  elapsedTime: number;
  isTimerRunning: boolean;
};

const ActiveWorkout = createContext<ActiveWorkoutProps>({
  activeWorkout: null,
  setActiveWorkout: () => {},
  handlePause: () => {},
  handleStartTimer: () => {},
  handleNextExercise: () => {},
  handleNextSet: () => {},
  activeSet: 0,
  setRestTime: 0,
  activeExercise: 0,
  elapsedTime: 0,
  isTimerRunning: false,
});

type Props = {
  children: React.ReactNode;
};

const ActiveWorkoutContext = ({children}: Props) => {
  const [activeWorkout, setActiveWorkout] = useState<WorkoutRoutineType | null>(
    null,
  );
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [currentSet, setCurrentSet] = useState<number>(0);
  const countRef = useRef<number>(0);

  const lastExercise = useMemo(() => {
    if (activeWorkout?.exercises) {
      return activeWorkout?.exercises.length - 1;
    }
    return -1;
  }, [activeWorkout]);

  const exerciseName = useMemo(() => {
    if (activeWorkout?.exercises) {
      const baseName = activeWorkout?.exercises[currentExercise]?.exercise.name;
      return baseName.charAt(0).toUpperCase() + baseName.slice(1);
    }
    return '';
  }, [currentExercise, activeWorkout]);

  const lastSet = useMemo(() => {
    if (
      activeWorkout?.exercises &&
      currentExercise >= 0 &&
      currentExercise <= lastExercise &&
      activeWorkout.exercises[currentExercise].sets
    ) {
      return activeWorkout.exercises[currentExercise]?.sets!.length - 1;
    }
    return -1;
  }, [activeWorkout, currentExercise, lastExercise]);

  const setRestTime = useMemo(() => {
    if (
      activeWorkout?.exercises &&
      currentSet >= 0 &&
      currentSet <= lastSet &&
      activeWorkout.exercises[currentExercise].sets
    ) {
      return activeWorkout.exercises[currentExercise]?.sets![currentSet]
        .restTime;
    }
    return 0;
  }, [currentSet, currentExercise, activeWorkout, lastSet]);

  notifee.registerForegroundService(() => {
    return new Promise(() => {
      // Long running task...
    });
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
    if (
      type === EventType.ACTION_PRESS &&
      detail.pressAction &&
      detail.pressAction.id === 'start'
    ) {
      setIsTimerRunning(true);
    }
  });

  useEffect(() => {
    if (isTimerRunning) {
      countRef.current = setTimeout(() => {
        if (elapsedTime < setRestTime) {
          setElapsedTime(oldValue => oldValue + 1);
        } else {
          handleNextSet();
          clearTimeout(countRef.current);
          setIsTimerRunning(false);
          setElapsedTime(0);
        }
      }, 1000);
    }

    return () => {
      if (countRef.current) {
        clearTimeout(countRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning, elapsedTime]);

  async function showNotification() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    notifee.displayNotification({
      id: 'working-out',
      title: `<p style="color: #6750a4;"><b>${exerciseName}</b> - Set ${
        currentSet + 1
      } of ${lastSet + 1} </p>`,
      // subtitle: currentSet.toString(),
      body: `${setRestTime - elapsedTime} seconds`,
      android: {
        channelId,
        lightUpScreen: elapsedTime - setRestTime === 0,
        asForegroundService: true,
        vibrationPattern: [100, 200, 300, 400, 500, 400, 300, 200],
        color: '#6750a4',
        smallIcon: 'ic_launcher',
        // circularLargeIcon: true,
        actions: [
          {
            title: '<b>Rest</b>',
            pressAction: {id: 'start'},
          },
        ],
      },
    });
  }

  useEffect(() => {
    if (activeWorkout) {
      notifee.onForegroundEvent(({type, detail}) => {
        if (
          type === EventType.ACTION_PRESS &&
          detail.pressAction &&
          detail.pressAction.id === 'start'
        ) {
          setIsTimerRunning(true);
        }
      });
    } else {
      notifee.stopForegroundService();
    }

    return () => {
      notifee.stopForegroundService();
    };
  }, [activeWorkout]);

  useEffect(() => {
    if (activeWorkout) {
      showNotification();
      if (elapsedTime - setRestTime === 0) {
        Vibration.vibrate([100, 200, 300, 400, 500, 400, 300, 200]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsedTime, activeWorkout, currentExercise]);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handlePause = () => {
    if (countRef.current) {
      clearTimeout(countRef.current);
    }
    setIsTimerRunning(false);
  };

  const handleNextExercise = () => {
    if (currentExercise < lastExercise) {
      setCurrentExercise(currentExercise + 1);
      setCurrentSet(0);
    } else {
      notifee.stopForegroundService();
      clearInterval(countRef.current);
      setActiveWorkout(null);
      setCurrentExercise(0);
      setElapsedTime(0);
      setCurrentSet(0);
      notifee.cancelNotification('working-out');
    }
  };

  const handleNextSet = () => {
    if (currentSet < lastSet) {
      setCurrentSet(currentSet + 1);
    } else if (currentSet === lastSet) {
      handleNextExercise();
    }
  };

  return (
    <ActiveWorkout.Provider
      value={{
        activeWorkout,
        setActiveWorkout,
        handlePause,
        handleStartTimer,
        handleNextExercise,
        handleNextSet,
        activeSet: currentSet,
        setRestTime,
        activeExercise: currentExercise,
        elapsedTime,
        isTimerRunning,
      }}>
      {children}
    </ActiveWorkout.Provider>
  );
};

export const useActiveWorkout = () => useContext(ActiveWorkout);
export default ActiveWorkoutContext;

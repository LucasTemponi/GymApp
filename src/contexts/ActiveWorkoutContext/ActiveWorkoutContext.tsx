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
  activeExercise: number;
  elapsedTime: number;
};

const ActiveWorkout = createContext<ActiveWorkoutProps>({
  activeWorkout: null,
  setActiveWorkout: () => {},
  handlePause: () => {},
  handleStartTimer: () => {},
  handleNextExercise: () => {},
  handleNextSet: () => {},
  activeSet: 0,
  activeExercise: 0,
  elapsedTime: 0,
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

  const lastSet = useMemo(() => {
    console.log('lastSet', activeWorkout, currentExercise, lastExercise);
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

  //   useEffect(() => {
  //     if (timer > 0) {
  //       setTimeout(() => setTimer(timer - 1), 1000);
  //     } else {
  //       setCurrentExercise(currentExercise + 1);
  //     }
  //   }, [timer, currentExercise]);

  // console.log(
  //   `${Math.floor(elapsedTime / 1000)} seconds ${
  //     elapsedTime % 1000
  //   } milliseconds`,
  // );

  //   const startTime = useMemo(() => {
  //     if (isTimerRunning) {
  //       return Date.now() - elapsedTime;
  //     }
  //     return 0;
  //   }, []);

  notifee.registerForegroundService(() => {
    return new Promise(() => {
      // Long running task...
    });
  });
  notifee.onForegroundEvent(({type, detail}) => {
    if (
      type === EventType.ACTION_PRESS &&
      detail.pressAction &&
      detail.pressAction.id === 'start'
    ) {
      setIsTimerRunning(true);
    }
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
          console.log('aqui?');
          setElapsedTime(oldValue => oldValue + 1);
          console.log('Passou do set?');
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

  useEffect(() => {
    async function showNotification() {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      notifee.displayNotification({
        id: 'working-out',
        title: `<p style="color: #4caf50;"><b>${
          activeWorkout?.exercises![currentExercise].exercise.name
        }</b></p>`,
        subtitle: currentSet.toString(),
        body: `${elapsedTime} segundos`,
        android: {
          channelId,
          asForegroundService: true,
          color: '#4caf50',
          actions: [
            {
              title: '<b>Dance</b> &#128111;',
              pressAction: {id: 'start'},
            },
            {
              title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
              pressAction: {id: 'cry'},
            },
          ],
        },
      });
    }
    showNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsedTime, activeWorkout, currentExercise]);

  const handleStartTimer = () => {
    // countRef.current = setInterval(() => {
    //   console.log(elapsedTime, setRestTime, elapsedTime < setRestTime);
    //   if (elapsedTime < setRestTime) {
    //     console.log('aqui?');
    //     setElapsedTime(oldValue => oldValue + 1);
    //     console.log('Passou do set?');
    //   } else {
    //     handleNextSet();
    //     clearTimeout(countRef.current);
    //   }
    // }, 1000);
    setIsTimerRunning(true);
  };

  const handlePause = () => {
    if (countRef.current) clearTimeout(countRef.current);
    setIsTimerRunning(false);
  };

  // console.log(currentExercise, currentSet);

  const handleNextExercise = () => {
    if (currentExercise < lastExercise) {
      setCurrentExercise(currentExercise + 1);
      setCurrentSet(0);
    } else {
      console.log('Parabens, vc terminou seu treino');
      clearInterval(countRef.current);
      setActiveWorkout(null);
      setCurrentExercise(0);
      setElapsedTime(0);
      setCurrentSet(0);
    }
  };

  const handleNextSet = () => {
    if (currentSet < lastSet) {
      setCurrentSet(currentSet + 1);
    } else if (currentSet === lastSet) {
      handleNextExercise();
    }
  };

  // useEffect(() => {
  //   console.log('activeWorkout', activeWorkout?.name, lastExercise);
  //   if (
  //     lastExercise >= 0 &&
  //     currentExercise <= lastExercise &&
  //     activeWorkout?.exercises
  //   ) {
  //     setCurrentExercise(lastExercise);
  //   }
  // }, [currentExercise, activeWorkout, lastExercise]);

  // useEffect(() => {
  //   if (currentExercise) {
  //     setCurrentExercise(lastExercise);
  //   }
  // }, [activeWorkout, lastExercise, currentExercise]);

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
        activeExercise: currentExercise,
        elapsedTime,
      }}>
      {children}
    </ActiveWorkout.Provider>
  );
};

export const useActiveWorkout = () => useContext(ActiveWorkout);
export default ActiveWorkoutContext;

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import BackgroundTimer, {TimeoutId} from 'react-native-background-timer';
import notifee, {EventType} from '@notifee/react-native';
import {Vibration} from 'react-native';

type TimerProps = {
  setNotificationInfo: (info: {title: string}) => void;
  setTime: (time: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  isTimerRunning: boolean;
  timerTime: number;
  remainingTime: number;
  //   setNotificationActions: () => void;
};

const Timer = createContext<TimerProps>({
  setNotificationInfo: () => {},
  setTime: () => {},
  startTimer: () => {},
  pauseTimer: () => {},
  resetTimer: () => {},
  isTimerRunning: false,
  timerTime: 0,
  remainingTime: 0,
  //   setNotificationActions: () => {},
});

type Props = {
  children: React.ReactNode;
};

const TimerContext = ({children}: Props) => {
  const [timerTime, setTimerTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerIsActive, setTimerIsActive] = useState(false);

  const [notificationInfo, setNotificationInfo] = useState({
    title: '',
  });

  const countRef = useRef<TimeoutId>();

  notifee.registerForegroundService(() => {
    return new Promise(() => {
      // Long running task...
      notifee.onBackgroundEvent(async ({type, detail}) => {
        if (
          type === EventType.ACTION_PRESS &&
          detail.pressAction &&
          detail.pressAction.id === 'start'
        ) {
          setIsTimerRunning(true);
        }
      });
    });
  });

  async function showNotification() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    notifee.displayNotification({
      id: 'working-out',
      title: notificationInfo.title,
      // subtitle: currentSet.toString(),
      body: `${(timerTime - elapsedTime).toString().padStart(2, '0')} seconds`,
      android: {
        channelId,
        lightUpScreen: elapsedTime - timerTime === 0,
        asForegroundService: true,
        vibrationPattern: [100, 200, 300, 400, 500, 400, 300, 200],
        color: '#6750a4',
        smallIcon: 'ic_stat_name',
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
    if (timerIsActive) {
      !timerTime ? setTimerIsActive(false) : showNotification();
    }
    if (isTimerRunning) {
      countRef.current = BackgroundTimer.setTimeout(() => {
        if (elapsedTime < timerTime - 1) {
          setElapsedTime(oldValue => oldValue + 1);
        } else {
          Vibration.vibrate([100, 200, 300, 400, 500, 400, 300, 200]);
          clearTimeout(countRef.current);
          setIsTimerRunning(false);
          setElapsedTime(0);
        }
      }, 1000);
    }

    return () => {
      if (countRef.current) {
        BackgroundTimer.clearTimeout(countRef.current);
      }
    };
  }, [isTimerRunning, elapsedTime, timerTime]);

  useEffect(() => {
    if (timerIsActive) {
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
  }, [timerIsActive]);

  const startTimer = () => {
    setTimerIsActive(true);
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setElapsedTime(0);
  };

  const pauseTimer = () => {
    if (countRef.current) {
      clearTimeout(countRef.current);
    }
    setIsTimerRunning(false);
  };

  const setTime = (time: number) => {
    setTimerTime(time);
  };
  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimerIsActive(false);
    setElapsedTime(0);
  };

  return (
    <Timer.Provider
      value={{
        pauseTimer,
        setNotificationInfo,
        resetTimer,
        setTime,
        startTimer,
        isTimerRunning,
        timerTime,
        remainingTime: timerTime - elapsedTime,
      }}>
      {children}
    </Timer.Provider>
  );
};

export const useTimer = () => useContext(Timer);
export default TimerContext;

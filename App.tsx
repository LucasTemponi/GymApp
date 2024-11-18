import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {MainStackList, TabStackList} from './src/types/types';
import ActiveWorkoutContext from './src/contexts/ActiveWorkoutContext/ActiveWorkoutContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActiveWorkoutView} from './src/views/ActiveWorkouView/ActiveWorkoutView';
import Exercises from './src/views/Exercises/Exercises';
import {AddExerciseToRoutine} from './src/views/AddExerciseToRoutine/AddExerciseToRoutine';
import {ExerciceDetails} from './src/views/ExerciceDetails/ExercicesDetails';
import {WorkoutRoutine} from './src/views/WorkoutRoutine/ WorkoutRoutine';
import Workouts from './src/views/Workouts/Workoust';
import {Dimensions} from 'react-native';
import TimerView from './src/views/TimerView/TimerView';
import TimerContext from './src/contexts/TimerContext/TimerContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';

const Tab = createMaterialBottomTabNavigator<TabStackList>();
const Stack = createNativeStackNavigator<MainStackList>();

const queryClient = new QueryClient();
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const TabScreens = () => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <Tab.Navigator
      barStyle={{height: 70}}
      safeAreaInsets={{bottom: 0, top: 0}}
      activeColor="white"
      compact>
      <Tab.Screen
        name="Exercices"
        component={Exercises as any}
        initialParams={{state: 'viewing'}}
        options={{tabBarIcon: 'weight-lifter'}}
      />
      <Tab.Screen
        name="Timer"
        component={TimerView as any}
        options={{tabBarIcon: 'timer'}}
      />
      <Tab.Screen
        name="Workouts"
        component={Workouts as any}
        options={{tabBarIcon: 'clipboard-list-outline'}}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <TimerContext>
          <PersistQueryClientProvider
            persistOptions={{
              persister: asyncStoragePersister,
              maxAge: 1000 * 60 * 60 * 24 * 7,
            }}
            client={queryClient}>
            <ActiveWorkoutContext>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    options={{headerShown: false}}
                    name="Base"
                    component={TabScreens}
                  />
                  <Stack.Screen
                    name="Working out"
                    component={ActiveWorkoutView}
                  />
                  <Stack.Screen
                    name="Add to routine"
                    component={AddExerciseToRoutine}
                  />
                  <Stack.Screen
                    name="Exercise Details"
                    component={ExerciceDetails}
                  />
                  <Stack.Screen
                    name="Workout routine"
                    component={WorkoutRoutine}
                  />
                  <Stack.Screen name="Exercises" component={Exercises} />
                </Stack.Navigator>
              </NavigationContainer>
            </ActiveWorkoutContext>
          </PersistQueryClientProvider>
        </TimerContext>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

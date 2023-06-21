/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
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

const Tab = createMaterialBottomTabNavigator<TabStackList>();
const Stack = createNativeStackNavigator<MainStackList>();

const TabScreens = () => (
  <Tab.Navigator barStyle={{height: 75}} activeColor="white">
    <Tab.Screen
      name="Exercices"
      component={Exercises as any}
      initialParams={{state: 'viewing'}}
      options={{tabBarIcon: 'kettlebell'}}
    />
    <Tab.Screen
      name="Workouts"
      component={Workouts as any}
      options={{tabBarIcon: 'clipboard-list-outline'}}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ActiveWorkoutContext>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{headerShown: false}}
                name="Base"
                component={TabScreens}
              />
              <Stack.Screen name="Working out" component={ActiveWorkoutView} />
              <Stack.Screen
                name="Add to routine"
                component={AddExerciseToRoutine}
              />
              <Stack.Screen
                name="Exercise Details"
                component={ExerciceDetails}
              />
              <Stack.Screen name="Workout routine" component={WorkoutRoutine} />
              <Stack.Screen name="Exercises" component={Exercises} />
            </Stack.Navigator>
          </NavigationContainer>
        </ActiveWorkoutContext>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

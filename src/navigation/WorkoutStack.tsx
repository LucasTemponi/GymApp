import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {Home} from '../views/Exercises/Exercises';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreensStackList} from '../types/types';
import {ExerciceDetails} from '../views/ExerciceDetails/ExercicesDetails';
import {WorkoutRoutine} from '../views/WorkoutRoutine/ WorkoutRoutine';
import {AddExerciseToRoutine} from '../views/AddExerciseToRoutine/AddExerciseToRoutine';
import Workouts from '../views/Workouts/Workoust';

const Stack = createNativeStackNavigator<ScreensStackList>();

export default function WorkoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Routines' as any} component={Workouts} />
      <Stack.Screen
        name="Exercises"
        component={Home}
        initialParams={{state: 'viewing'}}
      />
      <Stack.Screen name="Exercise Details" component={ExerciceDetails} />
      <Stack.Screen name="Workout routine" component={WorkoutRoutine} />
      <Stack.Screen name="Add to routine" component={AddExerciseToRoutine} />
    </Stack.Navigator>
  );
}

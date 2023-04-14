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
import {BottomStackList} from './src/types/types';
import HomeStack from './src/navigation/HomeStack';
import WorkoutStack from './src/navigation/WorkoutStack';
import ActiveWorkoutContext from './src/contexts/ActiveWorkoutContext/ActiveWorkoutContext';

const Tab = createMaterialBottomTabNavigator<BottomStackList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ActiveWorkoutContext>
          <NavigationContainer>
            <Tab.Navigator
              barStyle={{height: 75}}
              activeColor="white"
              labeled={false}>
              <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{tabBarIcon: 'kettlebell'}}
              />
              <Tab.Screen
                name="Workouts"
                component={WorkoutStack}
                options={{tabBarIcon: 'clipboard-list-outline'}}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </ActiveWorkoutContext>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

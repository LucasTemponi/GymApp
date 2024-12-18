import {NavigatorScreenParams} from '@react-navigation/native';

export type Exercise = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
};

export type ExerciseSet = {
  reps: number;
  load: number;
  restTime: number;
};

export type TabStackList = {
  Exercices: {
    state: 'viewing' | 'addingToRoutine';
    routineId?: number;
  };
  Workouts: undefined;
  Timer: undefined;
};

export type MainStackList = {
  Base: NavigatorScreenParams<TabStackList>;
  Exercises: {
    state: 'viewing' | 'addingToRoutine';
    routineId?: number;
  };
  'Exercise Details': {exercise: Exercise};
  'Workout routine': {
    routine?: WorkoutRoutineType;
    routineId: number;
    edit?: boolean;
  };
  'Add to routine': {workoutExercise: WorkoutExerciseType; routineId: number};
  'Working out': undefined;
};

// export type ScreensStackList = {
//   Routines: undefined;
//   Exercises: {
//     state: 'viewing' | 'addingToRoutine';
//     routineId?: number;
//   };
//   'Exercise Details': {exercise: Exercise};
//   'Workout routine': {
//     routine?: WorkoutRoutineType;
//     routineId: number;
//     edit?: boolean;
//   };
//   'Add to routine': {workoutExercise: WorkoutExerciseType; routineId: number};
// };

export type WorkoutExerciseType = {
  exercise: Exercise;
  sets?: ExerciseSet[];
};

export type WorkoutRoutineType = {
  id: number;
  name: string;
  exercises?: WorkoutExerciseType[];
};

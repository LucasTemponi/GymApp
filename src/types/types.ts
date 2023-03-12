export type Exercise = {
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
};

export type ExerciseSet = {
  reps: number;
  load: number;
  restTime: number;
};

export type ScreensStackList = {
  Home: {
    state: 'viewing' | 'addingToRoutine';
    routineId?: number;
  };
  Back: undefined;
  'Exercise Details': {exercise: Exercise};
  'Workout routine': {routine?: WorkoutRoutine; routineId: number};
  'Add to routine': {exercise: Exercise; routineId: number};
};

export type WorkoutExerciseType = {
  exercise: Exercise;
  sets?: ExerciseSet[];
};

export type WorkoutRoutine = {
  name: string;
  exercises?: WorkoutExerciseType[];
};

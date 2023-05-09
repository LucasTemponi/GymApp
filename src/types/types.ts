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
  Routines: undefined;
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

export type BottomStackList = {
  Home: {
    state: 'viewing' | 'addingToRoutine';
    routineId?: number;
  };
  Workouts: undefined;
};

export type WorkoutExerciseType = {
  exercise: Exercise;
  sets?: ExerciseSet[];
};

export type WorkoutRoutineType = {
  id: number;
  name: string;
  exercises?: WorkoutExerciseType[];
};

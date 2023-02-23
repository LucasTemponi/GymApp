export type Exercice = {
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
};

export type ScreensStackList = {
  Home: undefined;
  Back: undefined;
  'Exercise Details': {exercise?: Exercice};
};

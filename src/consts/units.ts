export const weightUnit = {
  kilo: 'Kg',
  pound: 'lb',
} as const;

export type WeightUnit = (typeof weightUnit)[keyof typeof weightUnit];

export const getCalories = (protein: number, carbs: number, fat: number): number => {
  return protein * 4 + carbs * 4 + fat * 9;
}
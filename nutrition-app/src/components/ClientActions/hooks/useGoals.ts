import { useState } from "react";

const useGoals = () => {
  const [dailyProteinGoal, setDailyProteinGoal] = useState(0);
  const [dailyCarbsGoal, setDailyCarbsGoal] = useState(0);
  const [dailyFatGoal, setDailyFatGoal] = useState(0);
  const [dailyFiberGoal, setDailyFiberGoal] = useState(0);
  const [dailySugarGoal, setDailySugarGoal] = useState(0);
  const [dailySodiumGoal, setDailySodiumGoal] = useState(0);
  const [dailyWaterGoal, setDailyWaterGoal] = useState(0);

  const handleDailyProteinGoal = (protein: number) => {
    setDailyProteinGoal(protein);
  };
  
  const handleDailyCarbsGoal = (carbs: number) => {
    setDailyCarbsGoal(carbs);
  };

  const handleDailyFatGoal = (fat: number) => {
    setDailyFatGoal(fat);
  };

  const handleDailyFiberGoal = (fiber: number) => {
    setDailyFiberGoal(fiber);
  };

  const handleDailySugarGoal = (sugar: number) => {
    setDailySugarGoal(sugar);
  };

  const handleDailySodiumGoal = (sodium: number) => {
    setDailySodiumGoal(sodium);
  };

  const handleDailyWaterGoal = (water: number) => {
    setDailyWaterGoal(water);
  };

  return {
    dailyProteinGoal,
    dailyCarbsGoal,
    dailyFatGoal,
    dailyFiberGoal,
    dailySugarGoal,
    dailySodiumGoal,
    dailyWaterGoal,
    handleDailyProteinGoal,
    handleDailyCarbsGoal,
    handleDailyFatGoal,
    handleDailyFiberGoal,
    handleDailySugarGoal,
    handleDailySodiumGoal,
    handleDailyWaterGoal
  };
};

export default useGoals;

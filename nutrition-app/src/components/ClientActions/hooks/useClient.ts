import { useState } from "react";

const useClient = () => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalFiber, setTotalFiber] = useState(0);
  const [totalSugar, setTotalSugar] = useState(0);
  const [totalSodium, setTotalSodium] = useState(0);
  const [totalWater, setTotalWater] = useState(0);

  const handleTotalCalories = (calories: number) => {
    setTotalCalories(calories);
  };

  const handleTotalProtein = (protein: number) => {
    setTotalProtein(protein);
  };

  const handleTotalCarbs = (carbs: number) => {
    setTotalCarbs(carbs);
  };

  const handleTotalFat = (fat: number) => {
    setTotalFat(fat);
  };

  const handleTotalFiber = (fiber: number) => {
    setTotalFiber(fiber);
  };

  const handleTotalSugar = (sugar: number) => {
    setTotalSugar(sugar);
  };

  const handleTotalSodium = (sodium: number) => {
    setTotalSodium(sodium);
  };

  const handleTotalWater = (water: number) => {
    setTotalWater(water);
  };

  return {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    totalFiber,
    totalSugar,
    totalSodium,
    totalWater,
    handleTotalCalories,
    handleTotalProtein,
    handleTotalCarbs,
    handleTotalFat,
    handleTotalFiber,
    handleTotalSugar,
    handleTotalSodium,
    handleTotalWater
  };
};

export default useClient;

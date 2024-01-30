import { createContext, useContext, useState, ReactNode, FC } from "react";
import useGoals from "../components/ClientActions/hooks/useGoals";
import { Handlers, Values } from "./types";
import useClient from "../components/ClientActions/hooks/useClient";

type ClientContextType = {
  values: Values;
  handlers: Handlers;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

const ClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    totalFiber,
    totalSodium,
    totalSugar,
    totalWater,
    handleTotalCalories,
    handleTotalProtein,
    handleTotalCarbs,
    handleTotalFat,
    handleTotalFiber,
    handleTotalSodium,
    handleTotalSugar,
    handleTotalWater,
  } = useClient();

  const {
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
    handleDailyWaterGoal,
  } = useGoals();

  const values = {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    totalFiber,
    totalSodium,
    totalSugar,
    totalWater,
    dailyProteinGoal,
    dailyCarbsGoal,
    dailyFatGoal,
    dailyFiberGoal,
    dailySugarGoal,
    dailySodiumGoal,
    dailyWaterGoal,
  };

  const handlers = {
    handleTotalCalories,
    handleTotalProtein,
    handleTotalCarbs,
    handleTotalFat,
    handleTotalFiber,
    handleTotalSodium,
    handleTotalSugar,
    handleTotalWater,
    handleDailyProteinGoal,
    handleDailyCarbsGoal,
    handleDailyFatGoal,
    handleDailyFiberGoal,
    handleDailySugarGoal,
    handleDailySodiumGoal,
    handleDailyWaterGoal,
  };

  return (
    <ClientContext.Provider value={{ values, handlers }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};

export default ClientProvider;

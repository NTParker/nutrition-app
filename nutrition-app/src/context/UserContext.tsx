// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Exercise, Meal, Note, UserData, Workout } from "../common/types";

interface UserLogData {
  workouts: Workout[];
  meals: Meal[];
  notes: Note[];
  exercises: Exercise[];
}

interface UserContextType {
  userData: UserData | null;
  userLogData: UserLogData | null;
  updateUserData: (data: UserData) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => useContext(UserContext)!;

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const updateUserData = (data: UserData) => {
    setUserData(data);
  };

  const userLogData = {
    workouts,
    meals,
    notes,
    exercises,
  };

  return (
    <UserContext.Provider value={{ userData, userLogData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

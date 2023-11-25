// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserData } from "../common/types";

interface UserContextType {
  userData: UserData | null;
  updateUserData: (data: UserData) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => useContext(UserContext)!;

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const updateUserData = (data: UserData) => {
    setUserData(data);
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

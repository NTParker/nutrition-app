import { createContext, useContext, useState, ReactNode, FC } from "react";
import usePage from "../components/dashboard/hooks/usePage";
import useView from "../components/dashboard/hooks/useView";

type DashboardContextType = {
  currentPage: string;
  handlePageChange: (page: string) => void;
  currentView: string;
  handleViewChange: (view: string) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { currentPage, handlePageChange } = usePage();
  const { currentView, handleViewChange } = useView();

  return (
    <DashboardContext.Provider
      value={{ currentPage, handlePageChange, currentView, handleViewChange }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

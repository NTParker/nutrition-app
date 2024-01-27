import { useState } from "react";

const useView = () => {
  const [currentView, setCurrentView] = useState("client");

  const handleViewChange = (view: string, toggle = true) => {
    let newView = view === 'client' ? 'coach' : 'client';
    setCurrentView(toggle ? newView : view);
  };

  return { currentView, handleViewChange };
}

export default useView;
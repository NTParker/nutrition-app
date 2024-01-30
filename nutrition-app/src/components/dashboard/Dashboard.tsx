import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ClientDashboard from "./client/ClientDashboard";
import CoachDashboard from "./coach/CoachDashboard";
import { useUserContext } from "../../context/UserContext";
import Footer from "./components/Footer";
import { DashboardProvider } from "../../context/DashboardContext";
import Header from "./components/Header";
import ClientProvider from "../../context/ClientContext";

const Dashboard: React.FC = () => {
  const { error, isLoading, user } = useAuth0();
  const [role, setRole] = useState("");
  const [noDefaultView, setNoDefaultView] = useState(false);
  const [hasMultipleRoles, setHasMultipleRoles] = useState(false); // Optional, if user has both roles, set to true and display a button to toggle between views
  const [defaultView, setDefaultView] = useState("");
  const { userData } = useUserContext();

  useEffect(() => {
    // Fetch role from user profile or backend
    if (userData) {
      console.log(userData);
      const userRoles = userData.roles;
      const preferences = userData.preferences || { defaultView: "client" };
      if (userRoles.length === 1) {
        setRole(userRoles[0]);
      } else {
        setHasMultipleRoles(true);
        if (!defaultView && preferences.defaultView) {
          setDefaultView(preferences.defaultView);
          setRole(preferences.defaultView);
        } else {
          setNoDefaultView(true);
        }
      }
    }
    // If user has both roles, use their stored default view

    // Example: setRole(userRole); setDefaultView(storedDefaultView);
  }, [userData]);

  useEffect(() => {
    if (defaultView && noDefaultView) {
      setNoDefaultView(false);
    }
  }, [defaultView]);

  const toggleView = () => {
    const newView = role === "client" ? "coach" : "client";
    setRole(newView);
    // Optionally update the default view in profile/local storage
  };

  const firstTimeSetView = (role: string) => {
    setRole(role);
    setDefaultView(role);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    // <div className="container p-0.5 w-full h-full sm:w-full md:w-full sm:h-full md:h-full">
    <DashboardProvider>
      <div className="container bg-zinc-900 w-full max-w-full h-dvh max-h-dvh sm:w-full sm:max-w-full md:w-full md:max-w-full sm:h-dvh sm:max-h-dvh md:h-dvh md:max-h-dvh overflow-y-auto pb-32">
        <Header />
        {noDefaultView && (
          // Display a message to the user to select a default view along with 'client view' and 'coach view' buttons that set the default view
          <div>
            Please select a default view
            <button onClick={() => firstTimeSetView("client")}>
              Client View
            </button>
            <button onClick={() => firstTimeSetView("coach")}>
              Coach View
            </button>
          </div>
        )}
        <div></div>
        {/* {hasMultipleRoles && (
        <button
        onClick={toggleView}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
        Switch to {role === "client" ? "Coach" : "Client"} View
        </button>
      )} */}
        {role === "client" && (
          <ClientProvider>
            <ClientDashboard />
          </ClientProvider>
        )}
        {role === "coach" && <CoachDashboard />}
        {/* Rest of the dashboard components */}
        <Footer />
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;

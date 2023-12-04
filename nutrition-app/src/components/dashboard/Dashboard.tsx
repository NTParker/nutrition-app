import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ClientDashboard from "./ClientDashboard";
import CoachDashboard from "./CoachDashboard";
import { useUserContext } from "../../context/UserContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth0();
  const [role, setRole] = useState("");
  const [noDefaultView, setNoDefaultView] = useState(false);
  const [hasMultipleRoles, setHasMultipleRoles] = useState(false); // Optional, if user has both roles, set to true and display a button to toggle between views
  const [defaultView, setDefaultView] = useState("");
  const { userData } = useUserContext();

  useEffect(() => {
    // Fetch role from user profile or backend
    if (userData) {
      const userRoles = userData.roles;
      const preferences = userData.preferences;
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

  return (
    <div>
      {noDefaultView && (
        // Display a message to the user to select a default view along with 'client view' and 'coach view' buttons that set the default view
        <div>
          Please select a default view
          <button onClick={() => firstTimeSetView("client")}>
            Client View
          </button>
          <button onClick={() => firstTimeSetView("coach")}>Coach View</button>
        </div>
      )}
      {role === "client" && <ClientDashboard />}
      {role === "coach" && <CoachDashboard />}
      {hasMultipleRoles && (
        <button onClick={toggleView}>
          Switch to {role === "client" ? "Coach" : "Client"} View
        </button>
      )}
      {/* Rest of the dashboard components */}
    </div>
  );
};

export default Dashboard;

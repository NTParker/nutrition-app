import { FC, useEffect, useState } from "react";
import "./App.css";
import LoginButton from "./components/auth/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import CreateAccount from "./components/account/CreateAccount";
import Dashboard from "./components/dashboard/Dashboard";
import GetUserService from "./services/getUser.service";
import { useUserContext } from "./context/UserContext";

const App: FC = () => {
  const { isAuthenticated, user, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [isNewUser, setIsNewUser] = useState(false);
  const { updateUserData } = useUserContext();

  useEffect(() => {
    const checkUserExists = async () => {
      if (isAuthenticated && user && user.sub) {
        try {
          const accessToken = await getAccessTokenSilently();
          try {
            const response = await GetUserService(user.sub, accessToken);
            console.log(response);
            updateUserData(response.data);
            setIsNewUser(false);
          } catch (err) {
            console.log(err);
            setIsNewUser(true);
          }
        } catch (error) {
          console.error("Error checking user existence:", error);
          // Handle error (e.g., set isNewUser to true if user not found)
        }
      }
    };

    checkUserExists();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && isNewUser) {
    console.log("auth: ", isAuthenticated);
    console.log("new: ", isNewUser);
    console.log("user: ", user);

    return <CreateAccount />;
  }

  return isAuthenticated ? <Dashboard /> : <LoginButton />;
};

export default App;

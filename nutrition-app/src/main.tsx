import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-2rko82p1b0rpb0i8.us.auth0.com"
      clientId="YCivvsoJjjHkzXumcO0OMoH4OuqOFH92"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://nutrition-api",
      }}
    >
      <UserProvider>
        <App />
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
);

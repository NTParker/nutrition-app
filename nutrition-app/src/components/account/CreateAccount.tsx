import { FC, FormEvent, useEffect, useState } from "react";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import CreateUserService from "../../services/createUser.service";

const CreateAccount: FC = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const getToken = async () => {
      try {
        if (user && user.sub && getAccessTokenSilently) {
          const accessToken = await getAccessTokenSilently({
            audience: "https://nutrition-api",
            scope: "openid email profile",
          } as GetTokenSilentlyOptions);
          console.log("token: ", accessToken.length);

          setUserId(user.sub);
          setToken(accessToken);
        } else {
          console.log("no user");
          throw new Error("no user");
        }
      } catch (e) {
        console.log(user);
        console.log("wassup");

        console.error(e);
      }
    };
    getToken();
  }, [getAccessTokenSilently]);

  const handleRoleChange = (role: string) => {
    if (roles.includes(role)) {
      setRoles(roles.filter((r) => r !== role));
    } else {
      setRoles([...roles, role]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const accountData = { username, email, roles, userId };
    try {
      console.log("token: ", token);
      console.log("userId: ", userId);

      const response = await CreateUserService(accountData, token);
      console.log(response.data);

      // Handle response, redirect to dashboard
    } catch (error) {
      console.error("Error creating account:", error);
      // Handle error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Roles
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={roles.includes("client")}
              onChange={() => handleRoleChange("client")}
            />
            <span className="ml-2">Client</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={roles.includes("coach")}
              onChange={() => handleRoleChange("coach")}
            />
            <span className="ml-2">Coach</span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;

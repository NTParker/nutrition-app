import axios from "axios";

const { VITE_APP_API_URL, VITE_APP_TYPE } = import.meta.env;

const GetUserService = async (userId: string, token: string) => {
  const url = `${VITE_APP_API_URL}/${VITE_APP_TYPE}/users/${userId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.get(url, { headers });
};

export default GetUserService;
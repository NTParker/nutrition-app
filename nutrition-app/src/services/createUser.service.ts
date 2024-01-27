import axios from "axios";

const { VITE_APP_API_URL, VITE_APP_TYPE } = import.meta.env;

const CreateUserService = async (newUser: any, token: any) => {
  const url = `${VITE_APP_API_URL}/${VITE_APP_TYPE}/users/create`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.post(url, newUser, { headers });
};

export default CreateUserService;
import axios, { AxiosResponse } from 'axios';

const { REACT_APP_API_BASE_URL } = process.env

const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      `${REACT_APP_API_BASE_URL}/todos`
    )
    return todos
  } catch (error) {
    throw error
  }
}

export default getTodos;

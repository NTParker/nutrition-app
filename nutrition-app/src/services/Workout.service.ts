import axios, { AxiosInstance } from "axios";
import { Workout } from "../common/types";

class WorkoutService {

  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
  async getWorkouts(token: string) {
    try {
      const url = `/workouts`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.apiClient.get(url, { headers });
      return response.data;
    } catch (error) {
      // handle error or rethrow
      throw error;
    }
  }

  async createWorkout(workout: Workout, token: string) {
    try {
      const url = `/workouts/create`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.apiClient.post(url, workout, { headers });
      return response.data;
    } catch (error) {
      // handle error or rethrow
      throw error;
    }
  }

  async updateWorkout(workout: any, token: string) {
    try {
      const url = `/workouts/update`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.apiClient.put(url, workout, { headers });
      return response.data;
    } catch (error) {
      // handle error or rethrow
      throw error;
    }
  }

  async deleteWorkout(workout: any, token: string) {
    try {
      const url = `/workouts/delete`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.apiClient.delete(url, { headers, data: workout });
      return response.data;
    } catch (error) {
      // handle error or rethrow
      throw error;
    }
  }


}
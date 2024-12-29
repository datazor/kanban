import { handleApiError } from '../utils/api';
import type { LoginData, RegisterData, LoginResponse } from '../types/auth';
import axios from "axios";

const baseURL = 'http://localhost:8080/api/v1';

const axiosInstance = axios.create({
  baseURL
});

export const authApi = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>('/user/login', data);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  register: async (data: RegisterData): Promise<void> => {
    try {
      await axiosInstance.post('/user/register', data);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

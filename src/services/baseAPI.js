import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from './authService';
import { API_CONFIG } from '../utils/constants';


const baseAPI = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

baseAPI.interceptors.request.use(async (config) => {
  const accessToken = await authService.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

baseAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      try {
        console.log('Refreshing token...');
        const newAccessToken = await authService.refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return baseAPI(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        await authService.logout(); 
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default baseAPI;

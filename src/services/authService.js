// src/services/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseAPI from './baseAPI';
import { STORAGE_KEYS } from '../utils/constants';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await baseAPI.post('auth/login', { email, password });
      const { accessToken, refreshToken, userName } = response.data;
      console.log(response.data)
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({ userName }));

      return { accessToken, refreshToken, userName };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },


  register: async (name, email, password) => {
    try {
      await baseAPI.post('auth/register', { name, email, password });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  refreshAccessToken: async () => {
    try {
      const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await baseAPI.post('auth/token', { token: refreshToken });
      const { accessToken } = response.data;

      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      return accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        await baseAPI.post('auth/logout', { token: refreshToken });
      }

      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },



  getAccessToken: async () => {
    return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return !!token;
  },

  getUserData: async () => {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }
};


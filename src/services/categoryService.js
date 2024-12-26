import AsyncStorage from '@react-native-async-storage/async-storage';
import baseAPI from './baseAPI';
import { STORAGE_KEYS } from '../utils/constants';

export const categoryService = {
  loadCategories: async () => {
    try {
      const clientVersion = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORY_VERSION) || '';

      const response = await baseAPI.get('categories', {
        headers: { 'Version': clientVersion },
      });
      
      if (response.status === 200) {
        await AsyncStorage.setItem(STORAGE_KEYS.CATEGORY_VERSION, response.data.version);
        await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(response.data.categories));
        return response.data.categories;
      }

      if (response.status === 204) {
        const cachedCategories = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);
        return JSON.parse(cachedCategories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      const cachedCategories = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return cachedCategories ? JSON.parse(cachedCategories) : [];
    }
  },
};

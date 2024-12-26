import baseAPI from './baseAPI';

export const searchPlaces = async (category, { lat, lng }, radius, transportMode) => {
  try {
    const response = await baseAPI.get('places', {
      params: { category, lat, lng, radius, transportMode },
    });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching places:', error.message);
    return [];
  }
};

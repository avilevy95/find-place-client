import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  try {
    // Request permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permission to access location was denied');
      return null;
    }

    // Get current location
    let location = await Location.getCurrentPositionAsync({});
    return {
      name: 'המיקום הנוכחי שלי',
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      },
      isCurrentLocation: true
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};
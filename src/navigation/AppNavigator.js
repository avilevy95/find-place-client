import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../contexts/UserContext';
import AppLayout from '../components/AppLayout';

import OnboardingScreen1 from '../screens/Onboarding/OnboardingScreen1';
import OnboardingScreen2 from '../screens/Onboarding/OnboardingScreen2';
import OnboardingScreen3 from '../screens/Onboarding/OnboardingScreen3';
import OnboardingFinishScreen from '../screens/Onboarding/OnboardingFinishScreen';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';

import InterestsSelectionScreen from '../screens/Preferences/InterestsSelectionScreen';
import BirthDateScreen from '../screens/Preferences/BirthDateScreen';
import RegistrationCompleteScreen from '../screens/Preferences/RegistrationCompleteScreen';

import PlannerScreen from '../screens/Planner/PlannerScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import PlaceDetailsScreen from '../screens/Home/PlaceDetailsScreen';
import SearchResultsScreen from '../screens/SearchResults/SearchResultsScreen';
import ProfileSettingsScreen from '../screens/Profile/ProfileSettingsScreen';
import SplashScreen from '../screens/SplashScreen';
import AdminPanel from '../screens/Profile/AdminPanel';
const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated,isLoading  } = useContext(UserContext);

  const ScreenWrapper = ({ component: Component, ...props }) => (
    <AppLayout navigation={props.navigation}>
      <Component {...props} />
    </AppLayout>
  );

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login">
            {(props) => <ScreenWrapper {...props} component={LoginScreen} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {(props) => <ScreenWrapper {...props} component={SignUpScreen} />}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="Planner">
            {(props) => <ScreenWrapper {...props} component={PlannerScreen} />}
          </Stack.Screen>
          <Stack.Screen name="SearchResults">
            {(props) => <ScreenWrapper {...props} component={SearchResultsScreen} />}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {(props) => <ScreenWrapper {...props} component={HomeScreen} />}
          </Stack.Screen>
          <Stack.Screen name="ProfileSettings">
            {(props) => <ScreenWrapper {...props} component={ProfileSettingsScreen} />}
          </Stack.Screen>
          <Stack.Screen name="AdminPanel">
            {(props) => <ScreenWrapper {...props} component={AdminPanel} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}

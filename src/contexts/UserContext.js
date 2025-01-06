// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try{
      const authenticated = await authService.isAuthenticated();
      const newUserData = await authService.getUserData();
      setIsAuthenticated(authenticated);
      setUserData(newUserData);
      }catch(error){

      }finally{
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserData(userData);
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData,isLoading, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

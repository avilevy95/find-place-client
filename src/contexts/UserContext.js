// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try{
      const authenticated = await authService.isAuthenticated();
      userData = await authService.getUserData();
      setIsAuthenticated(authenticated);
      setUser(userData);
      }catch(error){

      }finally{
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

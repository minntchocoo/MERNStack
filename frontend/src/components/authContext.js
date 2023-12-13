// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to set the user and token in context and local storage
  const login = (userData, token) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
  };

  // Function to clear the user and token from context and local storage
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Effect to check for a saved token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      // Perform verification or decoding as needed
      // For simplicity, assume the token is valid in this example
      const userFromToken = { name: 'John' }; // Replace with your decoding logic

      setUser(userFromToken);
    }
  }, []);

  // Context value
  const contextValue = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

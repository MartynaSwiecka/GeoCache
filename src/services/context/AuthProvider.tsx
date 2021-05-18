import React, { createContext, useState, ReactNode, FC } from 'react';
import { AuthProviderValue } from '../../types/types';

// @ts-ignore no default values for context
export const AuthContext = createContext<AuthProviderValue>();

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

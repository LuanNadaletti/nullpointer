import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser } from '../models/user';
import { isAuthenticated, signOut, singIn } from '../services/authenticationService';

interface AuthContextProps {
  user: AuthUser | null;
  authenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const auth = await isAuthenticated();
        setAuthenticated(auth);
      } catch (error: any) {
      }
    }
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const authenticatedUser = await singIn({ username, password });

    setUser(authenticatedUser);
    setAuthenticated(true);
  };

  const logout = () => {
    signOut();
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

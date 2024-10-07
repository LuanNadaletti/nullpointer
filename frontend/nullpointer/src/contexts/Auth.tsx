import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthUser } from '../models/user';
import { isAuthenticated, signOut, singIn } from '../services/authenticationService';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  user: AuthUser | null;
  authenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    async function checkAuth() {
      try {
        const authUser: AuthUser = await isAuthenticated();

        console.log(authUser)

        setAuthenticated(true);
        setUser(authUser);
      } catch (error: any) {
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const value = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user
  }), [user]);

  return (
    <AuthContext.Provider value={{ user, authenticated, loading, login, logout }}>
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

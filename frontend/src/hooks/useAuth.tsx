'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '@/lib/types';
import { getStoredUser, setStoredUser, removeStoredUser } from '@/lib/auth';
import { authApi } from '@/lib/api';

// Define the context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

// Proper typing for the provider props
type AuthProviderProps = {
  children: ReactNode;
};

// Create context with type or undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      if (response.user) {
        setStoredUser(response.user);
        setUser(response.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      removeStoredUser();
      setUser(null);
    } catch (error) {
      // Even if API call fails, clear local storage
      removeStoredUser();
      setUser(null);
    }
  };

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      setStoredUser(newUser);
    } else {
      removeStoredUser();
    }
  };

  // Provide the context value to children
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
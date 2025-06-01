import { User } from './types';

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
};

export const setStoredUser = (user: User): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeStoredUser = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return getStoredUser() !== null;
};
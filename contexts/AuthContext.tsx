import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('nova_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const storedUsersStr = localStorage.getItem('nova_users');
    const users = storedUsersStr ? JSON.parse(storedUsersStr) : [];
    
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      const userData = { name: foundUser.name, email: foundUser.email };
      setUser(userData);
      localStorage.setItem('nova_current_user', JSON.stringify(userData));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const storedUsersStr = localStorage.getItem('nova_users');
    const users = storedUsersStr ? JSON.parse(storedUsersStr) : [];

    if (users.find((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = { name, email, password }; // Note: In production, never store plain text passwords!
    users.push(newUser);
    localStorage.setItem('nova_users', JSON.stringify(users));
    
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem('nova_current_user', JSON.stringify(userData));
  };

  const loginWithGoogle = async () => {
    // Simulate Google OAuth popup and redirect delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock Google User Data
    const googleUser = { name: 'Google User', email: 'user@gmail.com' };
    setUser(googleUser);
    localStorage.setItem('nova_current_user', JSON.stringify(googleUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nova_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, loginWithGoogle, logout }}>
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
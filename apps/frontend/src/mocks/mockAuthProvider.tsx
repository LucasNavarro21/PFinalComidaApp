// src/stories/MockAuthProvider.tsx
import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import type { AuthContextProps } from "../context/AuthContext";
import type { ReactNode } from "react";
import type { User } from "../types/user.types";

interface MockAuthProviderProps {
  children: ReactNode;
  login?: (email: string, password: string) => Promise<{ token: string; user: User }>;
  register?: (name: string, email: string, password: string, role: string) => Promise<{ token: string; user: User }>;
}

export const MockAuthProvider = ({
  children,
  login = async () => ({ token: "mock-token", user: { id: "1", name: "Mock User", email: "mock@test.com", role: "CUSTOMER" as const } }),
  register = async () => ({ token: "mock-token", user: { id: "1", name: "Mock User", email: "mock@test.com", role: "CUSTOMER" as const } }),
}: MockAuthProviderProps) => {

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const mockLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    setUser(result.user);
    setToken(result.token);
    return result;
  };

  const mockRegister = async (name: string, email: string, password: string, role: string) => {
    const result = await register(name, email, password, role);
    setUser(result.user);
    setToken(result.token);
    return result;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const setAuthData = (user: any, token: string) => {
    setUser(user);
    setToken(token);
  };

  const contextValue: AuthContextProps = {
    user,
    token,
    login: mockLogin,
    register: mockRegister,
    logout,
    isAuthenticated: !!token,
    setAuthData, 
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

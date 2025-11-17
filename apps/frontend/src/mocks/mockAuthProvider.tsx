// src/stories/MockAuthProvider.tsx
import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import type { AuthContextProps } from "../context/AuthContext";
import type { ReactNode } from "react";

interface MockAuthProviderProps {
  children: ReactNode;
  login?: (email: string, password: string) => Promise<void>;
  register?: (name: string, email: string, password: string) => Promise<void>;
}

export const MockAuthProvider = ({
  children,
  login = async () => Promise.resolve(),
  register = async () => Promise.resolve(),
}: MockAuthProviderProps) => {

  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const mockLogin = async (email: string, password: string) => {
    await login(email, password);
    setUser({ id: "1", name: "Mock User", email });
    setToken("mock-token");
  };

  const mockRegister = async (name: string, email: string, password: string) => {
    await register(name, email, password);
    setUser({ id: "1", name, email });
    setToken("mock-token");
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

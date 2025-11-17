import type { User } from "../../types/user.types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthService = {
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },

  async register(name: string, email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  },
};

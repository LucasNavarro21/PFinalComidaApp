import type { User } from "../../types/user.types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthService = {
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password}),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },

  async register(name: string, email: string, password: string, role: string): Promise<{ token: string; user: User }> {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  },
};

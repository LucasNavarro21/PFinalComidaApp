import { mockUsers } from "../../mocks/user.mocks";
import type { User } from "../types/user.types";

export const AuthService = {
  login: (email: string, password: string): Promise<User | null> => {
    return new Promise((resolve) => {
      const user = mockUsers.find(
        (u: User) => u.email === email && u.password === password
      );
      setTimeout(() => resolve(user || null), 500);
    });
  },

  register: (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      if (!name || !email || !password) {
        return setTimeout(() => reject(new Error("Todos los campos son obligatorios")), 500);
      }

      const exists = mockUsers.some((u) => u.email === email);
      if (exists) {
        return setTimeout(() => reject(new Error("El email ya está registrado")), 500);
      }

      const newUser: User = {
        id: mockUsers.length + 1,
        name,
        email,
        password,
      };

      mockUsers.push(newUser);
      setTimeout(() => resolve(newUser), 500);
    });
  },
};


import type { LoginResponse, RegisterData, RegisterResponse } from "./types/auth.types";

const mockUsers = [
  { email: "admin@example.com", password: "123456", role: "ADMIN" },
  { email: "owner@example.com", password: "654321", role: "RESTAURANT_OWNER" },
  { email: "customer@example.com", password: "111111", role: "CUSTOMER" },
];

// --- LOGIN ---
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  await new Promise((res) => setTimeout(res, 800));

  const user = mockUsers.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { success: false, message: "Credenciales incorrectas" };
  }

  const fakeToken = btoa(`${user.email}:${user.role}:${Date.now()}`);

  return {
    success: true,
    message: "Inicio de sesión exitoso",
    token: fakeToken,
    role: user.role,
  };
}

// --- REGISTER ---
export async function registerUser(data: RegisterData): Promise<RegisterResponse> {
  await new Promise((res) => setTimeout(res, 800));

  const userExists = mockUsers.some((u) => u.email === data.email);

  if (userExists) {
    return { success: false, message: "El correo ya está registrado" };
  }

  mockUsers.push({
    email: data.email,
    password: data.password,
    role: data.role,
  });

  return {
    success: true,
    message: "Usuario registrado correctamente",
    user: data,
  };
}

export const AuthService = { loginUser, registerUser };

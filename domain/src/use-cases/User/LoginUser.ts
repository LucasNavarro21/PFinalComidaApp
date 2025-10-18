import type { UserService } from "../../services/UserService.js";
import { type User, type UserRole } from "../../entities/User.js";

interface LoginUserRequest {
  email: string;
  password: string;
  requiredRole?: UserRole; // opcional
}

export class LoginUser {
  constructor(private readonly userService: UserService) {}

  async execute({ email, password, requiredRole }: LoginUserRequest): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    if (user.password !== password) throw new Error("Contraseña incorrecta");

    if (requiredRole && user.role !== requiredRole) {
      throw new Error("No tienes permiso para acceder con este rol");
    }

    return user;
  }
}

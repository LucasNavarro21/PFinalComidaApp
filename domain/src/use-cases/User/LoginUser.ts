import type { UserService } from "../../services/UserService.js";
import { type User, type UserRole } from "../../entities/User.js";
import { generarToken } from "../../utils/types/jwt.js"; 

interface LoginUserRequest {
  email: string;
  password: string;
  requiredRole?: UserRole; 
}

export class LoginUser {
  constructor(private readonly userService: UserService) {}

  async execute({ email, password, requiredRole }: LoginUserRequest): Promise<{ user: User; token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    if (user.password !== password) throw new Error("Contraseña incorrecta");

    if (requiredRole && user.role !== requiredRole) {
      throw new Error("No tienes permiso para acceder con este rol");
    }

    const token = generarToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    return { user, token };
  }
}

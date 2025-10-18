import { type User, type UserRole } from "../entities/User.js";

export class AccessProtectedFeature {
  constructor(private readonly allowedRoles: UserRole[]) {}

  execute(user: User): string {
    if (!this.allowedRoles.includes(user.role)) {
      throw new Error("Acceso denegado: rol no autorizado");
    }

    return `Acceso permitido para rol ${user.role}`;
  }
}

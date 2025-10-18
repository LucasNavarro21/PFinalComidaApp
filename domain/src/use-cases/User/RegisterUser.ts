import { randomUUID } from "crypto";
import type { UserService } from "../../services/UserService.js";
import { UserRole, UserStatus, type User } from "../../entities/User.js";

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export class RegisterUser {
  constructor(private readonly userService: UserService) {}

  async execute(data: RegisterUserRequest): Promise<User> {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email ya registrado");
    }

    const allowedRoles: UserRole[] = ["CUSTOMER", "RESTAURANT_OWNER", "DELIVERY_PERSON", "ADMIN"];
    if (!allowedRoles.includes(data.role)) {
      throw new Error(`Invalid role: ${data.role}`);
    }

    const newUser: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await this.userService.save(newUser);
    return newUser;
  }
}

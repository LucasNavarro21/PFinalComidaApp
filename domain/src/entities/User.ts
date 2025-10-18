import type { Entity } from "../utils/types/Entity.js";

export const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const UserRole = {
  
  CUSTOMER : "CUSTOMER",
  RESTAURANT_OWNER : "RESTAURANT_OWNER",
  DELIVERY_PERSON : "DELIVERY_PERSON",
  ADMIN : "ADMIN"

} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export interface User extends Entity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

export type SecureUser = Omit<User, "password">;
